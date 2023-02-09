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
    show: false, 
    id: null,
  });

  // Get all items
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


  // trigger popup 
  const handleDelete = (id) => {
    setPopup({
      show: true,
      id,
    });
  }; 

  // delete item if popup confirmed
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
        setError("Oops, something went wrong!");
      }
    }
  };

  // cancel delete request
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  // set mark as taken
  const markAsTaken = async (id) => {
    const itemToUpdate = await services.productService.fetchOne(id);

    const takenItem = {
      ...itemToUpdate, available: 0
    };
    
    const res = await services.productService.markTaken({takenItem, id});
    const data = await res.json();
    setItems(data); 
  }

  // open edit item page
  const navigate = useNavigate();
  const openEditItem = (id) => {
    navigate(`/${id}/edit`);
  };

  // Show error & loading states
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
                        { item.available === 1 && <>
                        <button className="btn-taken"  onClick={() => markAsTaken(item.id)}>Mark as taken
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
