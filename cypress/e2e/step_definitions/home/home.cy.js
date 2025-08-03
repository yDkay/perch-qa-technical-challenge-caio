import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given("I am on the homepage", () => {
  cy.visitHomePage();
});

When("I should see the main content and products", () => {
  cy.verifyHomeContent();
});

Then("I should see the Profile, Cart and Sort by Price buttons", () => {
  cy.verifyHomeButtons();
});

Then(
  "I should verify product {int} card with name {string}, price {string} and description {string}",
  (id, name, price, description) => {
    cy.verifyCard(id, name, price, description);
  }
);

When("I type {string} into the search field", (term) => {
  cy.typeInSearch(term);
});

Then("I should see search results for {string}", (term) => {
  cy.verifySearch(term);
});

When("I sort products by {string}", (type) => {
  cy.sort(type);
});

Then("I should see products sorted by {string}", (type) => {
  cy.verifySorted(type);
});

When("I click the {string} button", (button) => {
  cy.navigateButton(button);
});

Then("I should be on the {string} page", (path) => {
  cy.verifyNavigation(path);
});
