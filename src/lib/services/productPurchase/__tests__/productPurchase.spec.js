const ProductPurchaseService = require("../");
const MockProductService = require("../../product/__mocks__/product");
const MockUserService = require("../../user/__mocks__/user");
const MockEmailService = require("../../email/__mocks__/email");

describe("ProductPurchaseService test", () => {
  let emailService;
  let productService;
  let userService;

  beforeEach(() => {
    // if these services get their own dependencies we quickly
    // have to spend a lot of time writing boilerplate code
    // for every test
    emailService = new MockEmailService();
    productService = new MockProductService();
    userService = new MockUserService();
  });

  it("has a module", () => {
    expect(ProductPurchaseService).toBeDefined();
  });

  // not the sexiest way to write code but it scales to big companies
  it("can init", () => {
    const productPurchaseService = new ProductPurchaseService(
      userService,
      productService,
      emailService
    );
    expect(productPurchaseService).toBeDefined();
    expect(productPurchaseService.emailService).toBe(emailService);
    expect(productPurchaseService.productService).toBe(productService);
    expect(productPurchaseService.userService).toBe(userService);
  });

  describe("ProductPurchaseService.buyProduct", () => {
    it("buys a product", async () => {
      const productPurchaseService = new ProductPurchaseService(
        userService,
        productService,
        emailService
      );

      const userId = 1;
      await productPurchaseService.buyProduct(userId);

      expect(userService.findUserById).toHaveBeenCalledTimes(1);
      expect(productService.findProductById).toHaveBeenCalledTimes(1);
      expect(userService.buyProduct).toHaveBeenCalledTimes(1);
      expect(emailService.sendDiscountEmail).toHaveBeenCalledTimes(1);
      expect(emailService.sendUserBoughtProductEmail).toHaveBeenCalledTimes(1);
    });

    it("throws a error if there is no user found", async () => {
      userService.findUserById.mockReturnValue(Promise.resolve(null));
      const productPurchaseService = new ProductPurchaseService(
        userService,
        productService,
        emailService
      );

      try {
        const userId = 1;
        await productPurchaseService.buyProduct(userId);
        throw new Error("Should fail");
      } catch (e) {
        expect(e.message).toEqual("User not found");
      }
    });

    it("throws a error if there is no user found", async () => {
      productService.findProductById.mockReturnValue(Promise.resolve(null));
      const productPurchaseService = new ProductPurchaseService(
        userService,
        productService,
        emailService
      );

      try {
        const userId = 1;
        await productPurchaseService.buyProduct(userId);
        throw new Error("Should fail");
      } catch (e) {
        expect(e.message).toEqual("Product not found");
      }
    });
  });

  describe("ProductPurchaseService.buyProductWithRewards", () => {
    it("buys a product with a reward if the user is a gold member", async () => {
      userService.findUserById.mockReturnValue(
        Promise.resolve({ isGoldMember: true })
      );
      const productPurchaseService = new ProductPurchaseService(
        userService,
        productService,
        emailService
      );

      const userId = 1;
      const productId = 1;
      await productPurchaseService.buyProductWithRewards(userId, productId);

      expect(userService.findUserById).toHaveBeenCalledTimes(1);
      expect(productService.findProductById).toHaveBeenCalledTimes(1);
      expect(userService.buyAllProducts).toHaveBeenCalledTimes(1);
      expect(emailService.sendDiscountEmail).toHaveBeenCalledTimes(1);
      expect(emailService.sendUserBoughtProductEmail).toHaveBeenCalledTimes(1);
    });

    it("buys a product with a reward if the user is a gold member", async () => {
      userService.findUserById.mockReturnValue(Promise.resolve(null));
      const productPurchaseService = new ProductPurchaseService(
        userService,
        productService,
        emailService
      );

      try {
        const userId = 1;
        const productId = 1;
        await productPurchaseService.buyProductWithRewards(userId, productId);
        throw new Error("fail");
      } catch (e) {
        expect(e.message).toEqual("User not found");
      }
    });

    it("buys a product with a reward if the user is a gold member", async () => {
      productService.findProductById.mockReturnValue(Promise.resolve(null));
      const productPurchaseService = new ProductPurchaseService(
        userService,
        productService,
        emailService
      );

      try {
        const userId = 1;
        const productId = 1;
        await productPurchaseService.buyProductWithRewards(userId, productId);
        throw new Error("fail");
      } catch (e) {
        expect(e.message).toEqual("Product not found");
      }
    });

    it("if the user is not a gold member they should not get a reward", async () => {
      const productPurchaseService = new ProductPurchaseService(
        userService,
        productService,
        emailService
      );

      const userId = 1;
      const productId = 1;
      await productPurchaseService.buyProductWithRewards(userId, productId);

      expect(userService.findUserById).toHaveBeenCalledTimes(1);
      expect(productService.findProductById).toHaveBeenCalledTimes(1);
      expect(userService.buyProduct).toHaveBeenCalledTimes(1);
      expect(emailService.sendDiscountEmail).toHaveBeenCalledTimes(1);
      expect(emailService.sendUserBoughtProductEmail).toHaveBeenCalledTimes(1);
    });
  });
});
