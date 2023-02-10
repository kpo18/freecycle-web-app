import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import services from "../services";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from '@material-ui/icons/LocationOn';

export function Home() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { name: "Women Clothing and Accessories", id: 1 }, 
    { name: "Men Clothing and Accessories", id: 2 },
    { name: "Kids Clothing and Accessories", id: 3 },
    { name: "Electronic", id: 4 },
    { name: "Appliances", id: 5 },
    { name: "Food", id: 6 },
    { name: "Baby", id: 7 },
    { name: "Furniture and Lighting", id: 8 },
    { name: "Garden", id: 9 },
    { name: "Indoor Plants", id: 10 },
    { name: "Pet Food and Accessories", id: 11 },
    { name: "Sports Equipment", id: 12 },
    { name: "Kitchen", id: 13 }, 
    { name: "Other", id: 14 }
  ]; 


  // Get all available items
  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await services.productService.fetchAllActive();
      setItems(items);
    } catch(error) {
      setError("Oops, something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  
   // Open Item Detail
  const navigate = useNavigate();

  const openItemDetail = (id) => {
    navigate(`/${id}`);
  };

   // Search bar functionality
  useEffect(() => {
    const handleSearch = async () => {
      const items = await services.productService.fetchAllSearch(searchTerm);
      setItems(items);
    };
     handleSearch();
  }, [searchTerm]);

  // category filter 
  useEffect(() => {
    const handleCategoryFilter = async () => {
      try {
        const items = await services.productService.fetchAllCategory(category);
        setItems(items);
      } catch (error) {
        setError(error);
      }
    };
    handleCategoryFilter();
  }, [category]);



  // Show error & loading states
  let state = <></>
  if (error) {
    state = <>{error}</>
  } else if (loading) {
    state = <>Loading...</>;
  } else if (items?.length === 0) {
    state = <><p>No items found that match your search. Why not try a different keyword or category?</p><button onClick={getItems} className="modal-cancel">View all items</button></>;
  }

  return (
    <div className="page-container">
      <Header />
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-text">
            <h1>Get rid of stuff you no longer need</h1>
            <h4>A place to give and get stuff for free in London.</h4>
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
          <div className="search">
            <div className="searchInputs">
              <div className="searchIcon"><SearchIcon/></div>
              <input type="text" placeholder="filter by searching for an item" onChange={(event) => {setSearchTerm(event.target.value)}} />
            </div>
          </div>
          <div>
          <select onChange={(event) => {setCategory(event.target.value)}}>
           {categories.map(category =>  <option key={category.id} value={category.name}>{category.name}</option>)}
          </select>
          </div>
          {state}
          <div>
              <div className="items-grid">
              {items.map((item, index) => {
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
