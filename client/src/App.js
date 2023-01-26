import React from "react"; 
import './App.css';
import { Route, Routes } from "react-router-dom"; 
import { AddItem } from "./pages/AddItem"; 
import { Home } from "./pages/Home";
import { ItemDetail } from "./pages/ItemDetail";
import { AdminView } from "./pages/AdminView";


function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<AddItem />} />
        <Route path="/:id" element={<ItemDetail />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
  );
}

export default App;
