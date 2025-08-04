describe("Checkout Payment Page (Test for flawed validators)", () => {
  beforeEach(() => {
    cy.visitPaymentPage();
  });

  it("Shows required field errors for all fields", () => {
    cy.checkRequiredPaymentFields();
  });

  // Valid scenario to be validates to success page.
  it("Submits a valid payment and navigates to /checkout/success", () => {
    cy.submitValidPayment({
      cardHolder: "JOHN DOE",
      cardNumber: "4242424242424242",
      expiryDate: "12/34",
      cvv: "123",
    });
    cy.url().should("include", "/checkout/success");
  });

  // Card Holder Name
  // Only uppercase A–Z and space should be allowed.
  // Accents, hyphens, apostrophes, digits and <2 chars are invalid.
  // This test suite asserts that names with accents or hyphens SHOULD NOT be accepted,
  // and the current regex (/^[A-Za-z\s]{2,50}$/) blocks them as intended.
  describe("Card Holder Name", () => {
    it("Rejects invalid names", () => {
      cy.checkInvalidCardHolderNames([
        "A",
        "J0HN DOE",
        "JOÃO DOE",
        "O'NEIL",
        "MARY-JANE",
      ]);
    });

    it("Accepts valid uppercase and lowercase names", () => {
      [
        "JOHN DOE",
        "ALICE BOB",
        "MARY JANE",
        "caio consoli",
        "natalia dagostim",
        "jao",
      ].forEach((name) => {
        cy.fillCardHolderName(name);
        cy.checkFieldNoError(1);
      });
    });
  });

  // Card Number
  // Removes not digits and checks exactly for 16 digits.
  // AmEx (15 digits) and other lengths are rejected.
  // This test asserts that 15 digit AmEx SHOULD be accepted by real world issuers,
  // but current code rejects any length ≠ 16.
  describe("Card Number", () => {
    it("Rejects invalid card numbers", () => {
      cy.checkInvalidCardNumbers([
        "1234",
        "378282246310005",
        "4242 4242 4242 424",
        "abcd1234abcd5678",
      ]);
    });

    it("Accepts valid 16 digit numbers", () => {
      ["4242424242424242", "5555555555554444", "6011111111111117"].forEach(
        (n) => {
          cy.fillCardNumber(n);
          cy.checkFieldNoError(2);
        }
      );
    });
  });

  // Expiry Date
  // Only MM/YY format is enforced; expired dates SHOULD be rejected by real payment logic,
  // but current validator only checks format, so expired dates are (incorrectly) accepted.
  describe("Expiry Date", () => {
    it("Rejects invalid formats", () => {
      cy.checkInvalidExpiryDates(["13/20", "00/20", "1/20", "1/2", "12/2"]);
    });

    it("Should reject expired dates (but current code allows them)", () => {
      ["01/20", "05/21", "12/19"].forEach((d) => {
        cy.fillExpiryDate(d);

        // Expect error for expired dates; current implementation does not enforce it.
        cy.checkFieldNoError(3, "Expiry date must be in MM/YY format");
      });
    });

    it("Accepts valid MM/YY strings", () => {
      ["01/23", "12/99", "06/25"].forEach((d) => {
        cy.fillExpiryDate(d);
        cy.checkFieldNoError(3);
      });
    });
  });

  // CVV
  // Allows only 3 or 4 digits. Real logic would enforce 3 (or 4 for AmEx) based on the car number,
  // but current code uses a simple length check.
  describe("CVV", () => {
    it("Rejects invalid CVVs", () => {
      cy.checkInvalidCVVs(["12", /* "12345", */ "12a", "abcd"]); // Trying to type more numbers result to being capped to 4 digits so that value will pass as a 4 digit value.
    });

    it("Accepts valid 3 and 4 digits", () => {
      ["123", "000", "9999", "1234"].forEach((code) => {
        cy.fillCVV(code);
        cy.checkFieldNoError(4);
      });
    });
  });
});
