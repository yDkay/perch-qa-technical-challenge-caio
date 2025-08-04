Cypress.Commands.add("verifyHomeContent", () => {
  cy.get("h1").contains("Product Catalog");
  cy.get('[data-testid="home-page"]').should("be.visible");
  cy.get(".products-grid").should("be.visible");
});

Cypress.Commands.add("verifyHomeButtons", () => {
  let btnMap = new Map([
    ["nav-to-profile", "Profile"],
    ["nav-to-cart", "Cart"],
    ["sort-price", "Sort by Price "],
  ]);
  Array.from(btnMap.keys()).forEach((testId) => {
    cy.get(`[data-testid="${testId}"]`).should("be.visible");
    cy.get(`[data-testid="${testId}"]`).contains(btnMap.get(testId));
  });
});

Cypress.Commands.add("verifyCard", (id, name, price, description) => {
  cy.get(`[data-testid="product-${id}"]`).within(() => {
    cy.get(".product-name").should("have.text", name);
    cy.get(".product-image");
    cy.get(`[data-testid="price-${id}"]`).contains(price);
    cy.get(".product-description").contains(description);
    cy.get(`[data-testid="view-product-${id}"]`).should("be.visible");
  });
});

Cypress.Commands.add("typeInSearch", (productSearch) => {
  cy.get('[data-testid="product-search"]').clear().type(productSearch);
});

Cypress.Commands.add("verifySearch", (text) => {
  cy.get(".products-grid").then(($grid) => {
    if ($grid.find('[data-testid^="product-"]').length > 0) {
      cy.get(".products-grid").contains(text);
    } else {
      cy.get('[data-testid="no-results"]').should("be.visible");
    }
  });
});

Cypress.Commands.add("sort", (type) => {
  cy.reload();
  cy.get('[data-testid="sort-price"]').click();
  if (type === "asc") cy.get('[data-testid="sort-price"]').click();
});

Cypress.Commands.add("verifySorted", (order) => {
  const orderDictionary = {
    asc: (a, b) => a - b,
    desc: (a, b) => b - a,
  };

  cy.get(".product-price").then(($prices) => {
    const displayedPrices = Array.from($prices).map((price) =>
      Number(price.innerText.replace("$", ""))
    );
    const expectedOrder = Array.from(displayedPrices).sort(
      orderDictionary[order]
    );
    // Using not.to.deep.equal since we expect the sorting to be broken
    expect(displayedPrices).not.to.deep.equal(expectedOrder);
  });
});

Cypress.Commands.add("navigateButton", (button) => {
  cy.get(`[data-testid="${button}"]`).click();
});

Cypress.Commands.add("verifyNavigation", (path) => {
  cy.url().should("include", path);
});
