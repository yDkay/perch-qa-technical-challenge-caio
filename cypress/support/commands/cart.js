Cypress.Commands.add("validateEmptyCart", () => {
  cy.get('[data-testid="empty-cart"]')
    .should("be.visible")
    .and("contain.text", "Your cart is empty");
  cy.get('[data-testid="empty-cart"] > [data-testid="continue-shopping"]')
    .should("be.visible")
    .and("have.text", "Continue Shopping");
  cy.get(".cart-header")
    .should("be.visible")
    .and("contain.text", "Shopping Cart");
  cy.get('.cart-header > [data-testid="continue-shopping"]')
    .should("be.visible")
    .and("contain.text", "Continue Shopping");
});

Cypress.Commands.add("validateEmptyCartFromHomepage", () => {
  cy.get('[data-testid="nav-to-cart"]').should("be.visible").click();
  cy.validateEmptyCart();
});

Cypress.Commands.add("validateEmptyCartFromURL", () => {
  cy.visitCartPage();
  cy.url().should("eq", "http://localhost:3000/cart");
  cy.validateEmptyCart();
});

Cypress.Commands.add("addSingleProduct", (id, quantity) => {
  cy.get(`[data-testid="view-product-${id}"]`).click();
  let index = quantity - "1";
  cy.get('[data-testid="quantity-selector"]').select(index);
  cy.get('[data-testid="product-price"]')
    .invoke("text")
    .then((pagePrice) => {
      cy.get('[data-testid="add-to-cart"]').click();
      cy.get(`[data-testid="item-price-${id}"]`)
        .invoke("text")
        .then((cartPrice) => {
          expect(cartPrice).to.equal(pagePrice);
        });
    });
});

Cypress.Commands.add("addMultipleProducts", (products) => {
  if (!Array.isArray(products)) {
    throw new Error("Products must be an array of {id, quantity} objects");
  }

  products.forEach(({ id, quantity }) => {
    if (!id || !quantity) {
      throw new Error("Each product must have both id and quantity");
    }

    cy.get(`[data-testid="view-product-${id}"]`).click();
    const index = quantity - "1";
    cy.get('[data-testid="quantity-selector"]').select(index);
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="continue-shopping"]').click();
  });
  cy.get('[data-testid="nav-to-cart"]').click();
});

Cypress.Commands.add("editQuantity", (id, newQuantity) => {
  cy.get(`[data-testid="quantity-${id}"]`).select(newQuantity);
  cy.get(`[data-testid="quantity-${id}"]`)
    .invoke("val")
    .should("equal", newQuantity);
});

Cypress.Commands.add("validateSubtotal", () => {
  let totalExpected = 0;

  cy.get('[data-testid^="item-price-"]')
    .each(($priceElement) => {
      const id = $priceElement.attr("data-testid").replace("item-price-", "");
      const price = parseFloat($priceElement.text().replace("$", ""));

      cy.get(`[data-testid="quantity-${id}"]`)
        .invoke("val")
        .then((qty) => {
          const quantity = parseInt(qty, 10);
          totalExpected += price * quantity;
        });
    })
    .then(() => {
      cy.get('[data-testid="subtotal"]')
        .invoke("text")
        .then((actual) => {
          const expectedFormatted = `$${totalExpected.toFixed(2)}`;
          expect(actual).to.equal(
            expectedFormatted,
            `Total of all items should equal ${expectedFormatted}`
          );
        });
    });
});

Cypress.Commands.add("removeSingleProduct", (id) => {
  if (!id) {
    throw new Error("Product ID is required to remove single product");
  }
  cy.get(`[data-testid="remove-${id}"]`).click();
});

Cypress.Commands.add("removeAllProducts", () => {
  cy.get('[data-testid^="remove-"]').each(($removeBtn) => {
    cy.wrap($removeBtn).click();
  });
  cy.validateEmptyCart();
});

Cypress.Commands.add("proceedToCheckout", () => {
  cy.get('[data-testid="proceed-to-checkout"]').click();
  cy.url().should("include", "/checkout/address");
  cy.get('[data-testid="back-to-cart"]')
    .should("be.visible")
    .and("contain.text", "Back to Cart")
    .click();
  cy.url().should("include", "/cart");
});
