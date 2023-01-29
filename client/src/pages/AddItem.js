import React from "react"; 
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import { Link } from "react-router-dom";

export function AddItem() {
    return (
        <div className="page-container">
            <Header/>
            <article className="main">
                <div className="container">
                    <Link to = "/" className="back-link"> &#171; BACK
                    </Link>
                    <div className="spacer-20"></div>
                    <h2>Add new item</h2>
                    <div>
                        <form className="form-control">
                            <div>
                                <label>TITLE</label>
                            </div>
                            <div>
                                <input type="text" placeholder="e.g. Old Sneakers" />
                            </div>
                            <div>
                                <label>DESCRIPTION</label>
                            </div>
                            <div>
                                <input type="text" placeholder="e.g. size 42, only worn a few times." />
                            </div>
                            <div>
                                <label>IMAGE</label>
                            </div>
                            <div>
                                <input type="text" placeholder="upload a photo of your item" />
                            </div>
                            <div>
                                <label>LOCATION</label>
                            </div>
                            <div>
                                <input type="text" placeholder="add a London postcode or tube station" />
                            </div>
                            <div>
                                <label>CONTACT INFO</label>
                            </div>
                            <div>
                                <input type="text" placeholder="enter a phone number or email address" />
                            </div>
                            <div>
                                <button className="btn-submit" type="submit">Add item</button>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
            <div className="spacer-50"></div>
            <Footer /> 
        </div>
    )
}