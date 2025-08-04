Feature: Homepage Navigation

Background: Homepage
  Given I am on the homepage

Scenario: I can see the main content
  When I should see the main content and products
  Then I should see the Profile, Cart and Sort by Price buttons

Scenario Outline: Verify product <id> card details
  Then I should verify product <id> card with name "<name>", price "<price>" and description "<description>"

Examples:
  | id | name                    | price   | description                                              |
  | 1  | Classic White Sneakers  | $79.99  | Comfortable and stylish white sneakers for everyday wear |
  | 2  | Premium Leather Watch   | $149.99 | Elegant leather watch with premium craftsmanship         |
  | 3  | Wireless Headphones     | $199.99 | High-quality wireless headphones with noise cancellation |

Scenario Outline: Search for products by term
  When I type "<term>" into the search field
  Then I should see search results for "<term>"

Examples:
  | term       |
  | watch      |
  | not        |
  | headphones |
  | sneakers   |
  | crazy      |

Scenario Outline: Sort products by price
  When I sort products by "<sort>"
  Then I should see products sorted by "<sort>"

Examples:
  | sort |
  | asc  |
  | desc |

Scenario Outline: Navigate to page from home
  When I click the "<button>" button
  Then I should be on the "<path>" page

Examples:
  | button           | path         |
  | nav-to-profile   | /profile     |
  | nav-to-cart      | /cart        |
  | view-product-1   | /product/1   |
  | view-product-2   | /product/2   |
  | view-product-3   | /product/3   |