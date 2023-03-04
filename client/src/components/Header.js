import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
let navigate = useNavigate();
const [isOpen, setIsOpen] = useState(false);

const handleToggle = () => {
  setIsOpen(!isOpen);
}

const logout = () => {
  localStorage.removeItem("token");
  navigate("/")
};

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/">
          <img className="logo" src="/assets/logo.svg" alt="SecondLife Logo" />
        </Link>
        <div className="flex-end mobile-hidden">
        <Link to="/login" className="menu-item">
            Login
          </Link>
          <button 
                onClick={logout}>
                Log out
          </button>
          <Link to="/admin" className="menu-item">
            Admin
          </Link>
          <Link to="/new" className="btn">
            Add item
          </Link>

        </div>
        {/* Hamburger menu */}
        <div className="hamburger-menu">
          <button onClick={handleToggle}
          className={`hamburger ${isOpen ? "open" : null}`}>
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="desktop-hidden">
      <div className={`dropdown-mobile ${isOpen ? "flex" : null}`}> 
      <Link to="/new" className="btn w-100">
            Add item
      </Link>
      <Link to="/login" className="menu-item">
            Login
          </Link>
      <Link to="/admin" className="menu-item w-100">
            Admin
      </Link>
      <button 
                onClick={logout}>
                Log out
      </button>
      </div>
      </div>
    </header>
  );
};

export default Header;
