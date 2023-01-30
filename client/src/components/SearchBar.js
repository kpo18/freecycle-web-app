import React from "react";
import SearchIcon from "@material-ui/icons/Search";

function SearchBar({ data }) {
    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder="search for an item"/>
                <div className="searchIcon"><SearchIcon/></div>
            </div>
        </div>
    );
}

export default SearchBar; 