import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Hello Hareesh!");
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err); // 500 Internal Server Error
    }
    return res.json(data);
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";

  db.query(query, [bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err); // 500 Internal Server Error
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Book not found" }); // 404 Not Found
    }

    return res.json(data[0]);
  });
});

app.post("/books", (req, res) => {
  const query = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err); // 500 Internal Server Error
    return res.status(201).json(data); // 201 Created
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookId], (err, data) => {
    if (err) return res.status(500).json(err); // 500 Internal Server Error
    return res.status(204).send(); // 204 No Content
  });
});

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
    if (err) return res.status(500).json(err); // 500 Internal Server Error
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" }); // 404 Not Found
    }
    return res.status(200).json(data); // 200 OK
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
