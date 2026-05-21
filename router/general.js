const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// Get all books list
// Input: None | Output: JSON list of all books
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        res.send(JSON.stringify(response.data, null, 4));
    } catch (error) {
        res.status(500).send("Error fetching books");
    }
});

// Get book details based on ISBN
// Input: isbn (URL parameter) | Output: JSON object of the specific book
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        res.send(response.data);
    } catch (error) {
        res.status(404).send("Book not found");
    }
});

// Get book details based on author
// Input: author (URL parameter) | Output: JSON list of books by the author
public_users.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author;
        const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
        res.send(response.data);
    } catch (error) {
        res.status(404).send("No books found for this author");
    }
});

// Get all books based on title
// Input: title (URL parameter) | Output: JSON list of books matching the title
public_users.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
        res.send(response.data);
    } catch (error) {
        res.status(404).send("No books found with this title");
    }
});

module.exports.general = public_users;