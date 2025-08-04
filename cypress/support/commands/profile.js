Cypress.Commands.add("clickBackToHome", () => {
  cy.get('[data-testid="back-to-home"]').should("be.visible").click();
});
Cypress.Commands.add("verifyProfileHeader", () => {
  cy.get(".profile-header")
    .should("be.visible")
    .and("contain.text", "Your Profile");
});

Cypress.Commands.add("verifyProfileCardUI", () => {
  cy.get(".profile-card").within(() => {
    cy.contains("Personal Information");
    cy.contains("Name");
    cy.contains("Email");
    cy.get('[data-testid="edit-profile"]').should("be.visible");
  });
});

Cypress.Commands.add("openProfileEditor", () => {
  cy.get('[data-testid="edit-profile"]').click();
  cy.get('[data-testid="save-profile"]').should("be.visible");
  cy.get('[data-testid="cancel-edit"]').should("be.visible");
});

Cypress.Commands.add("grabCurrentProfileValues", () => {
  return cy.get(".profile-card").then(($card) => {
    const name = $card.find("dd").eq(0).text().trim();
    const email = $card.find("dd").eq(1).text().trim();
    return { name, email };
  });
});

Cypress.Commands.add("validateNameField", (value, shouldPass) => {
  // 1) open editor and type
  cy.openProfileEditor();
  cy.get('input[name="name"]').clear().type(value);

  // 2) check Save button state
  if (shouldPass) {
    cy.get('[data-testid="save-profile"]').should("not.be.disabled");
  } else {
    cy.get('[data-testid="save-profile"]').should("be.disabled");
  }

  // 3) check error message
  const errSel = ":nth-child(1) > div > .error-message";
  if (shouldPass) {
    cy.get(errSel).should("not.exist");
    // 4a) click Save to close editor
    cy.get('[data-testid="save-profile"]').click();
  } else {
    cy.get(errSel)
      .should("be.visible")
      .and(
        "contain",
        "Name must be at least 3 characters and contain only letters"
      );
    // 4b) cancel out so we can re-open next time
    cy.get('[data-testid="cancel-edit"]').click();
  }
});

Cypress.Commands.add("editProfileAndSave", (newName, newEmail) => {
  cy.grabCurrentProfileValues().as("orig");
  cy.openProfileEditor();
  cy.get('input[name="name"]').clear().type(newName);
  cy.get('input[name="email"]').clear().type(newEmail);
  cy.get('[data-testid="save-profile"]').click();
  cy.get("@orig").then((orig) => {
    expect(newName).not.to.eq(orig.name);
    expect(newEmail).not.to.eq(orig.email);
  });
  cy.get(".profile-card").within(() => {
    cy.contains(newName);
    cy.contains(newEmail);
  });
});

Cypress.Commands.add("editProfileAndCancel", (tempName, tempEmail) => {
  cy.grabCurrentProfileValues().then((orig) => {
    cy.openProfileEditor();
    cy.get('input[name="name"]').clear().type(tempName);
    cy.get('input[name="email"]').clear().type(tempEmail);
    cy.get('[data-testid="cancel-edit"]').click();

    cy.grabCurrentProfileValues().then((after) => {
      expect(after.name).to.equal(orig.name);
      expect(after.email).to.equal(orig.email);
      // Note: if orig.name or orig.email here is empty or looks wrong,
      // it means the validation regex is too strict and is blocking
      // perfectly valid names (like José) or chopping off parts of the email.
    });
  });
});

Cypress.Commands.add("assertInvalidEmail", (email) => {
  cy.openProfileEditor();
  cy.get('input[name="email"]').clear().type(email);
  cy.get('[data-testid="save-profile"]').should("be.disabled");
  cy.get(":nth-child(2) > div > .error-message")
    .should("be.visible")
    .and("contain", "Please enter a valid email address");
  cy.get('[data-testid="cancel-edit"]').click();
});

Cypress.Commands.add("assertValidEmail", (email) => {
  cy.openProfileEditor();
  cy.get('input[name="email"]').clear().type(email);
  cy.get('[data-testid="save-profile"]').should("not.be.disabled").click();
  cy.get(":nth-child(2) > div > .error-message").should("not.exist");
});

Cypress.Commands.add("verifyOrderHistoryNoOrders", () => {
  cy.get(".orders-card").within(() => {
    cy.contains("Order History");
    cy.get('[data-testid="no-orders"]')
      .should("be.visible")
      .and("contain.text", "You haven't placed any orders yet.");
    cy.get('[data-testid="start-shopping"]').should("be.visible").click();
  });
  cy.location("pathname").should("eq", "/");
});
