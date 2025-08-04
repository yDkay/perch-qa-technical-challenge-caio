Feature: Checkout Payment Page

  Background:
    Given I am on the checkout payment page

  Scenario: Shows required field errors for all fields
    When I check required payment fields
    Then I should see required field errors for all payment fields

  Scenario: Submit a valid payment
    When I submit a valid payment with:
      | cardHolder | JOHN DOE           |
      | cardNumber | 4242424242424242   |
      | expiryDate | 12/34              |
      | cvv        | 123                |
    Then I should be on the checkout success page

  # Card Holder Name
  Scenario Outline: Rejects invalid card holder names
    When I check invalid card holder names:
      | name      |
      | A         |
      | J0HN DOE  |
      | JOÃO DOE  |
      | O'NEIL    |
      | MARY-JANE |
    Then I should see card holder name errors for all invalid names

  Scenario Outline: Accepts valid card holder names
    When I fill in the card holder name with "<name>"
    Then I should see no error for the card holder field
    Examples:
      | name               |
      | JOHN DOE           |
      | ALICE BOB          |
      | MARY JANE          |
      | caio consoli       |
      | natalia dagostim   |
      | jao                |

  # Card Number
  Scenario Outline: Rejects invalid card numbers
    When I check invalid card numbers:
      | number            |
      | 1234              |
      | 378282246310005   |
      | 4242 4242 4242 424 |
      | abcd1234abcd5678  |
    Then I should see card number errors for all invalid numbers

  Scenario Outline: Accepts valid card numbers
    When I fill in the card number with "<number>"
    Then I should see no error for the card number field
    Examples:
      | number             |
      | 4242424242424242   |
      | 5555555555554444   |
      | 6011111111111117   |

  # Expiry Date
  Scenario Outline: Rejects invalid expiry date formats
    When I check invalid expiry dates:
      | date  |
      | 13/20 |
      | 00/20 |
      | 1/20  |
      | 1/2   |
      | 12/2  |
    Then I should see an error "Expiry date must be in MM/YY format" for the expiry date field

  Scenario Outline: Rejects expired expiry dates (but currently allowed)
    When I fill in the expiry date with "<date>"
    Then I should see no error for the expiry date field
    Examples:
      | date   |
      | 01/20  |
      | 05/21  |
      | 12/19  |

  Scenario Outline: Accepts valid expiry dates
    When I fill in the expiry date with "<date>"
    Then I should see no error for the expiry date field
    Examples:
      | date  |
      | 01/23 |
      | 12/99 |
      | 06/25 |

  # CVV
  Scenario Outline: Rejects invalid CVVs
    When I check invalid CVVs:
      | cvv  |
      | 12   |
      | 12a  |
      | abcd |
    Then I should see CVV errors for all invalid CVVs

  Scenario Outline: Accepts valid CVVs
    When I fill in the CVV with "<cvv>"
    Then I should see no error for the CVV field
    Examples:
      | cvv  |
      | 123  |
      | 000  |
      | 9999 |
      | 1234 |