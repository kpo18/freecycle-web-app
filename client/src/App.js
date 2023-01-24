import React, {useEffect, useState } from "react"; 
import './App.css';
import Button from "./components/Button"; 
import MenuItem from "./components/MenuItem"; 

function App() {
  const [items, setItems] = useState([]); 

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch("http://localhost:5050/api")
      .then(response => response.json())
      .then(items => {
        setItems(items);
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <div>
      <header className="header">
        <div className="container header-container">
          <div>
              <img className="logo" src="assets/logo.svg" alt="SecondLife Logo"/>
            </div>
          <div className="flex-end">
              <div><MenuItem text="Admin" /></div>
              <div><Button text="Add item" /></div>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="container hero-container">
            <div className="hero-text">
              <h1>Get rid of stuff you no longer need</h1>
              <h4>Find a new home for unloved items.</h4>
              <Button text="Add item" />
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
                  <div key={index} className="items-card">
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

export default App;
