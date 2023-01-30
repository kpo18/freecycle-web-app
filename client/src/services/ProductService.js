class ProductService {
  fetchAll() {
    return fetch("http://localhost:5050/api").then((response) =>
      response.json()
    );
  }

  fetchOne(id) {
    return fetch(`http://localhost:5050/api/${id}`).then((response) =>
      response.json()
    );
  }

  create(item) {
    return fetch("http://localhost:5050/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })

  }
}

export default ProductService;
