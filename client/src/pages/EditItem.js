import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../services";

export function EditItem() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [item, setItem] = useState(null);
  const [tempItem, setTempItem] = useState(); 
  const [changed, setChanged] = useState(false); 

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
    { name: "Other", id: 14 }
  ]; 


  // Check if changes were made
/*   useEffect(() => {
    console.log("item", item);
    console.log("tempItem", tempItem);


      if (!item) return; 
      if (!item) return; 

      let equal = true; 
        if (item.title !== tempItem.title) equal = false; 
        if (item.description !== tempItem.description) equal = false;
        if (item.image !== tempItem.image) equal = false;
        if (item.location !== tempItem.location) equal = false;
        if (item.contact !== tempItem.contact) equal = false;
        if (item.category !== tempItem.category) equal = false;
        if (equal) setChanged(false);
  },) */

  // Get item
  useEffect(() => {
      const getItem = async () => {
        try {
          const item = await services.productService.fetchOne(id);
          setItem(item);
          setTempItem(item);
        } catch(error) {
          setError(error);
        } 
      };
      getItem();
    }, [id]);

    // Update item
    const updateItem = async (id) => {
        try {
            await services.productService.updateItem({tempItem, id});
            setChanged(false); 
            navigate("/admin?updated=1");
        } catch(error) {
          setError(error);
        }
    } 

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
          <h2>Edit item</h2>
          {state}
          <div className="form-control">
              <div>
                <label>TITLE</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.title}
                  name="title"
                  maxLength="50"
                  onChange={(e) => {
                      setChanged(true); 
                      setTempItem({
                        ...tempItem, 
                        title: e.target.value});
                      }}
                />
              </div>
              <div>
                <label>DESCRIPTION</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.description}
                  name="description"
                  maxLength="500"
                  onChange={(e) => {
                    setChanged(true); 
                    setTempItem({
                      ...tempItem, 
                      description: e.target.value});
                    }}
                />
              </div>
              <div>
                <label>IMAGE</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.image}
                  name="image"
                  onChange={(e) => {
                    setChanged(true); 
                    setTempItem({
                      ...tempItem, 
                      image: e.target.value});
                    }}
                />
              </div>
              <div>
                <label>SELECT A CATEGORY</label>
              </div>
              <select 
                name="category" 
                value={tempItem.category} 
                onChange={(e) => {
                setChanged(true); 
                setTempItem({
                  ...tempItem,
                  category: e.target.value});
              }}>
                {categories.map(category =>  <option key={category.id} value={category.name}>{category.name}</option>)}
               
              </select>
              <div>
                <label>LOCATION</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.location}
                  name="location"
                  maxLength="30"
                  onChange={(e) => {
                    setChanged(true); 
                    setTempItem({
                      ...tempItem, 
                      location: e.target.value});
                    }}
                />
              </div>
              <div>
                <label>CONTACT INFO</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.contact}
                  name="contact"
                  maxLength="30"
                  onChange={(e) => {
                    setChanged(true);
                    setTempItem({
                      ...tempItem, 
                      contact: e.target.value});
                    }}
                />
              </div>
              { changed ? 
              <div>
                <button 
                    className="modal-cancel"
                    onClick={(e) => { 
                    setTempItem({...item});
                    setChanged(false);
                    }}
                >
                  Cancel
                </button>
                <button className="btn-taken" onClick={() => updateItem(tempItem.id)}>
                  Save changes
                </button>
                
              </div> : <button className="modal-cancel">
                  No changes to save
                </button> }
          </div>
        </div>
      </article>
      ) : null}
      <div className="spacer-50"></div>
      <Footer />
    </div>
  );
}
