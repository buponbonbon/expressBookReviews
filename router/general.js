const express = require('express');
let books = require("./booksdb.js"); // Đảm bảo bạn import đúng file dữ liệu
const public_users = express.Router();

// 1. Lấy tất cả sách (sử dụng Promise)
public_users.get('/', function (req, res) {
  new Promise((resolve, reject) => {
    resolve(JSON.stringify(books, null, 4));
  }).then(result => res.send(result));
});

// 2. Lấy sách theo ISBN (sử dụng Promise)
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) resolve(book);
    else reject("Book not found");
  }).then(result => res.send(result))
    .catch(error => res.status(404).send(error));
});

// 3. Lấy sách theo Tác giả (sử dụng Promise)
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  new Promise((resolve, reject) => {
    const matchingBooks = Object.values(books).filter(book => book.author === author);
    if (matchingBooks.length > 0) resolve(matchingBooks);
    else reject("No books found for this author");
  }).then(result => res.send(result))
    .catch(error => res.status(404).send(error));
});

// 4. Lấy sách theo Tiêu đề (sử dụng Promise)
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  new Promise((resolve, reject) => {
    const matchingBooks = Object.values(books).filter(book => book.title === title);
    if (matchingBooks.length > 0) resolve(matchingBooks);
    else reject("No books found with this title");
  }).then(result => res.send(result))
    .catch(error => res.status(404).send(error));
});

module.exports.general = public_users;