Feature: Checkout Success Page

  Background:
    Given I am on the checkout success page

  Scenario: Display thank-you content
    Then I should see the success page content

  Scenario: Continue Shopping navigates home
    When I click continue shopping
    Then I should be on the home page

  Scenario: View Your Orders navigates profile
    When I click view your orders
    Then I should be on the profile page