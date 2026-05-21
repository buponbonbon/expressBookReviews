const express = require('express');
const axios = require('axios'); // Đảm bảo đã cài axios: npm install axios
const public_users = express.Router();

// Hàm lấy tất cả sách sử dụng Promises
function getAllBooks() {
  return new Promise((resolve, reject) => {
    // Giả sử server của bạn chạy tại http://localhost:5000
    axios.get('http://localhost:5000/')
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

// Hàm lấy sách theo ISBN sử dụng Async/Await
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Hàm lấy sách theo Author sử dụng Promises
function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/author/${author}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

// Hàm lấy sách theo Title sử dụng Async/Await
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Export các hàm để sử dụng ở nơi khác
module.exports = { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle };