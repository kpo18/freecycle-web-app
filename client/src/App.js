import React, {useEffect, useState } from "react"; 
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <p>
          Hello
        </p>
      </header>
      <div>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <p>
                {item.title} {item.description} {item.image} {item.location} {item.contact}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
