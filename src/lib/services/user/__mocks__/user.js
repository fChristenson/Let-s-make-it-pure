const user = { id: 1, username: "foo", products: [] };

function findUserById() {
  return new Promise(resolve => {
    return resolve(user);
  });
}

function buyProduct(userId, productId) {
  return new Promise(resolve => {
    user.products.push(productId);
    return resolve(user);
  });
}

function buyAllProducts(userId, productsToBuy) {
  return new Promise(resolve => {
    user.products = user.products.concat(productsToBuy);
    return resolve(user);
  });
}

class MockUserService {
  constructor() {
    this.findUserById = jest.fn().mockImplementation(findUserById);
    this.buyProduct = jest.fn().mockImplementation(buyProduct);
    this.buyAllProducts = jest.fn().mockImplementation(buyAllProducts);
  }
}

module.exports = MockUserService;
