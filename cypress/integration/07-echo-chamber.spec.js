/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber');
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
    cy.get('[data-test=sign-in]').click();
    cy.location('pathname').should('contain', 'sign-in');
  });

  it('should navigate to "/sign-up" when you click the "Sign Up" button', () => {
    cy.get('[data-test=sign-up]').click();
    cy.location('pathname').should('contain', 'sign-up');
  });
});

describe('Sign Up', () => {
  const invalidEmail = 'invalid123';
  const validEmail = 'hello@email.com';

  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-email"]').as('email');
    cy.get('[data-test="sign-up-submit"]').as('submitButton');
  });

  it('should require an email', () => {
    cy.get('@submitButton').click();
    cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);
  });

  it('should require that the email actually be an email address', () => {
    cy.get('@email').type(invalidEmail);
    cy.get('@submitButton').click();
    cy.get('[data-test="sign-up-email"]:invalid').invoke('prop', 'validity').its('typeMismatch').should('be.true');

    cy.get('@email').clear().type(validEmail);
    cy.get('@submitButton').click();
    cy.get('@email').invoke('prop', 'validity').its('valid').should('be.true');
  });

  it('should require a password when the email is present', () => {
    cy.get('@email').type(validEmail);
    cy.get('@submitButton').click();
    cy.get('[data-test="sign-up-password"]:invalid').invoke('prop', 'validity').its('valueMissing').should('be.true');
  });
});
