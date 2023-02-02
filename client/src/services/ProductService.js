class ProductService {
  fetchAll() {
    return fetch("http://localhost:5050/items").then((response) =>
      response.json()
    );
  }

  fetchAllActive() {
    return fetch("http://localhost:5050/items/status=available").then((response) => response.json()
    );
  }

  fetchAllSearch(searchTerm) {
    return fetch(`http://localhost:5050/items/status=available?q=${searchTerm}`).then((response) => response.json()
    );
  }

  fetchOne(id) {
    return fetch(`http://localhost:5050/items/${id}`).then((response) =>
      response.json()
    );
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

}

export default ProductService;
