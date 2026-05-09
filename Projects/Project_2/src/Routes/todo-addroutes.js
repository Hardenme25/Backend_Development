import express from "express";
import db  from "../db.js"; 

// Initialise our sub instance
const router = express.Router();

// Handle a get request  to get all todos for a logged in user
router.get("/", (req,res) => {
    // Prepare a query for the getting all the todos
    const getTodos = db.prepare(`
        SELECT * FROM todos WHERE user_id = ?    
    `);
    // Get the todos for a specific id
    const todo = getTodos.all(req.userId);
    
    // Now send the todos to the users
    res.json(todo);
});

// Handle a post request for a new todo
router.post("/", (req,res) => {
    // Get the todo data from theh frontend
    const { task } = req.body;
    // Prepare  the todos table to insert the data
    const new_todo = db.prepare(`
        INSERT INTO todos (user_id, todo) VALUES (?,?)
    `);
    // Add the new values to the table
    new_todo.run(req.userId,task);

    // Send a response to the user
    res.json({ id: new_todo.lastID,task, completed: 0});
});

// Handle a put request to update a todo
router.put("/:id", (req,res) => {

});

// Handle a delete request to delete a todo
router.delete("/:id", (req,res) => {

});


// Export the sub instance
export default router;