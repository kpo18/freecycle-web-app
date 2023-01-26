import React, {useEffect, useState } from "react"; 
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import { Link, useNavigate } from "react-router-dom";
import services from "../services"; 


export function Home() {
    const [items, setItems] = useState([]); 

    const getItems = () => {
        services.productService.fetchAll()
          .then(items => {
            setItems(items);
          })
          .catch(error => {
            console.log(error);
          });
      };

    useEffect(() => {
      getItems();
    }, []);
  
    

    const navigate = useNavigate(); 

    // OpenItemDetail
    const openItemDetail = (id) => {
        console.log("open item", id); 
        navigate(`/${id}`); 
      }    

    return (
        <div className="page-container">
            <Header />
            <section className="hero">
                <div className="container hero-container">
                    <div className="hero-text">
                    <h1>Get rid of stuff you no longer need</h1>
                    <h4>Find a new home for unloved items.</h4>
                    <Link to = "/new" className="btn" >Add item</Link>
                    </div>
                    <div>
                    <img className="hero-img" src="assets/hero.png" alt="Hand giving raspberry"/>
                    </div>
                </div>
            </section>
            <article className="main">
                <div className="container">
                <h2>Recently added</h2>
                <div><form><input placeholder="search for an item"></input></form></div>
                <div>
                    <div className="items-grid">
                    {items.map((item, index) => {
                        return (
                        <div 
                            key={index} 
                            className="items-card" 
                            onClick={() => openItemDetail(item.id)}>
                            <img
                            className="items-img"
                            src={item.image}
                            alt={item.title}
                            />
                            <div className="items-text">
                            <h3>{item.title}</h3>
                            <p>{item.location}</p>
                            </div>
                        </div>
                        )
                    })}
                    </div>
                </div>
                </div>
            </article>
            <div className="spacer-50"></div>
            <Footer />
        </div>
    ); 
}
