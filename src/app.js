const express = require("express");
const app = express();
const {
  userService,
  productPurchaseService,
  productService,
  emailService
} = require("./lib/services");

// common functionality implemented in a naive way
// this will not scale over time
app.post("/api/v1/users/:id/buy/:productId", async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  if (user === null) return res.json({ error: "User not found" });

  const product = await productService.findProductById(req.params.productId);
  if (product === null) return res.json({ error: "Product not found" });

  // should the userService know how to buy a product?
  // that will be a great discussion for you and your coworkers
  const updatedUser = await userService.buyProduct(user.id, product.id);

  return res.json(updatedUser);
});

// endpoint versions ftw
// Complexity is starting to grow, it is still possible
// to manage but this trend will keep going until there
// is so much code that it is not possible to manage
app.post("/api/v2/users/:id/buy/:productId", async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  // MVC states that a controller should only be the "glue"
  // that connects the request to the logic, this is not
  // happening here, even though it is not much logic
  // we still have logic here
  if (user === null) return res.json({ error: "User not found" });

  const product = await productService.findProductById(req.params.productId);
  // what is the lesson here?
  // best practices are just rules you need to follow when you can,
  // make an exception when you have to
  if (product === null) return res.json({ error: "Product not found" });

  const updatedUser = await userService.buyProduct(user.id, product.id);
  await emailService.sendDiscountEmail(updatedUser);
  await emailService.sendUserBoughtProductEmail(updatedUser);

  return res.json(updatedUser);
});

// endpoint versions ftw
// common solution to the complexity explosion problem
// we dump all the logic connected to buying a product in to
// a service method
app.post("/api/v3/users/:id/buy/:productId", async (req, res) => {
  // Are we breaking the single responsibility rule?
  // Yes, but we have to since a controller is an exception
  // to a good rule that should be applied whenever possible
  const user = await productPurchaseService.buyProduct(
    req.params.id, // userId
    req.params.productId // productId
  );
  return res.json(user);
});

// endpoint versions ftw
// we can pass in anything that is "impure"
app.post("/api/v4/users/:id/buy/:productId", async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  const product = await productService.findProductById(req.params.productId);

  // we can get pure by passing everything
  const spec = {
    user: user,
    product: product,
    buyProduct: userService.buyProduct,
    sendDiscountEmail: emailService.sendDiscountEmail,
    sendUserBoughtProductEmail: emailService.sendUserBoughtProductEmail
  };
  const updatedUser = await productPurchaseService.buyProductPure(spec);
  return res.json(updatedUser);
});

// endpoint versions ftw
// what about logic with conditions?
app.post("/api/v5/users/:id/buy/:productId", async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  const product = await productService.findProductById(req.params.productId);
  const rewardProducts = await productService.findRewardProducts(product.id);

  // if we need to do something impure based on a condition
  // we can grab all the data and only use it if we need to
  const spec = {
    user: user,
    rewardProducts,
    product: product,
    buyAllProducts: userService.buyAllProducts,
    sendDiscountEmail: emailService.sendDiscountEmail,
    sendUserBoughtProductEmail: emailService.sendUserBoughtProductEmail
  };
  const updatedUser = await productPurchaseService.buyProductWithRewardsPure(
    spec
  );
  return res.json(updatedUser);
});

module.exports = app;
