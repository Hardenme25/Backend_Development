// Calling a database module
import { DatabaseSync} from "node:sqlite";

// Create a database instance
const db = new DatabaseSync(":memory:");

// Create a table 
db.exec(`
    CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`);

// Create another table
db.exec(`
    CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        todo TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES user(id)
    )
`)

// Export the database instance
export default db;