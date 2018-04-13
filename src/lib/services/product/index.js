class ProductService {
  // fake database call
  findProductById(id) {
    return new Promise(resolve => {
      const id = Math.floor(Math.random() * 100);
      return resolve({ id, productname: "product" });
    });
  }

  findRewardProducts(id) {
    return new Promise(resolve => {
      return resolve([]);
    });
  }
}

module.exports = ProductService;
