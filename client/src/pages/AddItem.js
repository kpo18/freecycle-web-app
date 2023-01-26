import React from "react"; 
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

export function AddItem() {
    return (
        <div className="page-container">
            <Header/>
            <h1>Add new item</h1>
            <div className="spacer-50"></div>
            <Footer /> 
        </div>
    )
}