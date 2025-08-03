describe("Homepage Tests", () => {
  beforeEach(() => {
    cy.visitHomePage();
  });

  it.only("Should render all main UI elements", () => {
    cy.verifyHomeContent();
    cy.verifyHomeButtons();
  });

  it("Should render all product cards correctly", () => {
    const products = [
      {
        index: 1,
        title: "Classic White Sneakers",
        price: "$79.99",
        description: "Comfortable and stylish white sneakers for everyday wear",
      },
      {
        index: 2,
        title: "Premium Leather Watch",
        price: "$149.99",
        description: "Elegant leather watch with premium craftsmanship",
      },
      {
        index: 3,
        title: "Wireless Headphones",
        price: "$199.99",
        description: "High-quality wireless headphones with noise cancellation",
      },
    ];

    products.forEach((product) => {
      cy.verifyCard(
        product.index,
        product.title,
        product.price,
        product.description
      );
    });
  });

  it("Should filter products using the search field", () => {
    ["Watch", "Not", "Headphones", "Sneakers", "Crazy"].forEach((term) => {
      cy.typeInSearch(term);
      cy.verifySearch(term);
    });
  });

  it("Tests Descending Sorting", () => {
    cy.verifySorted("desc");
  });

  it("Tests Ascending Sorting", () => {
    cy.verifySorted("asc");
  });
});

describe("Navigation Tests", () => {
  it("Should navigate correctly from all homepage buttons", () => {
    const navTests = [
      { button: "nav-to-profile", path: "/profile" },
      { button: "nav-to-cart", path: "/cart" },
      { button: "view-product-1", path: "/product/1" },
      { button: "view-product-2", path: "/product/2" },
      { button: "view-product-3", path: "/product/3" },
    ];
    navTests.forEach(({ button, path }) => {
      cy.visit("/");
      cy.navigateButton(button);
      cy.verifyNavigation(path);
    });
  });
});
