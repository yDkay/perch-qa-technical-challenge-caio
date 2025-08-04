Feature: Order History Flow

  Background:
    Given I am on the homepage
    And I have the following address:
      | firstName | Caio Consoli             |
      | email     | caio.consoli@example.com |
      | phone     | 1234567890               |
      | street    | Rua Do Elmo              |
      | city      | Cascavel                 |
      | state     | Parana                   |
      | zipCode   | 10001                    |
      | country   | Brazil                   |
    And I have the following payment details:
      | cardholderName | Rich Caio        |
      | cardNumber     | 1234567890123456 |
      | expiry         | 08/25            |
      | cvv            | 616              |

  Scenario: Verifies the order shows up correctly when quantity = 1
    When I add product 1 with quantity 1
    And I complete checkout
    Then I should see the order number displayed
    And I should see order date visible
    And I should see order total visible
    And I should see the product details visible
    And the total should match the sum of line items

  Scenario: Documents the bug: total ignores quantity when qty > 1
    When I add product 1 with quantity 3
    And I complete checkout
    Then the total should not match the sum of line items

  Scenario: Multiple Products with known bug
    When I add multiple products:
      | id | quantity |
      | 1  | 2        |
      | 2  | 1        |
      | 3  | 3        |
    And I go back to the home page
    And I complete checkout
    Then the total should not match the sum of line items