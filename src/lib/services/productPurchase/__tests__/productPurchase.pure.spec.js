const ProductPurchaseService = require("../");
const {
  BuyProductSpec,
  BuyProductWithRewardsPureSpec
} = require("../__mocks__/mocks");

// we don't need to import any services
// or deal with any boilerplate
describe("ProductPurchaseService test", () => {
  it("has a module", () => {
    expect(ProductPurchaseService).toBeDefined();
  });

  describe("ProductPurchaseService.buyProductPure", () => {
    it("buys a product", async () => {
      const userId = 1;
      const spec = BuyProductSpec();
      await ProductPurchaseService.buyProductPure(spec);

      expect(spec.buyProduct).toHaveBeenCalledTimes(1);
      expect(spec.sendDiscountEmail).toHaveBeenCalledTimes(1);
      expect(spec.sendUserBoughtProductEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe("ProductPurchaseService.buyProductWithRewards", () => {
    it("buys a product with a reward if the user is a gold member", async () => {
      const userId = 1;
      const spec = BuyProductWithRewardsPureSpec();
      spec.isGoldMember = true;
      await ProductPurchaseService.buyProductWithRewardsPure(spec);

      expect(spec.buyAllProducts).toHaveBeenCalledTimes(1);
      expect(spec.sendDiscountEmail).toHaveBeenCalledTimes(1);
      expect(spec.sendUserBoughtProductEmail).toHaveBeenCalledTimes(1);
    });

    it("if the user is not a gold member they should not get a reward", async () => {
      const userId = 1;
      const spec = BuyProductWithRewardsPureSpec();
      await ProductPurchaseService.buyProductWithRewardsPure(spec);

      expect(spec.buyProduct).toHaveBeenCalledTimes(1);
      expect(spec.sendDiscountEmail).toHaveBeenCalledTimes(1);
      expect(spec.sendUserBoughtProductEmail).toHaveBeenCalledTimes(1);
    });
  });
});
