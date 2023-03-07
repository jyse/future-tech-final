import React from "react";
import "./Header.css";

const Header = () => {
  const categoryStyles = [
    ["EXPLORE"],
    ["COLLECTION"],
    ["RESOURCES"],
    ["ARTIST"]
  ];

  return (
    <div className="header">
      <div className="logo">
        <img
          src="https://futuretech.nl/wp-content/uploads/2020/07/future-tech-wit.png"
          alt="logo"
        />
      </div>
      <div className="logo-text">
        <h2>Future Tech 2023</h2>
      </div>
      <div className="search-bar">
        <div>
          <input type="text" placeholder="Search all the NFTs" />
        </div>
        <div className="search-button">
          <p>Search</p>
        </div>
      </div>
      <div className="menu">
        {categoryStyles.map(([category, index]) => {
          return (
            <div className="menu-item">
              <h2 key={index}>{category}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
