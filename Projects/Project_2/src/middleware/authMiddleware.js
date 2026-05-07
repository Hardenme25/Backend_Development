// Import jwt to verify the token
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Allowing the access of the .env file
dotenv.config();

// Create a function that authenicates and verifies the request before reaching the backend
function authmiddleware  (req, res, next) {
    // Get the attched token from the header
    const token =  req.headers['authorization'];

    // Check if the token exists
    if (!token) {
        return res.status(401).json( {message: "No token provided!"});
    };

    // If the token exists proceed to verify
    jwt.verify(token, process.env.JwT_SECRETKEY, (err,decode) => {
        // If the verification goes wrong
        if (err) {
            return res.status(402).json({message: "Invalid token."});
        };
        // If the token is valid
        req.userId = decode.id;
        // Now proceed to the destination
        next();
    });

};

// Now export it so that its used for all routes
export default authmiddleware;