import React from "react"; 
import Header from "../components/Header"; 


export function AdminView() {
    return (
        <div className="page-container">
            <Header/>
            <h1>You're an admin now</h1>
        </div>
    )
}