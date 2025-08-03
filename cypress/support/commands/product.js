// I normally would not use single use commands since they would be used only once probably
// But since I am doing both plain cypress vs cucumber I will create custom commands for every scenario

Cypress.Commands.add("visitProductPage", (product) => {
  cy.visit(`/product/${product}`);
});

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
  cy.get('[data-testid="back-to-products"]')
    .should("be.visible")
    .and("contain.text", "Back to Products");
});

/* Cypress.Commands.add("verifyItem", (quantity, id) => {
  let index = quantity - "1";
  cy.get('[data-testid="quantity-selector"]').select(index);
  cy.get('[data-testid="add-to-cart"]').click();
  cy.get(`[data-testid="quantity-${id}"]`)
    .invoke("val")
    .should("equal", quantity);
});

Cypress.Commands.add("verifyQuantity", (id, quantity) => {});

Cypress.Commands.add("verifySubtotal", () => {});
 */
