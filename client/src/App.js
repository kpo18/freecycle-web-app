import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AddItem } from "./pages/AddItem";
import { Home } from "./pages/Home";
import { ItemDetail } from "./pages/ItemDetail";
import { AdminView } from "./pages/AdminView";
import { EditItem } from "./pages/EditItem";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
            path="/new" 
            element={
              <PrivateRoute>
                <AddItem />
              </PrivateRoute>
            } />
      <Route path="/:id" element={<ItemDetail />} />
      <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminView />
              </PrivateRoute>
            } />
      <Route path="/:id/edit" element={<EditItem />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 
    </Routes>
  );
}

export default App;
