Given("I am on the homepage", function () {
  cy.visitHomePage();
});

Given("I have the following address:", function (table) {
  this.address = table.rowsHash();
});

Given("I have the following payment details:", function (table) {
  this.payment = table.rowsHash();
});

When("I add product {int} with quantity {int}", function (id, qty) {
  cy.addProducts(id, qty.toString());
});

When("I add multiple products:", function (table) {
  table.hashes().forEach(({ id, quantity }) => {
    cy.addProducts(parseInt(id, 10), quantity);
  });
});

When("I complete checkout", function () {
  cy.addProductToOrderHistory(this.address, this.payment);
});

When("I go back to the home page", function () {
  cy.get('[data-testid="continue-shopping"]').click();
});

Then("I should see the order number displayed", function () {
  cy.get("@savedOrderNumber").then((orderId) => {
    cy.getOrderNumberValue().should("equal", orderId);
  });
});

Then("I should see order date visible", function () {
  cy.get("@savedOrderNumber").then((orderId) => {
    cy.getOrderDateValue(orderId).should("be.visible");
  });
});

Then("I should see order total visible", function () {
  cy.getOrderTotalValue().should("be.visible");
});

Then("I should see the product details visible", function () {
  cy.get("@savedOrderNumber").then((orderId) => {
    // Only added 1 product
    const productId = 1;
    cy.getOrderItems().should("be.visible");
    cy.getOrderProduct(orderId, productId).should("be.visible");
    cy.getProductThumbnail(orderId, productId).should("be.visible");
    cy.getProductDetails(orderId, productId).should("be.visible");
    cy.getProductName(orderId, productId).should("be.visible");
    cy.getProductPrice(orderId, productId).should("be.visible");
    cy.getProductQuantity(orderId, productId).should("be.visible");
  });
});

Then("the total should match the sum of line items", function () {
  cy.get("@savedOrderNumber").then((orderId) => {
    cy.validateOrderTotal(orderId);
  });
});

Then("the total should not match the sum of line items", function () {
  cy.assertOrderTotalIgnoresQuantity();
});
