const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

/**
 * Route: Get all books
 * Implementation: Uses asynchronous Axios call to retrieve data.
 * Input: None | Output: List of all books in JSON format.
 */
public_users.get('/', async function (req, res) {
    try {
        // Asynchronously fetch all books from the database via Axios
        const response = await axios.get('http://localhost:5000/');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

/**
 * Route: Get book by ISBN
 * Implementation: Asynchronous request to filter by ISBN.
 * Input: ISBN | Output: Specific book object.
 */
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        // Perform asynchronous HTTP request to fetch book by ISBN
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: `Book with ISBN ${req.params.isbn} not found` });
    }
});

/**
 * Route: Get books by Author
 * Implementation: Asynchronous filter logic based on author name.
 * Input: Author Name | Output: List of books by that author.
 */
public_users.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author;
        // Asynchronously process request and filter records by author
        const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: `No books found for author: ${req.params.author}` });
    }
});

/**
 * Route: Get books by Title
 * Implementation: Asynchronous filter logic based on book title.
 * Input: Title | Output: List of books matching the title.
 */
public_users.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        // Asynchronously process request and filter records by book title
        const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: `No books found with title: ${req.params.title}` });
    }
});

module.exports.general = public_users;