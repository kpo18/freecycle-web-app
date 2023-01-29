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
}

export default ProductService;
