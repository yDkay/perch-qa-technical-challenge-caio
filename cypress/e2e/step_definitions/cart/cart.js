Given("I visit home page", () => {
  cy.visitHomePage();
});

When("I validate empty cart from homepage", () => {
  cy.validateEmptyCartFromHomepage();
});

When("I validate empty cart from URL", () => {
  cy.validateEmptyCartFromURL();
});

When("I add single product {int} with quantity {int}", (id, quantity) => {
  cy.addSingleProduct(id, quantity.toString());
});

When("I validate subtotal", () => {
  cy.validateSubtotal();
});

When("I edit product {int} quantity to {int}", (id, newQuantity) => {
  cy.editQuantity(id, newQuantity.toString());
});

When("I remove single product {int}", (id) => {
  cy.removeSingleProduct(id);
});

When("I proceed to checkout", () => {
  cy.proceedToCheckout();
});

When("I add multiple products:", (dataTable) => {
  const products = dataTable.hashes().map(({ id, quantity }) => ({
    id: parseInt(id, 10),
    quantity: quantity.toString(),
  }));
  cy.addMultipleProducts(products);
});

When("I remove all products", () => {
  cy.removeAllProducts();
});
