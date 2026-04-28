import express from "express";
import db  from "../db.js"; 

// Initialise our sub instance
const router = express.Router();

// Handle a get request  to get all todos for a logged in user
router.get("/", (req,res) => {

});

// Handle a post request for a new todo
router.post("", (req,res) => {

});

// Handle a put request to update a todo
router.put("/:id", (req,res) => {

});

// Handle a delete request to delete a todo
router.delete("/:id", (req,res) => {

});


// Export the sub instance
export default router;