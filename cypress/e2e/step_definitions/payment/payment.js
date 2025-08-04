Given("I am on the checkout payment page", () => {
  cy.visit("/checkout/payment");
});

When("I check required payment fields", () => {
  cy.checkRequiredPaymentFields();
});

Then("I should see required field errors for all payment fields", () => {
  // cy.checkRequiredPaymentFields() already asserts each error
});

When("I submit a valid payment with:", (dataTable) => {
  const payment = dataTable.rowsHash(); // Transforms in a plain JS object
  cy.submitValidPayment({
    cardHolder: payment.cardHolder,
    cardNumber: payment.cardNumber,
    expiryDate: payment.expiryDate,
    cvv: payment.cvv,
  });
});

When("I click continue", () => {
  cy.clickContinue();
});

Then("I should be on the checkout success page", () => {
  cy.url().should("include", "/checkout/success");
});

// Card Holder Name
When("I check invalid card holder names:", (dataTable) => {
  const names = dataTable.raw().flat();
  cy.checkInvalidCardHolderNames(names);
});

Then("I should see card holder name errors for all invalid names", () => {
  // cy.checkInvalidCardHolderNames() already asserts each error
});

When("I fill in the card holder name with {string}", (name) => {
  cy.fillCardHolderName(name);
});

Then("I should see no error for the card holder field", () => {
  cy.checkFieldNoError(1);
});

// Card Number
When("I check invalid card numbers:", (dataTable) => {
  const nums = dataTable.raw().flat();
  cy.checkInvalidCardNumbers(nums);
});

Then("I should see card number errors for all invalid numbers", () => {
  // cy.checkInvalidCardNumbers() already asserts each error
});

When("I fill in the card number with {string}", (number) => {
  cy.fillCardNumber(number);
});

Then("I should see no error for the card number field", () => {
  cy.checkFieldNoError(2);
});

// Expiry Date
When("I check invalid expiry dates:", (dataTable) => {
  const dates = dataTable.raw().flat();
  cy.checkInvalidExpiryDates(dates);
});

Then("I should see an error {string} for the expiry date field", (message) => {
  cy.checkFieldError(3, message);
});

When("I fill in the expiry date with {string}", (date) => {
  cy.fillExpiryDate(date);
});

Then("I should see no error for the expiry date field", () => {
  cy.checkFieldNoError(3);
});

// CVV
When("I check invalid CVVs:", (dataTable) => {
  const codes = dataTable.raw().flat();
  cy.checkInvalidCVVs(codes);
});

Then("I should see CVV errors for all invalid CVVs", () => {
  // cy.checkInvalidCVVs() already asserts each error
});

When("I fill in the CVV with {string}", (cvv) => {
  cy.fillCVV(cvv);
});

Then("I should see no error for the CVV field", () => {
  cy.checkFieldNoError(4);
});
