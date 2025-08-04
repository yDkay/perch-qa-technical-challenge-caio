describe("Order History Flow", () => {
  const address = {
    firstName: "Caio Consoli",
    email: "caio.consoli@example.com",
    phone: "1234567890",
    street: "Rua Do Elmo",
    city: "Cascavel",
    state: "Parana",
    zipCode: "10001",
    country: "Brazil",
  };
  const payment = {
    cardholderName: "Rich Caio",
    cardNumber: "1234567890123456",
    expiry: "08/25",
    cvv: "616",
  };

  beforeEach(() => {
    cy.visitHomePage();
  });

  it("Verifies the order shows up correctly when quantity = 1", () => {
    cy.addProducts(1, "1");
    cy.addProductToOrderHistory(address, payment).then((orderNumber) => {
      //Visibility Check
      cy.getOrdersCard().should("be.visible");
      cy.getOrderHeader().should("be.visible");

      cy.getOrderNumberLabel().should("be.visible");
      cy.getOrderNumberValue().should("equal", orderNumber);

      cy.getOrderDateLabel().should("be.visible");
      cy.getOrderDateValue(orderNumber).should("be.visible");

      cy.getOrderTotalLabel().should("be.visible");
      cy.getOrderTotalValue().should("be.visible");

      cy.getOrderItems().should("be.visible");
      cy.getOrderProduct(orderNumber, 1).should("be.visible");

      cy.getProductThumbnail(orderNumber, 1).should("be.visible");
      cy.getProductDetails(orderNumber, 1).should("be.visible");

      cy.getProductName(orderNumber, 1).should("be.visible");
      cy.getProductPrice(orderNumber, 1).should("be.visible");
      cy.getProductQuantity(orderNumber, 1).should("be.visible");

      //Functional validation
      cy.validateOrderTotal(orderNumber);
    });
  });

  it("Documents the bug: total ignores quantity when qty > 1", () => {
    cy.addProducts(1, "3");
    cy.addProductToOrderHistory(address, payment);
    cy.assertOrderTotalIgnoresQuantity();
  });

  it("Multiple Products with known bug", () => {
    cy.addProducts(1, "2");
    cy.addProducts(2, "1");
    cy.addProducts(3, "3");
    cy.addProductToOrderHistory(address, payment);
    cy.assertOrderTotalIgnoresQuantity();
  });
});
