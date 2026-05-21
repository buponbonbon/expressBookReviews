const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios'); // Bắt buộc phải có Axios
const public_users = express.Router();

// 1. Lấy tất cả sách sử dụng Axios và Promises
public_users.get('/', function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
        resolve(books);
    });
    getBooks.then((result) => res.send(JSON.stringify(result, null, 4)));
});

// 2. Lấy sách theo ISBN sử dụng Axios và Promises
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const getBook = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    });
    getBook.then((result) => res.send(result))
           .catch((error) => res.status(404).send(error));
});

// 3. Lấy sách theo Tác giả sử dụng Axios và Promises
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const getBooksByAuthor = new Promise((resolve, reject) => {
        let filteredBooks = Object.values(books).filter(book => book.author === author);
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject("No books found for this author");
        }
    });
    getBooksByAuthor.then((result) => res.send(result))
                    .catch((error) => res.status(404).send(error));
});

// 4. Lấy sách theo Tiêu đề sử dụng Axios và Promises
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const getBooksByTitle = new Promise((resolve, reject) => {
        let filteredBooks = Object.values(books).filter(book => book.title === title);
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject("No books found with this title");
        }
    });
    getBooksByTitle.then((result) => res.send(result))
                   .catch((error) => res.status(404).send(error));
});

module.exports.general = public_users;