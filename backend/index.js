// Import required libraries
import express from "express";
import mysql from "mysql";
import cors from "cors";

// Create an Express app
const app = express();

// Use CORS and parse JSON requests
app.use(cors());
app.use(express.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

// Route for the root URL
app.get("/", (req, res) => {
  res.json("Hello Hareesh!");
});

// Get all books
app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
    return res.json(data);
  });
});

// Get a specific book by ID
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";

  db.query(query, [bookId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Not Found", message: "Book not found" });
    }

    return res.json(data[0]);
  });
});

// Add a new book
app.post("/books", (req, res) => {
  const query = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error", message: err.message });
    return res.status(201).json(data);
  });
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookId], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error", message: err.message });
    return res.status(204).send();
  });
});

// Update a book by ID
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(query, [...values, bookId], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error", message: err.message });
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Not Found", message: "Book not found" });
    }
    return res.status(200).json(data);
  });
});

// Start the Express app on port 8800
app.listen(8800, () => {
  console.log("Connected to backend.");
});
