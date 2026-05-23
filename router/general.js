const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(409).json({message: "User already exists!"});
    }
  }
  return res.status(400).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn]);
  } else {
    res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let booksByAuthor = [];
  Object.keys(books).forEach(key => {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  });
  if (booksByAuthor.length > 0) {
    res.send(booksByAuthor);
  } else {
    res.status(404).json({message: "No books found by this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let booksByTitle = [];
  Object.keys(books).forEach(key => {
    if (books[key].title === title) {
      booksByTitle.push(books[key]);
    }
  });
  if (booksByTitle.length > 0) {
    res.send(booksByTitle);
  } else {
    res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn].reviews);
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;

// Task 10: Get all books using an async callback function
const getAllBooks = (callback) => {
  axios.get('http://localhost:5000/')
    .then(response => {
      callback(null, response.data);
    })
    .catch(error => {
      callback(error);
    });
};

// Task 11: Search for a book by ISBN using a Promise
const getBookByISBN = (isbn) => {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

// Task 12: Search for a book by Author using async/await
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Task 13: Search for a book by Title using async/await
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};