describe("Checkout Success Page", () => {
  beforeEach(() => {
    cy.visitSuccessPage();
  });

  it("Renders the thank you UI", () => {
    cy.verifySuccessContent();
  });

  it("Continue Shopping then home", () => {
    cy.clickContinueShopping();
    cy.shouldBeHomePage();
  });

  it("View Your Orders then profile", () => {
    cy.clickViewOrders();
    cy.shouldBeProfilePage();
  });
});
