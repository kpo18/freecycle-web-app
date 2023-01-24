import React from "react";

const Button = ({ bgColor, text, color }) => {
    return <button style={{ backgroundColor: bgColor, color: color }} className="btn">{text}</button>
}

export default Button; 