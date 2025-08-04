Given("I am on the checkout success page", () => {
  cy.visitSuccessPage();
});

Then("I should see the success page content", () => {
  cy.verifySuccessContent();
});

When("I click continue shopping", () => {
  cy.clickContinueShopping();
});

Then("I should be on the home page", () => {
  cy.shouldBeHomePage();
});

When("I click view your orders", () => {
  cy.clickViewOrders();
});

Then("I should be on the profile page", () => {
  cy.shouldBeProfilePage();
});
