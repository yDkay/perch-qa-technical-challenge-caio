import "cypress-cucumber-preprocessor/steps";
import "./commands";
import "./commands/home";
import "./commands/cart";
import "./commands/payment";
import "./commands/product";
import "./commands/profile";
import "./commands/success";
import "./commands/address";
import "./commands/orderHistory";

// Permitir que los tests continúen después de errores
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

//I will structure the logic while following this clearLocalStorage rule.
beforeEach(() => {
  cy.clearLocalStorage();
});
