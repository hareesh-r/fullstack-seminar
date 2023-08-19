import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = () => {
      axios.get("http://localhost:8800/books")
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8800/books/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Hareesh Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="" />
            <div className="book-bottom">
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span className="book-price">${book.price}</span>
              <div className="button-grp">
                <button onClick={() => handleDelete(book.id)} className="delete-button noselect"><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>

                <Link
                  to={`/update/${book.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  >
                  <button className="update-button noselect">
                    <span className="text">
                      Update
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
