const EmailService = require("./email");
const ProductService = require("./product");
const UserService = require("./user");
const ProductPurchaseService = require("./productPurchase");

// This is our bootstrap file for all our services,
// by doing this we can instantiate all our services,
// this scales very well without any complexity

// NOTE: In languages such as Java it is very
// common to use @inject or other meta programming
// patterns to inject the dependency at runtime
// this approach is imo simpler and works just as well.
const emailService = new EmailService();
const productService = new ProductService();
const userService = new UserService();
const productPurchaseService = new ProductPurchaseService(
  userService,
  productService,
  emailService
);

module.exports = {
  userService,
  productService,
  emailService,
  productPurchaseService
};
