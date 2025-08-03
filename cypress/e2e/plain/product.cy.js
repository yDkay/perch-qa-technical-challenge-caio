describe("Product 1 Tests", () => {
  beforeEach(() => {
    cy.visitProductPage(1);
  });
  it("Verify Classic White Sneakers", () => {
    cy.verifyProduct(
      "Classic White Sneakers",
      "$79.99",
      "Comfortable and stylish white sneakers for everyday wear"
    );
  });
});

describe("Product 2 Tests", () => {
  beforeEach(() => {
    cy.visitProductPage(2);
  });
  it("Verify Premium Leather Watch", () => {
    cy.verifyProduct(
      "Premium Leather Watch",
      "$149.99",
      "Elegant leather watch with premium craftsmanship"
    );
  });
});

describe("Product 3 Tests", () => {
  beforeEach(() => {
    cy.visitProductPage(3);
  });
  it("Verify Wireless Headphones", () => {
    cy.verifyProduct(
      "Wireless Headphones",
      "$199.99",
      "High-quality wireless headphones with noise cancellation"
    );
  });
});
