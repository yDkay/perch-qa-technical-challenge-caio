Cypress.Commands.add("verifySuccessContent", () => {
  cy.get(".success-content").within(() => {
    cy.contains("Thank You for Your Purchase!");
    cy.contains(/^Order Number:\s*#\d+$/);
    cy.contains(
      "We've received your order and will begin processing it right away. You'll receive a confirmation email shortly."
    );
  });
});

Cypress.Commands.add("shouldBeHomePage", () => {
  cy.location("pathname").should("eq", "/");
});
Cypress.Commands.add("shouldBeProfilePage", () => {
  cy.location("pathname").should("eq", "/profile");
});
