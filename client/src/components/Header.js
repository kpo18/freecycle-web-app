import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/">
          <img className="logo" src="assets/logo.svg" alt="SecondLife Logo" />
        </Link>
        <div className="flex-end">
          <Link to="/admin" className="menu-item">
            Admin
          </Link>
          <Link to="/new" className="btn">
            Add item
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
