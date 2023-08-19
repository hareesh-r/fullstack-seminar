import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${bookId}`);
        const bookData = res.data;
        setBook(bookData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8800/books/${bookId}`, book)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        value={book.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        value={book.price}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        value={book.cover}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
