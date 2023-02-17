import React, { useState } from "react";
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

    //image with take in image path
    image: null,
    location: "",
    contact: "",
    category: "",
    available: true,
  });

  //store image from form
  const [image, setImage] = useState(null);

  const categories = [
    { name: "Women Clothing and Accessories", id: 1 },
    { name: "Men Clothing and Accessories", id: 2 },
    { name: "Kids Clothing and Accessories", id: 3 },
    { name: "Electronic", id: 4 },
    { name: "Appliances", id: 5 },
    { name: "Food", id: 6 },
    { name: "Baby", id: 7 },
    { name: "Furniture and Lighting", id: 8 },
    { name: "Garden", id: 9 },
    { name: "Indoor Plants", id: 10 },
    { name: "Pet Food and Accessories", id: 11 },
    { name: "Sports Equipment", id: 12 },
    { name: "Kitchen", id: 13 },
    { name: "Other", id: 14 },
  ];

  // Add item from form input
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setItem((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //create a new data form object with the form values
    const formData = new FormData();
    //add key value pair
    formData.append("image", image);

    //wait for the item which should have the ID returned (from the backend then save it to a variable)
    const itemResponse = await addItem(item);
    console.log(itemResponse);

    /* PUT IMAGE FETCH HERE */
    try {
      const newImage = await services.productService.createImage(
        itemResponse,
        formData
      );
      return newImage && navigate("/admin?success=1");
    } catch (error) {
      console.log(error);
    }
  };

  //saves the file name to state
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files);
  };

  const addItem = async (item) => {
    setLoading(true);

    try {
      const newItem = await services.productService.create(item);
      return newItem;
      /* navigate("/admin?success=1"); */ //navigates back to Admin when item was added
    } catch (error) {
      setError("Oops! Something went wrong. Try again later");
    } finally {
      setLoading(false);
    }
  };

  // Show error & loading states
  let state = <></>;
  if (error) {
    state = <>{error}</>;
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
          <h2>Add new item</h2>
          {state}
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
                {/* changing this to be able to upload rather than paste link */}

                <label>
                  <input type="file" onChange={handleImage} />
                  IMAGE
                </label>

                {/* <div className="col">
                {image && <img src={image} style={{ width: "100px" }} />}
              </div> */}
                {/*    <label>IMAGE</label>
              </div>
              <div>
                <input
                  type="url"
                  placeholder="upload a photo of your item"
                  value={item.image}
                  name="image"
                  onChange={(e) => handleChange(e)}
  />*/}
              </div>

              <div>
                <label>SELECT A CATEGORY</label>
              </div>
              <select
                name="category"
                value={item.category}
                onChange={(e) => handleChange(e)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
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
