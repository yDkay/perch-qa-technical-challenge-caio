describe("Cart Page Tests", () => {
  const testData = {
    multipleProducts: [
      { id: 1, quantity: "2" },
      { id: 2, quantity: "3" },
      { id: 3, quantity: "4" },
    ],
  };

  beforeEach(() => {
    cy.visitHomePage();
  });

  it("Validate Empty Cart From main page", () => {
    cy.validateEmptyCartFromHomepage();
  });

  it("Validate Empty Cart From URL", () => {
    cy.validateEmptyCartFromURL();
  });

  it("Add, validate and remove a single product from cart page", () => {
    const id = 1;
    cy.addSingleProduct(id, "2");
    cy.validateSubtotal(id);
    cy.editQuantity(id, "3");
    cy.validateSubtotal();
    cy.removeSingleProduct(id);
  });

  it("Add, validate and proceed to checkout with a single product from cart page", () => {
    const id = 2;
    cy.addSingleProduct(id, "3");
    cy.validateSubtotal();
    cy.editQuantity(id, "4");
    cy.validateSubtotal();
    cy.proceedToCheckout();
  });

  it("Add, validate and remove multiple products from cart page", () => {
    cy.addMultipleProducts(testData.multipleProducts);
    cy.validateSubtotal();
    cy.editQuantity(2, "5");
    cy.validateSubtotal();
    cy.removeSingleProduct(1);
    cy.validateSubtotal();
    cy.removeAllProducts();
  });

  it("Add, validate and proceed to checkout with multiple products from cart page", () => {
    cy.addMultipleProducts(testData.multipleProducts);
    cy.validateSubtotal();
    cy.editQuantity(3, "2");
    cy.validateSubtotal();
    cy.proceedToCheckout();
  });
});
