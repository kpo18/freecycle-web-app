import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import services from "../services";

export function AdminView() {
  const [items, setItems] = useState([]);

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

  const deleteItem = async (id) => {
    console.log(id); 
    try {
      await fetch(`http://localhost:5050/api/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        //body: JSON.stringify(item)
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const markAsTaken = async (id) => {
    const response = await fetch(`http://localhost:5050/api/${id}`);
    const itemToUpdate = await response.json(); 

    const takenItem = {
      ...itemToUpdate, available: 0
    };
    
    const res = await fetch(`http://localhost:5050/api/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(takenItem)
    });
    const data = await res.json();
    setItems(data); 
  }



  return (
    <div className="page-container">
      <Header />
      <article className="main">
        <div className="container">
          <Link to="/" className="back-link">
            {" "}
            &#171; BACK
          </Link>
          <div className="spacer-20"></div>
          <h2>You're an admin now</h2>
          <div>
            <div className="items-grid">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="items-card"
                  >
                    { item.available === 0 && <div className="item-taken">TAKEN</div> }
                    <img
                      className="items-img"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="items-text">
                      <h3>{item.title}</h3>
                      <div>
                      { item.available === 1 && <button onClick={() => markAsTaken(item.id)}>
                        Mark as taken
                      </button> } 
                      
                      <button className="delete" onClick={() => deleteItem(item.id)}>
                        Delete
                      </button>
                      </div>
                      
                    </div>
                  </div>
                );
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
