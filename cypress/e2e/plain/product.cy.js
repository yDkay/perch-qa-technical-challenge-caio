const products = [
  {
    id: 1,
    name: "Classic White Sneakers",
    price: "$79.99",
    description: "Comfortable and stylish white sneakers for everyday wear",
    quantityArgs: { id: "1", quantity: "2" },
  },
  {
    id: 2,
    name: "Premium Leather Watch",
    price: "$149.99",
    description: "Elegant leather watch with premium craftsmanship",
    quantityArgs: { id: "2", quantity: "3" },
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: "$199.99",
    description: "High-quality wireless headphones with noise cancellation",
    quantityArgs: { id: "3", quantity: "5" },
  },
];

products.forEach(({ id, name, price, description, quantityArgs }) => {
  describe(`Product ${id} Tests`, () => {
    beforeEach(() => {
      cy.visitProductPage(id);
    });
    it("Verify back to Products", () => {
      cy.verifyBackToProducts();
    });
    it(`Verify ${name}`, () => {
      cy.verifyProduct(name, price, description);
    });
    it("Verify quantity selector", () => {
      const { id, quantity } = quantityArgs;
      cy.verifyItem(id, quantity);
    });
  });
});

describe("Product Page edge cases and return button", () => {
  for (let id = 1; id <= 5; id++) {
    it(`Verify manual URL for product ${id}`, () => {
      cy.visitManualURL(id);
    });
  }
  it("Return button returns to main page", () => {
    let id = 2;
    cy.visitManualURL(id);
    cy.verifyBackToProducts(id);
  });
});
