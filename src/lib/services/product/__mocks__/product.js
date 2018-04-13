function findProductById(id) {
  return new Promise(resolve => {
    const id = Math.floor(Math.random() * 100);
    return resolve({ id, productname: "product" });
  });
}

function findRewardProducts(id) {
  return new Promise(resolve => {
    return resolve([]);
  });
}

class MockProductService {
  constructor() {
    this.findProductById = jest.fn().mockImplementation(findProductById);
    this.findRewardProducts = jest.fn().mockImplementation(findRewardProducts);
  }
}

module.exports = MockProductService;
