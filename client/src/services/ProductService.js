class ProductService {
  async fetchAll() {
    const response = await fetch("http://localhost:5050/items");
    return response.json();
  }

  async fetchAllActive() {
    const response = await fetch("http://localhost:5050/items/filter"); 
    return response.json();
  }

  async fetchAllSearch(searchTerm) {
    const response = await fetch(`http://localhost:5050/items/filter?q=${searchTerm}`); 
    return response.json();
  }

  async fetchAllCategory(category) {
    const response = await fetch(`http://localhost:5050/items/filter?category=${category}`); 
    return response.json();
  }

  async fetchOne(id) {
    const response = await fetch(`http://localhost:5050/items/${id}`); 
    return response.json();
  }

  create(item) {
    return fetch("http://localhost:5050/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })

  }

  delete(id) {
    return fetch(`http://localhost:5050/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  markTaken({takenItem, id}) {
    return fetch(`http://localhost:5050/items/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(takenItem)
    });
  }

  updateItem({tempItem, id}) {
    return fetch(`http://localhost:5050/items/${id}`, {
      method: "PUT", 
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(tempItem)
      });
  }

}

export default ProductService;
