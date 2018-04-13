const user = { id: 1, username: "foo", products: [] };

function buyAllProducts(userId, productsToBuy) {
  return new Promise(resolve => {
    user.products = user.products.concat(productsToBuy);
    return resolve(user);
  });
}

function buyProduct(userId, productId) {
  return new Promise(resolve => {
    user.products.push(productId);
    return resolve(user);
  });
}

function sendDiscountEmail(user) {
  return new Promise(resolve => {
    return resolve(user);
  });
}

function sendUserBoughtProductEmail(user) {
  return new Promise(resolve => {
    return resolve(user);
  });
}

const BuyProductPureSpec = () => {
  return {
    userId: 1,
    productId: 1,
    buyProduct: jest.fn().mockImplementation(buyProduct),
    sendDiscountEmail: jest.fn().mockImplementation(sendDiscountEmail),
    sendUserBoughtProductEmail: jest
      .fn()
      .mockImplementation(sendUserBoughtProductEmail)
  };
};

module.exports.BuyProductSpec = BuyProductPureSpec;

const BuyProductWithRewardsPureSpec = () => {
  return {
    userId: 1,
    isGoldMember: false,
    rewardProducts: [],
    productId: 1,
    buyAllProducts: jest.fn().mockImplementation(buyAllProducts),
    buyProduct: jest.fn().mockImplementation(buyProduct),
    sendDiscountEmail: jest.fn().mockImplementation(sendDiscountEmail),
    sendUserBoughtProductEmail: jest
      .fn()
      .mockImplementation(sendUserBoughtProductEmail)
  };
};

module.exports.BuyProductWithRewardsPureSpec = BuyProductWithRewardsPureSpec;
