Feature: Checkout Address Page

  Background:
    Given I am on the checkout address page

  Scenario: Shows required field errors for all fields
    When I check required address fields
    Then I should see required field errors for all address fields

  Scenario: Submit a valid address
    When I fill in the address with:
      | firstName | John Doe              |
      | email     | john.doe@example.com  |
      | phone     | +1 (234) 567-8901     |
      | street    | 123 Main St           |
      | city      | Springfield           |
      | state     | Illinois              |
      | zipCode   | 62704                 |
      | country   | United States         |
    And I click continue
    Then I should be on the checkout payment page

  Scenario Outline: Rejects names with symbols or accents
    When I fill in the first name with "<name>"
    And I click continue
    Then I should see an error "Name must be 2-30 characters and contain only letters" for the first name field
  Examples:
    | name      |
    | J@ne      |
    | Mary-Jane |
    | João      |
    | Álvaro    |

  Scenario Outline: Accepts plain ASCII first names
    When I fill in the first name with "<name>"
    And I click continue
    Then I should see no error for the first name field
  Examples:
    | name         |
    | Alice        |
    | Bob Smith    |
    | Caio Consoli |

  # Email (valid and invalid)
  Scenario Outline: Rejects bad emails
    When I fill in the email with "<email>"
    And I click continue
    Then I should see an error "Please enter a valid email address" for the email field
  Examples:
    | email       |
    | test@       |
    | user@domain |
    | user@.com   |
    | user@domain.c |

  Scenario Outline: Rejects edge‐case emails with plus sign
    When I fill in the email with "<email>"
    And I click continue
    Then I should see an error "Please enter a valid email address" for the email field
  Examples:
    | email                        |
    | user+alias@example.com       |
    | first.last+test@mail.com     |

  Scenario Outline: Accepts simple ASCII emails
    When I fill in the email with "<email>"
    And I click continue
    Then I should see no error for the email field
  Examples:
    | email                    |
    | user@example.com         |
    | first.last@mail.co.uk    |
    | user_name@domain.org     |

  # Phone (valid and invalid)
  Scenario Outline: Rejects too short/long or non‐digit phone numbers
    When I fill in the phone number with "<phone>"
    And I click continue
    Then I should see an error "Phone number must be 10-15 digits" for the phone field
  Examples:
    | phone             |
    | 12345             |
    | 1234567890123456  |
    | abcdEFGhij        |
    | 123-abc-4567      |

  Scenario Outline: Accepts 10–15 digit numbers with formatting
    When I fill in the phone number with "<phone>"
    And I click continue
    Then I should see no error for the phone field
  Examples:
    | phone                |
    | 0123456789           |
    | +44 207 183 8750     |
    | (123) 456-7890       |
    | 123456789012345      |

  # Street (min length)
  Scenario Outline: Rejects street addresses shorter than 5 characters
    When I fill in the street address with "<street>"
    And I click continue
    Then I should see an error "Street address must be at least 5 characters" for the street field
  Examples:
    | street |
    | 1234   |

  Scenario Outline: Accepts any street address with 5+ characters
    When I fill in the street address with "<street>"
    And I click continue
    Then I should see no error for the street field
  Examples:
    | street         |
    | 123 Main       |
    | Rua São João   |
    | あいしています |

  # City (accented and edge cases)
  Scenario Outline: Rejects too short or numeric city names
    When I fill in the city with "<city>"
    And I click continue
    Then I should see an error "City must contain only letters and spaces" for the city field
  Examples:
    | city     |
    | A        |
    | City123  |

  Scenario Outline: Rejects accented city names
    When I fill in the city with "<city>"
    And I click continue
    Then I should see an error "City must contain only letters and spaces" for the city field
  Examples:
    | city      |
    | Caçapava  |
    | München   |
    | Zürich    |

  Scenario Outline: Accepts plain ASCII city names
    When I fill in the city with "<city>"
    And I click continue
    Then I should see no error for the city field
  Examples:
    | city      |
    | London    |
    | New York  |

  # State (accented and edge cases)
  Scenario Outline: Rejects too short or numeric state names
    When I fill in the state with "<state>"
    And I click continue
    Then I should see an error "State must contain only letters and spaces" for the state field
  Examples:
    | state  |
    | X      |
    | CA123  |

  Scenario Outline: Rejects accented state names
    When I fill in the state with "<state>"
    And I click continue
    Then I should see an error "State must contain only letters and spaces" for the state field
  Examples:
    | state      |
    | São Paulo  |
    | Québec     |

  Scenario Outline: Accepts plain ASCII state names
    When I fill in the state with "<state>"
    And I click continue
    Then I should see no error for the state field
  Examples:
    | state              |
    | California         |
    | New South Wales    |

  # ZIP Code (international formats)
  Scenario Outline: Rejects non‐4/5-digit ZIP codes
    When I fill in the ZIP code with "<zip>"
    And I click continue
    Then I should see an error "ZIP code must be 4 or 5 digits" for the ZIP code field
  Examples:
    | zip        |
    | EC1A 1BB   |
    | 100-0001   |
    | 110001     |
    | 01000-000  |
    | SW1A1AA    |

  Scenario Outline: Accepts only 4 or 5 digit ZIP codes
    When I fill in the ZIP code with "<zip>"
    And I click continue
    Then I should see no error for the ZIP code field
  Examples:
    | zip   |
    | 1234  |
    | 12345 |

  # Country (accented and edge cases)
  Scenario Outline: Rejects numeric or accented country names
    When I fill in the country with "<country>"
    And I click continue
    Then I should see an error "Country must contain only letters and spaces" for the country field
  Examples:
    | country  |
    | 1        |
    | U$A      |
    | Canadá   |
    | México   |

  Scenario Outline: Accepts plain ASCII country names
    When I fill in the country with "<country>"
    And I click continue
    Then I should see no error for the country field
  Examples:
    | country         |
    | Brazil          |
    | United Kingdom  |