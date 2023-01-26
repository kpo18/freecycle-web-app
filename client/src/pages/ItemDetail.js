import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import services from "../services"; 

export function ItemDetail() {
    const {id} = useParams()
    const [item, setItem] = useState(null)

    useEffect(() => {
                const getItem = () => {
                services.productService.fetchOne(id)
                .then(item => {
                    setItem(item);
                    console.log(item);
                })
                .catch(error => {
                    console.log(error);
                });
            };
        getItem();
      }, [id]); 


    return (
        <div className="page-container">
            <Header/>
            {item ? 
            <article className="main">
            <div className="container">
            <Link to = "/" className="back-link"> &#171; BACK
            </Link>
            <div className="spacer-20"></div>

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
                                <p>{item.location}</p>
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
            : null}
          <div className="spacer-50"></div>
          <Footer /> 
        </div>
    )
}