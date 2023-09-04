/// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  it('should set the range and verify it', () => {
    cy.get('@rating-filter').invoke('val', '7').trigger('input');
    cy.get('@rating-filter').should('have.value', '7');
  });

  it('should uncheck the checkbox and verify it', () => {
    cy.get('input[type="checkbox"]').first().uncheck().should('not.be.checked');
  });

  it('should select an option from the select and verify it', () => {
    const value = 'Starbucks';
    cy.get('@restaurant-filter').select(value);
    cy.get('@restaurant-filter').should('have.value', value);
  });
});
