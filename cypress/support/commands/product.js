Cypress.Commands.add("verifyProduct", (name, price, description) => {
  cy.get('[data-testid="product-image"]').should("be.visible");
  cy.get('[data-testid="product-name"]')
    .should("be.visible")
    .and("have.text", name);
  cy.get('[data-testid="product-price"]')
    .should("be.visible")
    .and("have.text", price);
  cy.get('[data-testid="product-description"]').contains("Description");
  cy.get('[data-testid="product-description"]')
    .should("be.visible")
    .and("contain.text", description);
  cy.get(".quantity-selector").should("be.visible");
  cy.get('[data-testid="quantity-selector"]').should("be.visible");
  cy.get('[data-testid="add-to-cart"]')
    .should("be.visible")
    .and("have.text", "Add to Cart");
});

Cypress.Commands.add("verifyBackToProducts", (id) => {
  if (id < 1 || id > 3) {
    throw new Error(`Invalid product id: ${id} — stopping test`);
  }
  cy.get('[data-testid="back-to-products"]')
    .should("be.visible")
    .and("contain.text", "Back to Products")
    .click();
  cy.url().should("eq", "http://localhost:3000/");
});

Cypress.Commands.add("visitManualURL", (id) => {
  cy.visit(`/product/${id}`);
  if (id < 1 || id > 3) {
    cy.url().should("eq", "http://localhost:3000/");
    return;
  }
  cy.url().should("include", `/product/${id}`);
});

Cypress.Commands.add("verifyItem", (id, quantity) => {
  let index = quantity - "1";
  cy.get('[data-testid="quantity-selector"]').select(index);
  cy.get('[data-testid="add-to-cart"]').click();
  cy.get(`[data-testid="quantity-${id}"]`)
    .invoke("val")
    .should("equal", quantity);
  cy.reload();
  cy.get('[data-testid="empty-cart"]')
    .should("be.visible")
    .and("contain.text", "Your cart is empty");
  cy.get('[data-testid="empty-cart"] > [data-testid="continue-shopping"]')
    .should("be.visible")
    .and("have.text", "Continue Shopping");
});
