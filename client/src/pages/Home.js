import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import services from "../services";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from '@material-ui/icons/LocationOn';

export function Home() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 



  const getItems = () => {
    services.productService
      .fetchAll()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  const navigate = useNavigate();

  // OpenItemDetail
  const openItemDetail = (id) => {
    navigate(`/${id}`);
  };

  const availableItems = items.filter((item) => item.available === 1); 

  return (
    <div className="page-container">
      <Header />
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-text">
            <h1>Get rid of stuff you no longer need</h1>
            <h4>Find a new home for unloved items.</h4>
            <Link to="/new" className="btn">
              Add item
            </Link>
          </div>
          <div className="hero-img-container">
            <img
              className="hero-img"
              src="assets/hero.png"
              alt="Hand giving raspberry"
            />
          </div>
        </div>
      </section>
      <article className="main">
        <div className="container">
          <h2>Recently added</h2>
          {/* TODO: create search bar component + change functionality to search on button submit instead of filtering onChange (use API request to filter?) */}
          <div className="search">
            <div className="searchInputs">
            <div className="searchIcon"><SearchIcon/></div>
              <input type="text" placeholder="filter by searching for an item" onChange={(event) => {setSearchTerm(event.target.value)}} />
            </div>
          </div>
          <div>
            <div className="items-grid">
              {
                availableItems
                .filter((item) => {
                  if(!searchTerm) {
                    return item; 
                  } else if(item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return item; 
                  } 
              })
              .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="items-card"
                      onClick={() => openItemDetail(item.id)}
                    >
                      <img
                        className="items-img"
                        src={item.image}
                        alt={item.title}
                      />
                      <div className="items-text">
                        <h3>{item.title}</h3>
                        <div className="location-container">
                          <div className="location-icon"><LocationOnIcon/></div>
                          <div className="location-text"><p>{item.location}</p></div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            
            </div>
          </div>
        </div>
      </article>
      <div className="spacer-50"></div>
      <Footer />
    </div>
  );
}
