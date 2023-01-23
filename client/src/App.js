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
    <div>
      <header>
        <div>Logo</div>
        <div>Admin</div>
        <div>Add item</div>
      </header>
      <section>
        <div>Get rid of stuff you no longer need</div>
        <div>image</div>
      </section>
      <article>
        <div>Recently added</div>
        <div>
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
      </article>
      <footer>
        <div>Made with 🤍 as an MVP project</div>
      </footer>
    </div>
  );
}

export default App;
