import React from "react"; 
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

export function AdminView() {
    return (
        <div className="page-container">
            <Header/>
            <h1>You're an admin now</h1>
            <div className="spacer-50"></div>
            <Footer /> 
        </div>
    )
}