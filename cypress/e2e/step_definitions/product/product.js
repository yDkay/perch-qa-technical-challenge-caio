Given("I visit the product page for product {int}", (id) => {
  cy.visitProductPage(id);
});

When(
  "I verify the product details are {string}, {string}, {string}",
  (name, price, description) => {
    cy.verifyProduct(name, price, description);
  }
);

Then(
  "I verify the quantity selector for product {int} has value {int}",
  (id, quantity) => {
    cy.verifyItem(id.toString(), quantity.toString());
  }
);

When("I visit manual URL for product {int}", (id) => {
  cy.visitManualURL(id);
});

When("I click the back to products button for product {int}", (id) => {
  cy.verifyBackToProducts(id.toString());
});

Then("I should be returned to the main page", () => {
  cy.url().should("eq", "http://localhost:3000/");
});
