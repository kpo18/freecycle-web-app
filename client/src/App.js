import React, {useEffect, useState } from "react"; 
import './App.css';
import { Route, Routes } from "react-router-dom"; 
import { AddItem } from "./pages/AddItem"; 
import { Home } from "./pages/Home";
import { ItemDetail } from "./pages/ItemDetail";
import { AdminView } from "./pages/AdminView";


function App() {
  const [items, setItems] = useState([]); 

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch("http://localhost:5050/api")
      .then(response => response.json())
      .then(items => {
        setItems(items);
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
      <Routes>
        <Route path="/" element={<Home items={items} />} />
        <Route path="/new" element={<AddItem />} />
        <Route path="/:id" element={<ItemDetail />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
  );
}

export default App;
