Feature: Profile Page

  Background:
    Given I am on the profile page

  Scenario: Back home button works
    When I click back to home
    Then I should be on the home page

  Scenario: Profile header and card UI display correctly
    Then I should see the profile header and card UI

  Scenario: Edit and save preserves new values
    When I edit and save my profile with:
      | name  | Caio Consoli             |
      | email | caio.consoli@example.co  |
    Then my profile should show:
      | name  | Caio Consoli             |
      | email | caio.consoli@example.co  |

  Scenario: Edit and cancel reverts to previous values
    When I edit and cancel my profile with:
      | name  | Temp Name                |
      | email | temp.email@example.com   |
    Then my profile should remain unchanged

  Scenario Outline: Name field validation rejects invalid or blocked-but-valid names
    When I enter "<name>" into the name field and attempt to save
    Then I should see a name validation error

    Examples:
      | name              |
      | A                 |
      | J@ne              |
      | Mary-Jane         |
      | O'Neil            |
      | José Álvarez      |
      | Zoë Smith         |
      | François Dupont   |
      | Müller            |
      | Óscar Núñez       |
      | Ñandú             |

  Scenario Outline: Email field validation rejects invalid emails
    When I enter "<email>" into the email field and attempt to save
    Then I should see an email validation error

    Examples:
      | email           |
      | plainaddress    |
      | @no-local.com   |
      | user@.com       |
      | user@domain     |

  Scenario Outline: Email field validation accepts valid and flawed emails
    When I enter "<email>" into the email field and save
    Then I should save successfully without email errors

    Examples:
      | email                 |
      | user@example.com      |
      | first.last@mail.co.uk |
      | user_name@domain.org  |
      | user+alias@example.co |
      | x@x.io                |
      | user@domain-.com      |
      | user@domain..com      |
      | user@domain.c         |

  Scenario: Order history “no orders” and Start Shopping button
    When I verify order history with no orders
    Then I should be on the home page