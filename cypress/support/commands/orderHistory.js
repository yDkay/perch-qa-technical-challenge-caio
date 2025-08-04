Cypress.Commands.add("addProductToOrderHistory", (address, payment) => {
  // Go to card and proceed to checkout
  cy.get('[data-testid="nav-to-cart"]').click();
  cy.get('[data-testid="proceed-to-checkout"]').click();
  // Fill address
  cy.fillValidAddress(address);
  cy.clickContinue();
  cy.url().should("include", "/checkout/payment");
  // Payment
  cy.submitValidPayment({
    cardHolder: payment.cardholderName,
    cardNumber: payment.cardNumber,
    expiryDate: payment.expiry,
    cvv: payment.cvv,
  });
  cy.url().should("include", "/checkout/success");
  return cy
    .contains(/^Order Number:\s*#\d+$/)
    .invoke("text")
    .then((orderText) => {
      const num = orderText.replace(/^Order Number:\s*#/, "").trim();
      // Alias for later if you want cy.get("@savedOrderNumber")
      cy.wrap(num).as("savedOrderNumber");
      cy.clickViewOrders();
      cy.url().should("include", "/profile");
      return cy.wrap(num);
    });
});

Cypress.Commands.add("addProducts", (id, quantity) => {
  cy.get(`[data-testid="view-product-${id}"]`).click();
  cy.get('[data-testid="quantity-selector"]').select(quantity);
  cy.get('[data-testid="add-to-cart"]').click();
  cy.get('[data-testid="continue-shopping"]').click();
});

Cypress.Commands.add("assertOrderTotalIgnoresQuantity", () => {
  cy.get("@savedOrderNumber").then((orderId) => {
    cy.getOrderItems()
      .find(`[data-testid^="order-${orderId}-product-"]`)
      .then(($items) => {
        const expected = [...$items]
          .reduce((sum, item) => {
            const $el = Cypress.$(item);
            const price = parseFloat(
              $el
                .find(".product-price")
                .text()
                .replace(/[^0-9.-]+/g, "")
            );
            const qty = parseInt(
              $el
                .find(".product-quantity")
                .text()
                .replace(/[^0-9]+/g, ""),
              10
            );
            return sum + price * qty;
          }, 0)
          .toFixed(2);
        cy.getOrderTotalValue()
          .invoke("text")
          .then((text) => {
            const shown = parseFloat(text.replace(/[^0-9.-]+/g, ""));
            // Assert they’re not equal (known bug)
            expect(shown).to.not.deep.equal(
              parseFloat(expected),
              `Known bug: shown total (${shown}) should not equal expected (${expected}) when qty > 1`
            );
          });
      });
  });
});

Cypress.Commands.add("validateOrderTotal", (orderId) => {
  cy.getOrderItems()
    .find(`[data-testid^="order-${orderId}-product-"]`)
    .then(($items) => {
      const lineTotals = [...$items].map((item) => {
        const $item = Cypress.$(item);
        // Extract price as number
        const priceText = $item.find(".product-price").text();
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        // Extract quantity as integer
        const qtyText = $item.find(".product-quantity").text();
        const qty = parseInt(qtyText.replace(/[^0-9]+/g, ""), 10);
        return price * qty;
      });

      const expectedTotal = lineTotals
        .reduce((sum, line) => sum + line, 0)
        .toFixed(2);
      // Grab displayed total and compare
      cy.getOrderTotalValue()
        .invoke("text")
        .then((totalText) => {
          const actual = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));
          expect(actual).to.equal(
            parseFloat(expectedTotal),
            `Expected sum of line items (${expectedTotal}) to equal total displayed`
          );
        });
    });
});

// Order card and header
Cypress.Commands.add("getOrdersCard", () => cy.get(".orders-card"));
Cypress.Commands.add("getOrderHeader", () =>
  cy.getOrdersCard().find(".order-header")
);

// Order number
Cypress.Commands.add("getOrderNumberLabel", () =>
  cy.getOrderHeader().find(".order-number > .label")
);
Cypress.Commands.add("getOrderNumberValue", () =>
  cy
    .get(".orders-card .order-header .order-number > .value")
    .should("be.visible")
    .invoke("text")
    .then((txt) => txt.replace(/^#/, "").trim())
);

// Order date
Cypress.Commands.add("getOrderDateLabel", () =>
  cy.getOrderHeader().find(".order-date > .label")
);
Cypress.Commands.add("getOrderDateValue", (orderId) =>
  cy.getOrderHeader().find(`[data-testid="order-date-${orderId}"]`)
);

// Order total
Cypress.Commands.add("getOrderTotalLabel", () =>
  cy.getOrderHeader().find(".order-total > .label")
);
Cypress.Commands.add("getOrderTotalValue", () =>
  cy.getOrderHeader().find(".order-total > .value")
);

// Order items and products
Cypress.Commands.add("getOrderItems", () => cy.get(".order-items"));

Cypress.Commands.add("getOrderProduct", (orderId, productId) =>
  cy
    .getOrderItems()
    .find(`[data-testid="order-${orderId}-product-${productId}"]`)
);
Cypress.Commands.add("getProductThumbnail", (orderId, productId) =>
  cy.getOrderProduct(orderId, productId).find(".product-thumbnail")
);
Cypress.Commands.add("getProductDetails", (orderId, productId) =>
  cy.getOrderProduct(orderId, productId).find(".product-details")
);
Cypress.Commands.add("getProductName", (orderId, productId) =>
  cy.getProductDetails(orderId, productId).find(".product-name")
);
Cypress.Commands.add("getProductPrice", (orderId, productId) =>
  cy.getProductDetails(orderId, productId).find(".product-price")
);
Cypress.Commands.add("getProductQuantity", (orderId, productId) =>
  cy.getProductDetails(orderId, productId).find(".product-quantity")
);
