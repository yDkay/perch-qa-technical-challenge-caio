Cypress.Commands.add("fillNameForm", (value) => {
  cy.get('[data-testid="firstname-input"]').clear().type(value);
});
Cypress.Commands.add("fillEmailForm", (value) => {
  cy.get('[data-testid="email-input"]').clear().type(value);
});
Cypress.Commands.add("fillPhoneForm", (value) => {
  cy.get('[data-testid="phone-input"]').clear().type(value);
});
Cypress.Commands.add("fillStreetForm", (value) => {
  cy.get('[data-testid="street-input"]').clear().type(value);
});
Cypress.Commands.add("fillCityForm", (value) => {
  cy.get('[data-testid="city-input"]').clear().type(value);
});
Cypress.Commands.add("fillStateForm", (value) => {
  cy.get('[data-testid="state-input"]').clear().type(value);
});
Cypress.Commands.add("fillZipForm", (value) => {
  cy.get('[data-testid="zipcode-input"]').clear().type(value);
});
Cypress.Commands.add("fillCountryForm", (value) => {
  cy.get('[data-testid="country-input"]').clear().type(value);
});

Cypress.Commands.add("checkFieldError", (index, message) => {
  cy.get(`:nth-child(${index}) > .error-message`)
    .should("be.visible")
    .and("contain", message);
});

Cypress.Commands.add("checkRequiredAddressFields", () => {
  const fieldSelectors = [
    '[data-testid="firstname-input"]',
    '[data-testid="email-input"]',
    '[data-testid="phone-input"]',
    '[data-testid="street-input"]',
    '[data-testid="city-input"]',
    '[data-testid="state-input"]',
    '[data-testid="zipcode-input"]',
    '[data-testid="country-input"]',
  ];

  fieldSelectors.forEach((selector, index) => {
    cy.get(selector).click().blur();
    // index + 1 corresponds to the field's error position
    cy.checkFieldError(index + 1, "This field is required");
  });
});

Cypress.Commands.add("checkFieldNoError", (index) => {
  cy.get(`:nth-child(${index}) > .error-message`).should("not.exist");
});

Cypress.Commands.add("checkInvalidEmails", (emails) => {
  emails.forEach((email) => {
    cy.fillEmailForm(email);
    cy.clickContinue();
    cy.checkFieldError(2, "Please enter a valid email address");
  });
});
Cypress.Commands.add("checkInvalidZipCodes", (codes) => {
  codes.forEach((code) => {
    cy.fillZipForm(code);
    cy.clickContinue();
    cy.checkFieldError(7, "ZIP code must be 4 or 5 digits");
  });
});

Cypress.Commands.add("submitValidAddress", (data) => {
  cy.fillValidAddress(data);
  cy.clickContinue();
  cy.url().should("include", "/checkout/payment");
});
