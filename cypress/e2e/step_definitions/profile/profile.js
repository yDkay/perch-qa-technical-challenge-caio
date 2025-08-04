Given("I am on the profile page", () => {
  cy.visitProfilePage();
});

When("I click back to home", () => {
  cy.clickBackToHome();
});
Then("I should be on the home page", () => {
  cy.location("pathname").should("eq", "/");
});

Then("I should see the profile header and card UI", () => {
  cy.verifyProfileHeader();
  cy.verifyProfileCardUI();
});

When("I edit and save my profile with:", (table) => {
  const { name, email } = table.rowsHash();
  cy.editProfileAndSave(name, email);
});
Then("my profile should show:", (table) => {
  const { name, email } = table.rowsHash();
  cy.get(".profile-card").within(() => {
    cy.contains(name);
    cy.contains(email);
  });
});

When("I edit and cancel my profile with:", (table) => {
  const { name, email } = table.rowsHash();
  cy.editProfileAndCancel(name, email);
});
Then("my profile should remain unchanged", () => {
  // Assertion done inside editProfileAndCancel
});

When("I enter {string} into the name field and attempt to save", (name) => {
  cy.validateNameField(name);
});
Then("I should see a name validation error", () => {
  // Handled by validateNameField
});

When("I enter {string} into the email field and attempt to save", (email) => {
  cy.assertInvalidEmail(email);
});
Then("I should see an email validation error", () => {
  // Handled by assertInvalidEmail
});

When("I enter {string} into the email field and save", (email) => {
  cy.assertValidEmail(email);
});
Then("I should save successfully without email errors", () => {
  // Handled by assertValidEmail
});

When("I verify order history with no orders", () => {
  cy.verifyOrderHistoryNoOrders();
});
Then("I should be on the home page", () => {
  cy.location("pathname").should("eq", "/");
});
