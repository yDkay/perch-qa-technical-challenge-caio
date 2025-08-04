Feature: Shopping Cart

  Background:
    Given I visit home page

  Scenario: Validate empty cart via homepage
    When I validate empty cart from homepage

  Scenario: Validate empty cart via direct URL
    When I validate empty cart from URL

  Scenario Outline: Add, validate, edit and remove a single product
    When I add single product <id> with quantity <quantity>
    And I validate subtotal
    And I edit product <id> quantity to <newQuantity>
    And I validate subtotal
    And I remove single product <id>

    Examples:
      | id | quantity | newQuantity |
      | 1  | 2        | 3           |

  Scenario Outline: Add, validate, edit and checkout a single product
    When I add single product <id> with quantity <quantity>
    And I validate subtotal
    And I edit product <id> quantity to <newQuantity>
    And I validate subtotal
    And I proceed to checkout

    Examples:
      | id | quantity | newQuantity |
      | 2  | 3        | 4           |

  Scenario: Add, validate, edit and remove multiple products
    When I add multiple products:
      | id | quantity |
      | 1  | 2        |
      | 2  | 3        |
      | 3  | 4        |
    And I validate subtotal
    And I edit product 2 quantity to 5
    And I validate subtotal
    And I remove single product 1
    And I validate subtotal
    And I remove all products

  Scenario: Add, validate, edit and checkout multiple products
    When I add multiple products:
      | id | quantity |
      | 1  | 2        |
      | 2  | 3        |
      | 3  | 4        |
    And I validate subtotal
    And I edit product 3 quantity to 2
    And I validate subtotal
    And I proceed to checkout