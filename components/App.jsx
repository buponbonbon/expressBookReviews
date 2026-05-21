import React from 'react';
import './App.css';

function App() {
  const handleGetStartedClick = () => {
    // Điều hướng đến trang danh sách sản phẩm
    window.location.href = '/products'; 
  };

  return (
    <div className="landing-page-container">
      <div className="content">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        {/* Nút Get Started đã được thêm sự kiện onClick */}
        <button className="get-started-btn" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;