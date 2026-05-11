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
        INSERT INTO todos (user_id, task) VALUES (?,?)
    `);
    // Add the new values to the table
    const result = new_todo.run(req.userId,task);

    // Send a response to the user
    res.json({ id: result.lastInsertRowid,task, completed: 0});
});


// Handle a put request to update a todo
router.put("/:id", (req,res) => {
    // Get the id and the completed status of the todo from the request
    const { completed } = req.body;
    const { id } = req.params;

    // Update the todo database
    const update = db.prepare(`
        UPDATE  todos SET completed = ? WHERE id = ?
    `);
    // Update
    update.run(completed,id);

    // Send response to user
    res.json({message: "Task completed!"});
});   


// Handle a delete request to delete a todo
router.delete("/:id", (req,res) => {
    // Get the id from the request
    const { id } = req.params;
    // Prepare the database for deletion
    const del = db.prepare(`
        DELETE FROM todos WHERE id = ? AND user_id = ?
    `);
    // Delete the todo
    del.run(id, req.userId);

    // Send response to user
    res.json({message: "Task deleted!"});
});


// Export the sub instance
export default router;