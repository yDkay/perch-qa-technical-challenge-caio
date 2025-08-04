Given("I am on the checkout address page", () => {
  cy.visit("/checkout/address");
});

When("I check required address fields", () => {
  cy.checkRequiredAddressFields();
});

Then("I should see required field errors for all address fields", () => {
  // Custom command already asserts all required‐field errors
});

When("I fill in the address with:", (dataTable) => {
  const addr = dataTable.rowsHash();
  cy.fillValidAddress({
    firstName: addr.firstName,
    email: addr.email,
    phone: addr.phone,
    street: addr.street,
    city: addr.city,
    state: addr.state,
    zipCode: addr.zipCode,
    country: addr.country,
  });
});

When("I click continue", () => {
  cy.clickContinue();
});

Then("I should be on the checkout payment page", () => {
  cy.url().should("include", "/checkout/payment");
});

// First Name
When("I fill in the first name with {string}", (name) => {
  cy.fillNameForm(name);
});

Then("I should see an error {string} for the first name field", (err) => {
  cy.checkFieldError(1, err);
});

Then("I should see no error for the first name field", () => {
  cy.checkFieldNoError(1);
});

// Email
When("I fill in the email with {string}", (email) => {
  cy.fillEmailForm(email);
});

Then("I should see an error {string} for the email field", (err) => {
  cy.checkFieldError(2, err);
});

Then("I should see no error for the email field", () => {
  cy.checkFieldNoError(2);
});

// Phone
When("I fill in the phone number with {string}", (phone) => {
  cy.fillPhoneForm(phone);
});

Then("I should see an error {string} for the phone field", (err) => {
  cy.checkFieldError(3, err);
});

Then("I should see no error for the phone field", () => {
  cy.checkFieldNoError(3);
});

// Street
When("I fill in the street address with {string}", (street) => {
  cy.fillStreetForm(street);
});

Then("I should see an error {string} for the street field", (err) => {
  cy.checkFieldError(4, err);
});

Then("I should see no error for the street field", () => {
  cy.checkFieldNoError(4);
});

// City
When("I fill in the city with {string}", (city) => {
  cy.fillCityForm(city);
});

Then("I should see an error {string} for the city field", (err) => {
  cy.checkFieldError(5, err);
});

Then("I should see no error for the city field", () => {
  cy.checkFieldNoError(5);
});

// State
When("I fill in the state with {string}", (state) => {
  cy.fillStateForm(state);
});

Then("I should see an error {string} for the state field", (err) => {
  cy.checkFieldError(6, err);
});

Then("I should see no error for the state field", () => {
  cy.checkFieldNoError(6);
});

// ZIP Code
When("I fill in the ZIP code with {string}", (zip) => {
  cy.fillZipForm(zip);
});

Then("I should see an error {string} for the ZIP code field", (err) => {
  cy.checkFieldError(7, err);
});

Then("I should see no error for the ZIP code field", () => {
  cy.checkFieldNoError(7);
});

// Country
When("I fill in the country with {string}", (country) => {
  cy.fillCountryForm(country);
});

Then("I should see an error {string} for the country field", (err) => {
  cy.checkFieldError(8, err);
});

Then("I should see no error for the country field", () => {
  cy.checkFieldNoError(8);
});
