// importing the express framework
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import router1 from "./Routes/authroutes.js";
import router from "./Routes/todo-addroutes.js";
import authmiddleware from "./middleware/authMiddleware.js";
import dotenv from "dotenv";

// Allowing the access of the .env file
dotenv.config();

// Create an instance for that imported express framework
const app = express();

// Define a port
const PORT = process.env.PORT || 3000; 

// Get the filename of the current file
const __filename = fileURLToPath(import.meta.url);

// Get the foldername of the current file
const __dirname = dirname(__filename);

// Relate the public directory to the current directory
app.use(express.static(path.join(__dirname,"../Public")));

// Enable our app to parse json data in the request body
app.use(express.json());

// Using the Routes instance
app.use("/auth", router1);

// With an authorisation intergration
app.use("/todos",authmiddleware, router);

// Interprete the get request at the root directory
app.get("/", (req,res) => {
    console.log("Response at the root directory has been detected!");
    const file = path.join(__dirname,"Public","index.html");
    res.sendFile(file);
});


// Let our app listen to whatever happens at the port
app.listen(PORT, () => {
    console.log(`Server has started at port: ${PORT}`);
});