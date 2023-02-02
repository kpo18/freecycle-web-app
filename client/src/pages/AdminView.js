import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Popup from "../components/Popup";
import { Link, useSearchParams } from "react-router-dom";
import services from "../services";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

export function AdminView() {
  const [items, setItems] = useState([]);
  const [newItemAdded] = useSearchParams(); 
  const showSuccess = Object.fromEntries([...newItemAdded]);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });

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


  const handleDelete = (id) => {
    setPopup({
      show: true,
      id,
    });
  }; 

  const handleDeleteTrue = async () => {
    if (popup.show && popup.id) {
      try {
        await services.productService.delete(popup.id); 
        setPopup({
          show: false,
          id: null,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  const markAsTaken = async (id) => {
    const response = await fetch(`http://localhost:5050/items/${id}`);
    const itemToUpdate = await response.json(); 

    const takenItem = {
      ...itemToUpdate, available: 0
    };
    
    const res = await fetch(`http://localhost:5050/items/${id}`, {
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
          { showSuccess.success && (
            <div className="success">
            <div className="location-icon"><CheckCircleRoundedIcon/></div>
            <div className="popup-text">Success! Your item has been added</div>
          </div>
          ) }
          <h2>You're an admin now</h2>
          <div>
            <div className="items-grid">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="admin-items-card"
                  >
                    { item.available === 0 && <div className="item-taken">TAKEN</div> }
                    <img
                      className="items-img"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="items-text">
                      <h3>{item.title}</h3>
                      
                      <div className="manage-item">
                      { item.available === 1 && <button className="btn-taken"  onClick={() => markAsTaken(item.id)}>Mark as taken
                      </button> } 
                      <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete item
                      </button> 
                      
                      
                      </div>
                      
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {popup.show && (
            <Popup
              handleDeleteTrue={handleDeleteTrue}
              handleDeleteFalse={handleDeleteFalse}
            />
          )}
        </div>
      </article>
      <div className="spacer-50"></div>
      <Footer />
    </div>
  );
}
