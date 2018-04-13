let user = { id: 1, username: "foo", products: [] };

class UserService {
  // fake database call
  findUserById(id) {
    return new Promise(resolve => {
      return resolve(user);
    });
  }

  buyProduct(userId, productId) {
    return new Promise(resolve => {
      user.products.push(productId);
      return resolve(user);
    });
  }

  buyAllProducts(userId, productsToBuy) {
    return new Promise(resolve => {
      user.products = user.products.concat(productsToBuy);
      return resolve(user);
    });
  }
}

module.exports = UserService;
