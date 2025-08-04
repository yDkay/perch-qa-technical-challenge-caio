describe("Checkout Address Page", () => {
  beforeEach(() => {
    cy.visitAdressPage();
  });

  it("Shows required field errors for all fields", () => {
    cy.checkRequiredAddressFields();
  });

  // Happy path: all values that should pass and navigate
  // Accented or edge inputs will fail in other tests below
  // Since I am able to check the source code, I can verify what is missing, specially on the regex for the fields.
  it("Submits a valid address", () => {
    cy.fillValidAddress({
      firstName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (234) 567-8901",
      street: "123 Main St",
      city: "Springfield",
      state: "Illinois",
      zipCode: "62704",
      country: "United States",
    });
    cy.clickContinue();
    cy.url().should("include", "/checkout/payment");
  });

  // First Name tests
  // regex /^[A-Za-z\s]{2,30}$/ blocks accents and not latin letters
  describe("First Name (accented & edge cases)", () => {
    it("Rejects too short names", () => {
      cy.fillNameForm("A");
      cy.clickContinue();
      cy.checkFieldError(
        1,
        "Name must be 2-30 characters and contain only letters"
      );
    });

    it("Rejects names with symbols or accents", () => {
      ["J@ne", "Mary-Jane", "João", "Álvaro"].forEach((name) => {
        cy.fillNameForm(name);
        cy.clickContinue();
        cy.checkFieldError(
          1,
          "Name must be 2-30 characters and contain only letters"
        );
      });
    });

    it("Accepts plain ASCII names", () => {
      ["Alice", "Bob Smith", "Caio Consoli"].forEach((name) => {
        cy.fillNameForm(name);
        cy.clickContinue();
        cy.checkFieldNoError(1);
      });
    });
  });

  // Email tests
  // regex /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/ disallows +
  describe("Email (valid and invalid)", () => {
    it("Rejects bad emails", () => {
      ["test@", "user@domain", "user@.com", "user@domain.c"].forEach(
        (email) => {
          cy.fillEmailForm(email);
          cy.clickContinue();
          cy.checkFieldError(2, "Please enter a valid email address");
        }
      );
    });

    it("Rejects valid but edge case addresses", () => {
      ["user+alias@example.com", "first.last+test@mail.com"].forEach(
        (email) => {
          cy.fillEmailForm(email);
          cy.clickContinue();
          // plus sign in domains are valid but blocked here
          cy.checkFieldError(2, "Please enter a valid email address");
        }
      );
    });

    it("Accepts simple ASCII emails", () => {
      [
        "user@example.com",
        "first.last@mail.co.uk",
        "user_name@domain.org",
      ].forEach((email) => {
        cy.fillEmailForm(email);
        cy.clickContinue();
        cy.checkFieldNoError(2);
      });
    });
  });

  // Phone tests
  // removes non digits then /^\+?[0-9]{10,15}$/; plus(+) removed so range is 10–15 digits after cleanup
  describe("Phone (valid & invalid)", () => {
    it("Rejects too short/long numbers", () => {
      ["12345", "1234567890123456"].forEach((phone) => {
        cy.fillPhoneForm(phone);
        cy.clickContinue();
        cy.checkFieldError(3, "Phone number must be 10-15 digits");
      });
    });

    it("Rejects letters and symbols", () => {
      ["abcdEFGhij", "123-abc-4567"].forEach((phone) => {
        cy.fillPhoneForm(phone);
        cy.clickContinue();
        cy.checkFieldError(3, "Phone number must be 10-15 digits");
      });
    });

    it("Accepts 10 to 15 digit numbers with formatting", () => {
      [
        "0123456789",
        "+44 207 183 8750",
        "(123) 456-7890",
        "123456789012345",
      ].forEach((phone) => {
        cy.fillPhoneForm(phone);
        cy.clickContinue();
        cy.checkFieldNoError(3);
      });
    });
  });

  // Street tests
  // Street has no max length validation, so it allows an infinite amount of characters
  // only enforces length >=5.
  describe("Street (min length)", () => {
    it("Rejects too short street names", () => {
      cy.fillStreetForm("1234");
      cy.clickContinue();
      cy.checkFieldError(4, "Street address must be at least 5 characters");
    });

    it("Accepts any 5+ character string", () => {
      ["123 Main", "Rua São João", "あいしています"].forEach((street) => {
        cy.fillStreetForm(street);
        cy.clickContinue();
        cy.checkFieldNoError(4);
      });
    });
  });

  // City tests
  // City has no max length validation, so it allows an infinite amount of characters
  // /^[A-Za-z\s]+$/ blocks accents and letters beyond ASCII
  describe("City (accented & edge cases)", () => {
    it("Rejects too short and numeric cities", () => {
      ["A", "City123"].forEach((city) => {
        cy.fillCityForm(city);
        cy.clickContinue();
        cy.checkFieldError(5, "City must contain only letters and spaces");
      });
    });

    it("Rejects accented city names", () => {
      ["Caçapava", "München", "Zürich"].forEach((city) => {
        cy.fillCityForm(city);
        cy.clickContinue();
        cy.checkFieldError(5, "City must contain only letters and spaces");
      });
    });

    it("Accepts plain ASCII city names", () => {
      ["London", "New York"].forEach((city) => {
        cy.fillCityForm(city);
        cy.clickContinue();
        cy.checkFieldNoError(5);
      });
    });
  });

  // State tests
  // State has no max length validation, so it allows an infinite amount of characters
  // same ASCII only regex like City regex
  describe("State (accented & edge cases)", () => {
    it("Rejects too short and numeric states", () => {
      ["X", "CA123"].forEach((state) => {
        cy.fillStateForm(state);
        cy.clickContinue();
        cy.checkFieldError(6, "State must contain only letters and spaces");
      });
    });

    it("Rejects accented state names", () => {
      ["São Paulo", "Québec"].forEach((state) => {
        cy.fillStateForm(state);
        cy.clickContinue();
        cy.checkFieldError(6, "State must contain only letters and spaces");
      });
    });

    it("Accepts plain ASCII states", () => {
      ["California", "New South Wales"].forEach((state) => {
        cy.fillStateForm(state);
        cy.clickContinue();
        cy.checkFieldNoError(6);
      });
    });
  });

  // ZIP Code tests
  // /^\d{4,5}$/ only allows 4 or 5 digits and blocks most international formats
  describe("ZIP Code (international formats)", () => {
    it("Rejects non 4 or 5 digit formats", () => {
      ["EC1A 1BB", "100-0001", "110001", "01000-000", "SW1A1AA"].forEach(
        (zip) => {
          cy.fillZipForm(zip);
          cy.clickContinue();
          cy.checkFieldError(7, "ZIP code must be 4 or 5 digits");
        }
      );
    });

    it("Accepts only 4 or 5 digits", () => {
      ["1234", "12345"].forEach((zip) => {
        cy.fillZipForm(zip);
        cy.clickContinue();
        cy.checkFieldNoError(7);
      });
    });
  });

  // Country tests
  // Country has no max length validation, so it allows an infinite amount of characters
  // uses the same ASCII only regex and blocks valid accented country names
  describe("Country (accented & edge cases)", () => {
    it("Rejects numeric and accented country names", () => {
      ["1", "U$A", "Canadá", "México"].forEach((country) => {
        cy.fillCountryForm(country);
        cy.clickContinue();
        cy.checkFieldError(8, "Country must contain only letters and spaces");
      });
    });

    it("Accepts plain ASCII country names", () => {
      ["Brazil", "United Kingdom"].forEach((country) => {
        cy.fillCountryForm(country);
        cy.clickContinue();
        cy.checkFieldNoError(8);
      });
    });
  });
});
