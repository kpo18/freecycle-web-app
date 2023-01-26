import React from "react"; 
import Header from "../components/Header"; 
import { useNavigate, Navigate } from "react-router-dom";


export function Home({items}) {
    const navigate = useNavigate(); 

    // AddItem
    const addItem = () => {
        navigate("/new"); 
    }

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
                    <button className="btn" onClick={addItem}>Add item</button>
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
            <footer className="footer">
                <div className="container">
                <div>Made with 🤍 as an MVP project</div>
                </div>
            </footer>
        </div>
    ); 
}
