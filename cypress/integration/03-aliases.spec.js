/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    cy.get('[data-test=items]').as('items');
    cy.get('[data-test=items-unpacked]').as('unpackedItems');
    cy.get('[data-test=items-packed]').as('packedItems');
    cy.get('[data-test="filter-items"]').as('filterInput');
  });

  it('should filter items', () => {
    const searchTerm = 'Tooth';
    
    cy.get('@filterInput').type(searchTerm);
    cy.get('@items').find('li').should('contain.text', searchTerm);
  });

  it('should move item from one list to another', () => {
    cy.get('@unpackedItems').find('label').first().as('firstItem');
    cy.get('@firstItem').invoke('text').as('text');

    cy.get('@text').then((text) => {
      cy.get('@firstItem').click();
      cy.get('@packedItems').find('label').first().should('contain.text', text);
    });
  });
});
