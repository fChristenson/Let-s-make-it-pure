class ProductPurchaseService {
  // composition over inheritance
  // could also import the services in the file
  // but buy passing them in we can let the caller
  // control how to instantiate them
  constructor(userService, productService, emailService) {
    this.userService = userService;
    this.productService = productService;
    this.emailService = emailService;
    this.buyProduct.bind(this);
    this.buyProductWithRewards.bind(this);
  }

  // standard OOP service method approach to solving a complex operation
  buyProduct(userId, productId) {
    return new Promise(async (resolve, reject) => {
      let user = await this.userService.findUserById(userId);
      if (user === null) return reject(new Error("User not found"));

      const product = await this.productService.findProductById(productId);
      if (product === null) return reject(new Error("Product not found"));

      user = await this.userService.buyProduct(user.id, product.id);
      await this.emailService.sendDiscountEmail(user);
      await this.emailService.sendUserBoughtProductEmail(user);

      return resolve(user);
    });
  }

  buyProductWithRewards(userId, productId) {
    return new Promise(async (resolve, reject) => {
      let user = await this.userService.findUserById(userId);
      if (user === null) return reject(new Error("User not found"));

      const product = await this.productService.findProductById(productId);
      if (product === null) return reject(new Error("Product not found"));

      if (user.isGoldMember) {
        const rewardProducts = await this.productService.findRewardProducts(
          productId
        );
        user = await this.userService.buyAllProducts(userId, [
          productId,
          ...rewardProducts
        ]);
      } else {
        user = await this.userService.buyProduct(user.id, product.id);
      }

      await this.emailService.sendDiscountEmail(user);
      await this.emailService.sendUserBoughtProductEmail(user);

      return resolve(user);
    });
  }
}

// basic pure method to solve a complex operation
// by doing this we have detached all the data and
// functions from where they are in the project
// and we can focus on the logic
ProductPurchaseService.buyProductPure = function(spec) {
  const {
    user,
    product,
    buyProduct,
    sendDiscountEmail,
    sendUserBoughtProductEmail
  } = spec;

  return new Promise(async (resolve, reject) => {
    const updatedUser = await buyProduct(user.id, product.id);
    await sendDiscountEmail(updatedUser);
    await sendUserBoughtProductEmail(updatedUser);

    return resolve(updatedUser);
  });
};

// basic pure method to solve a complex operation
ProductPurchaseService.buyProductWithRewardsPure = function(spec) {
  const {
    userId,
    isGoldMember,
    rewardProducts,
    productId,
    buyAllProducts,
    buyProduct,
    sendDiscountEmail,
    sendUserBoughtProductEmail
  } = spec;

  return new Promise(async (resolve, reject) => {
    let updatedUser;

    if (user.isGoldMember) {
      updatedUser = await buyAllProducts(user.id, [
        product.id,
        ...rewardProducts
      ]);
    } else {
      updatedUser = await buyProduct(user.id, product.id);
    }
    await sendDiscountEmail(updatedUser);
    await sendUserBoughtProductEmail(updatedUser);

    return resolve(updatedUser);
  });
};

module.exports = ProductPurchaseService;
