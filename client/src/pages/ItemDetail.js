import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import services from "../services";
import LocationOnIcon from '@material-ui/icons/LocationOn';

export function ItemDetail() {
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [item, setItem] = useState(null);

  // Get one item
  useEffect(() => {
    const getItem = async () => {
      try {
        const item = await services.productService.fetchOne(id);
        setItem(item);
      } catch(error) {
        setError(error);
        }
    };
    getItem();
  }, [id]);

  // Show error & loading states
  let state = <></>
  if (error) {
    state = <>{error}</>
  } 

  return (
    <div className="page-container">
      <Header />
      {item ? (
        <article className="main">
          <div className="container">
            <Link to="/" className="back-link">
              {" "}
              &#171; BACK
            </Link>
            <div className="spacer-20"></div>
            {state}
            <div className="item-detail-card">
              <div className="item-detail-grid">
                <img
                  className="item-detail-img"
                  src={item.image}
                  alt={item.title}
                />
                <div className="item-detail-text">
                  <div>
                    <h3 className="item-detail-title">{item.title}</h3>
                    <div className="location-container">
                          <div className="location-icon"><LocationOnIcon/></div>
                          <div className="location-text"><p>{item.location}</p></div>
                        </div>
                    <p className="item-detail-heading">ITEM DESCRIPTION</p>
                    <p>{item.description}</p>
                    <p className="item-detail-heading">CONTACT INFO</p>
                    <p>{item.contact}</p>
                  </div>
                  <div className="horizontal-line">
                    <p className="item-detail-id">Item-ID: {item.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      ) : null}
      <div className="spacer-50"></div>
      <Footer />
    </div>
  );
}
