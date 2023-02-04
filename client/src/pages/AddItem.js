import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import services from "../services";

export function AddItem() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    contact: "",
    available: true
  });

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setItem((item) => ({ ...item, [name]: value }));
    console.log(item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(item);
  };

  const addItem = async (item) => {
    setLoading(true);

    try {
      await services.productService.create(item);
      navigate("/admin?success=1"); //navigates back to Admin when item was added
    } catch (error) {
      setError("Oops! Something went wrong. Try again later");
    } finally {
      setLoading(false);
    }
  };

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
          <h2>Add new item</h2>
          <div className="form-control">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label>TITLE</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="e.g. Old Sneakers"
                  value={item.title}
                  name="title"
                  maxLength="50"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>DESCRIPTION</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="e.g. size 42, only worn a few times."
                  value={item.description}
                  name="description"
                  maxLength="500"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>IMAGE</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="upload a photo of your item"
                  value={item.image}
                  name="image"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>LOCATION</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="add a London postcode or tube station"
                  value={item.location}
                  name="location"
                  maxLength="30"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>CONTACT INFO</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="enter a phone number or email address"
                  value={item.contact}
                  name="contact"
                  maxLength="30"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <button className="btn-submit" type="submit">
                  Add item
                </button>
              </div>
            </form>
          </div>
        </div>
      </article>
      <div className="spacer-50"></div>
      <Footer />
    </div>
  );
}
