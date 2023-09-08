/// <reference types="cypress" />

describe('Dog Facts', () => {
  beforeEach(() => {
    cy.visit('/dog-facts');

    cy.get('[data-test="fetch-button"]').as('fetchButton');
    cy.get('[data-test="clear-button"]').as('clearButton');
    cy.get('[data-test="amount-select"]').as('amountSelect');
    cy.get('[data-test="empty-state"]').as('emptyState');

    cy.intercept('/dog-facts/api?*').as('api');
  });

  it('should start out with an empty state', () => {
    cy.get('@emptyState');
  });

  it('should make a request when the button is called', () => {
    cy.get('@fetchButton').click();
    cy.wait('@api');
  });

  it('should adjust the amount when the select is changed', () => {
    const amount = '7';
    cy.get('@amountSelect').select(amount);
    
    cy.get('@fetchButton').click();
    cy.wait('@api').then((interception) => {
      expect(interception.request.url).contains(`amount=${amount}`);
    });
  });

  it('should show the correct number of facts on the page', () => {
    cy.get('@fetchButton').click();
    cy.wait('@api');
    cy.get('[data-test=dog-fact]').should('have.length', 3);
  });

  it('should clear the facts when the "Clear" button is pressed', () => {
    cy.get('@clearButton').click();
    cy.get('[data-test=dog-fact]').should('not.exist');
    cy.get('@emptyState');
  });

  it("should reflect the number of facts we're looking for in the title", () => {
    const amount = '7';
    cy.get('@amountSelect').select(amount);
    cy.title().should('equal', `${amount} Dog Facts`);
  });
});
