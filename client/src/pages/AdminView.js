import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Popup from "../components/Popup";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import services from "../services";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

export function AdminView() {
  const [items, setItems] = useState([]);
  const [newItemAdded] = useSearchParams(); 
  const [itemUpdated] = useSearchParams(); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const showSuccess = Object.fromEntries([...newItemAdded]);
  const showUpdated = Object.fromEntries([...itemUpdated]);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await services.productService.fetchAll();
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

  const navigate = useNavigate();
  const openEditItem = (id) => {
    navigate(`/${id}/edit`);
  };

  let state = <></>
  if (error) {
    state = <>{error}</>
  } else if (loading) {
    state = <>Loading...</>;
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
          { showUpdated.updated && (
            <div className="success">
            <div className="location-icon"><CheckCircleRoundedIcon/></div>
            <div className="popup-text">Success! Your item has been updated</div>
          </div>
          ) }
          <h2>You're an admin now</h2>
          {state}
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
                      { item.available === 1 && <><button className="btn-taken"  onClick={() => markAsTaken(item.id)}>Mark as taken
                      </button> 
                      <button className="edit-item" onClick={() => openEditItem(item.id)}>Edit item
                      </button> 
                      </>
                      } 
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
