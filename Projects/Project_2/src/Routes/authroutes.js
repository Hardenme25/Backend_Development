// Importing the neccesary modules
import express from "express";
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Creating a router instance. So basically we are getting a routing section of the whole exporess module
const router1 = express.Router();

// Handle a post request at the register endpoint
router1.post("/register", (req,res) => {
    const { username, password } = req.body;
    
    // Encrypt the password using bcryptjs
    const encrypt = bcrypt.hashSync(password, 8);
    
    // Insert the new user into the database
    try {
        // Prepare the sql query
        const insert = db.prepare(`
            INSERT INTO user (username, password)
            VALUES (?,?)   
        `);
        // Add the Values into the query
        const add = insert.run(username, encrypt);

        // Creating a default todo
        const DefaultTodo = "Welcome to your todo list! :). Create your first todo";

        // Create a default todo
        const todo = db.prepare(`
            INSERT INTO todos (user_id,task)
            VALUES (?,?)
        `);
        // Add values in the todo
        const add1 = todo.run(add.lastInsertRowid,DefaultTodo);

        // Adding the token
        const token = jwt.sign({ id: add.lastInsertRowid },process.env.JwT_SECRETKEY, {expiresIn: '24h' });

        // Send the token to the user
        // This makes our application fast
        res.status(200).json({ token });

    } catch (err) {
    console.log(err.message);
    
    // If the error is a duplicate username, tell the user
    if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ message: "Username already exists. Please try another one." });
    }

    // For any other unexpected errors, use 500
    res.status(500).json({ message: "Internal Server Error" });
    };

});   
      
// Handle a post request at the login
router1.post("/login", (req,res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    try {
        // Select the user from the database
        const db_user = db.prepare(`
            SELECT * FROM user WHERE username = ?
        `);

        // Get the user from the database
        const get_user = db_user.get(username);

        // 1. Check if user exists
if (!get_user) {
    return res.status(404).send({ message: "User not found" });
}

// 2. Compare passwords (now that we know the user exists)
const compare = bcrypt.compareSync(password, get_user.password);

if (!compare) {
    // 3. Use return to stop execution if password is wrong
    return res.status(401).send({ message: "Invalid password!" });
}

// 4. If we reached here, password is correct. 
// Match your variable name (token) with what you send in res.json
const token = jwt.sign(
    { id: get_user.id }, 
    process.env.JwT_SECRETKEY, 
    { expiresIn: "24h" }
);

// Use 'token' here because that's what you named it above
return res.json({ token });
        
    } catch (error) {
      console.log(error.message);
      res.sendStatus(503);  
    };
});

// Export the instance to be used in other files
export default router1;