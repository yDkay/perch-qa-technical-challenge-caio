Cypress.Commands.add("fillCardHolderName", (value) => {
  cy.get('[data-testid="cardholder-input"]').clear().type(value);
});

Cypress.Commands.add("fillCardNumber", (value) => {
  cy.get('[data-testid="card-number-input"]').clear().type(value);
});

Cypress.Commands.add("fillExpiryDate", (value) => {
  cy.get('[data-testid="expiry-input"]').clear().type(value);
});

Cypress.Commands.add("fillCVV", (value) => {
  cy.get('[data-testid="cvv-input"]').clear().type(value);
});

Cypress.Commands.add("clickCompletePayment", () => {
  cy.get('[data-testid="complete-payment"]').click();
});

Cypress.Commands.add("checkRequiredOnBlur", (inputSelector, errorSelector) => {
  cy.get(inputSelector).click().blur();
  cy.get(errorSelector)
    .should("be.visible")
    .and("contain", "This field is required");
});

Cypress.Commands.add("checkFieldSingleError", (message) => {
  cy.get(".error-message").should("be.visible").and("contain", message);
});

Cypress.Commands.add("checkFieldError", (index, message) => {
  cy.get(`:nth-child(${index}) > .error-message`)
    .should("be.visible")
    .and("contain", message);
});

Cypress.Commands.add("checkFieldErrorForm", (index, message) => {
  cy.get(`:nth-child(${index}) > .form-group > .error-message`)
    .should("be.visible")
    .and("contain", message);
});

Cypress.Commands.add("checkRequiredPaymentFields", () => {
  const fieldSelectors = [
    '[data-testid="cardholder-input"]',
    '[data-testid="card-number-input"]',
    '[data-testid="expiry-input"]',
    '[data-testid="cvv-input"]',
  ];

  // 1) click and blur every input
  fieldSelectors.forEach((selector) => {
    cy.get(selector).click().blur();
  });

  // 2) then verify each error in order
  fieldSelectors.forEach((_, index) => {
    cy.checkFieldErrorForm(index + 1, "This field is required");
  });
});

Cypress.Commands.add("checkFieldNoError", (index) => {
  cy.get(`:nth-child(${index}) > .error-message`).should("not.exist");
});

Cypress.Commands.add("checkInvalidCardHolderNames", (names) => {
  names.forEach((name) => {
    cy.fillCardHolderName(name);
    cy.get('[data-testid="cardholder-input"]').blur();
    cy.checkFieldError(
      1,
      "Card holder name must be 2-50 characters and contain only letters"
    );
  });
});

Cypress.Commands.add("checkInvalidCardNumbers", (nums) => {
  nums.forEach((n) => {
    cy.fillCardNumber(n);
    cy.get('[data-testid="card-number-input"]').blur();
    cy.checkFieldError(1, "Card number must be 16 digits");
  });
});

Cypress.Commands.add("checkInvalidExpiryDates", (dates) => {
  dates.forEach((d) => {
    cy.fillExpiryDate(d);
    cy.get('[data-testid="expiry-input"]').blur();
    cy.checkFieldError(1, "Expiry date must be in MM/YY format");
  });
});

Cypress.Commands.add("checkInvalidCVVs", (codes) => {
  codes.forEach((code) => {
    cy.fillCVV(code);
    cy.get('[data-testid="cvv-input"]').blur();
    cy.checkFieldError(1, "CVV must be 3 or 4 digits");
  });
});
