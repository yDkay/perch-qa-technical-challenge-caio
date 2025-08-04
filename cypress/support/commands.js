Cypress.Commands.add("visitHomePage", () => {
  cy.visit("/");
  cy.url().should("eq", "http://localhost:3000/");
});

Cypress.Commands.add("visitProductPage", (product) => {
  cy.visit(`/product/${product}`);
});

Cypress.Commands.add("visitCartPage", () => {
  cy.visit("/cart");
});

Cypress.Commands.add("visitSuccessPage", () => {
  cy.visit("/checkout/success");
});

Cypress.Commands.add("visitAdressPage", () => {
  cy.visit("/checkout/address");
});

Cypress.Commands.add("visitPaymentPage", () => {
  cy.visit("/checkout/payment");
});

Cypress.Commands.add("visitProfilePage", () => {
  cy.visit("/profile");
});

Cypress.Commands.add("fillValidAddress", (data) => {
  cy.fillNameForm(data.firstName);
  cy.fillEmailForm(data.email);
  cy.fillPhoneForm(data.phone);
  cy.fillStreetForm(data.street);
  cy.fillCityForm(data.city);
  cy.fillStateForm(data.state);
  cy.fillZipForm(data.zipCode);
  cy.fillCountryForm(data.country);
});

Cypress.Commands.add("clickContinue", () => {
  cy.get('[data-testid="continue-to-payment"]').click();
});

Cypress.Commands.add("submitValidPayment", (data) => {
  cy.fillCardHolderName(data.cardHolder);
  cy.fillCardNumber(data.cardNumber);
  cy.fillExpiryDate(data.expiryDate);
  cy.fillCVV(data.cvv);
  cy.clickCompletePayment();
});

Cypress.Commands.add("clickContinueShopping", () => {
  cy.get('[data-testid="continue-shopping"]').should("be.visible").click();
});
Cypress.Commands.add("clickViewOrders", () => {
  cy.get('[data-testid="view-orders"]').should("be.visible").click();
});
