describe("Profile Page Tests", () => {
  beforeEach(() => {
    cy.visitProfilePage();
  });

  it("Back home button works", () => {
    cy.clickBackToHome();
    cy.location("pathname").should("eq", "/");
  });

  it("Header and card UI display correctly", () => {
    cy.verifyProfileHeader();
    cy.verifyProfileCardUI();
  });

  it("Edit and Save while preserving new values", () => {
    cy.editProfileAndSave("Caio Consoli", "caio.consoli@example.co");
  });

  it("Edit and Cancel, it should revert to recent updated value", () => {
    cy.editProfileAndCancel("Temp Name", "temp.email@example.com");
  });

  it("Name field validation flags both real-world names and invalid ones", () => {
    const invalidNames = ["A", "J@ne"];
    invalidNames.forEach((name) => {
      cy.validateNameField(name, false);
    });
    // These should be accepted globally, but current code blocks them:
    const blockedButValidNames = [
      "Mary-Jane", // hyphens are common in names
      "O'Neil", // apostrophes are valid
      "José Álvarez", // accents
      "Zoë Smith",
      "François Dupont",
      "Müller",
      "Óscar Núñez",
      "Ñandú",
    ];
    blockedButValidNames.forEach((name) => {
      cy.validateNameField(name, false);
      //Regex /^[A-Za-z\s]+$/ disallows hyphens, apostrophes, and accented letters
    });
  });

  it("Checks email validation including flawed acceptance of bad domains", () => {
    // truly invalid formats — code correctly blocks these:
    const invalidEmails = [
      "plainaddress",
      "@no-local.com",
      "user@.com",
      "user@domain",
    ];
    invalidEmails.forEach((e) => cy.assertInvalidEmail(e));

    // Valid, should be accepted:
    const validEmails = [
      "user@example.com",
      "first.last@mail.co.uk",
      "user_name@domain.org",
      "user+alias@example.co",
      "x@x.io",
    ];
    validEmails.forEach((e) => cy.assertValidEmail(e));

    // Flawed acceptance: this is NOT valid emails,
    // but the regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` lets it through:
    const badButAccepted = [
      "user@domain-.com",
      "user@domain..com",
      "user@domain.c",
    ];
    badButAccepted.forEach((e) => {
      cy.assertValidEmail(e);
      //Regex allows some bad emails to pass
      //which violates common email rules.
    });
  });

  it("Order History “no orders” and Start Shopping button", () => {
    cy.verifyOrderHistoryNoOrders();
    // Redirects properly to home when no orders present
  });
});
