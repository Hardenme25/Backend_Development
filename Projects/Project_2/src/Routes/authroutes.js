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
            VALUE (?,?)   
        `);
        // Add the Values into the query
        const add = insert.run(username, encrypt);

        // Create a default todo
        const todo = db.prepare(`
            INSERT INTO todos (user_id,todo)
            VALUE (?,?)
        `);

        // Add values in the todo
        const add1 = todo.run(add.lastInsertRowid,DefaultTodo);

        res.sendStatus(200);
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
     };
    
    });     
// Handle a post request at the login
router1.post("/login", (req,res) => {
    const { username, password } = req.body;
    console.log(username, password);
    res.sendStatus(200);
});

// Export the instance to be used in other files
export default router1;