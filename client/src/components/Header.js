import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate(); 

    const goToAdmin = () => {
        navigate("/admin"); 
    }

    const addItem = () => {
        navigate("/new"); 
    }

    const goToHome = () => {
        navigate("/"); 
    }

    return (
        <header className="header">
            <div className="container header-container">
                <div onClick={goToHome}>
                    <img className="logo" src="assets/logo.svg" alt="SecondLife Logo"/>
                </div>
                <div className="flex-end">
                    <button className="menu-item" onClick={goToAdmin}>Admin</button>
                    <button className="btn" onClick={addItem}>Add item</button>
                </div>
            </div>
        </header>
    )
}

export default Header; 