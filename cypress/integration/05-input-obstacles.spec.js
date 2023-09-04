/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    const value = 'Iron Man';
    cy.get('[data-test="select-input"]').select(value);
    cy.get('[data-test="select-result"]').should('have.text', value);
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]').as('tomato');
    cy.get('[data-test="checkbox-sardines"]').as('sardines');

    cy.get('@tomato').check();
    cy.get('@sardines').check();
    cy.get('[data-test="checkbox-result"]').contains('Tomato, Sardines');

    cy.get('@sardines').uncheck();
    cy.get('[data-test="checkbox-result"]').contains('Tomato');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').as('ringo');
    cy.get('@ringo').check();
    cy.get('[data-test="radio-result"]').should('have.text', 'Ringo');
  });

  it('should find and control a color input', () => {
    const value = '#333333';
    cy.get('[data-test="color-input"]').as('color');
    cy.get('@color').invoke('val', value).trigger('input');
    cy.get('[data-test="color-result"]').should('have.text', value);
  });

  it('should find and control a date input', () => {
    cy.get('[data-test="date-input"]').type('2023-09-04');
    cy.get('[data-test="date-result"]').contains('2023-09-04');
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]').invoke('val', '7').trigger('input');
    cy.get('[data-test="range-result"]').contains('7');
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  });
});
