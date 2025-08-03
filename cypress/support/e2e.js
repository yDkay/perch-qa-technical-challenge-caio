import "./commands";
import "./commands/home";
import "./commands/cart";
import "./commands/payment";
import "./commands/product";
import "./commands/profile";
import "./commands/success";
import "./commands/address";

// Permitir que los tests continúen después de errores
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

beforeEach(() => {
  cy.clearLocalStorage();
});
