
Feature: Product page tests

  Scenario Outline: Verify product page and quantity selector
    Given I visit the product page for product <id>
    When I verify the product details are "<name>", "<price>", "<description>"
    Then I verify the quantity selector for product <id> has value <quantity>

  Examples:
    | id | name                    | price    | description                                                       | quantity |
    | 1  | Classic White Sneakers  | $79.99   | Comfortable and stylish white sneakers for everyday wear          | 2        |
    | 2  | Premium Leather Watch   | $149.99  | Elegant leather watch with premium craftsmanship                  | 3        |
    | 3  | Wireless Headphones     | $199.99  | High-quality wireless headphones with noise cancellation          | 5        |

  Scenario Outline: Verify manual URL edge cases
    When I visit manual URL for product <id>

  Examples:
    | id |
    | 1  |
    | 2  |
    | 3  |
    | 4  |
    | 5  |

  Scenario: Return button returns to main page
    Given I visit manual URL for product 2
    When I click the back to products button for product 2
    Then I should be returned to the main page