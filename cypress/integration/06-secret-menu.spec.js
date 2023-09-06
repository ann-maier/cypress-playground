/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  for (const property of properties) {
    it(`should have column for ${property}`, () => {
      cy.get(`#${property}-column`).should('be.visible');
    });

    it(`should hide ${property} column when unchecked`, () => {
      cy.get(`#show-${property}`).uncheck();
      cy.get(`#${property}-column`).should('not.be.visible');
    });
  }

  for (const rating of ratings) {
    it(`should set ${rating} and filter table data by rating`, () => {
      cy.get('#minimum-rating-visibility').invoke('val', rating).trigger('change');
      cy.get('td[headers="popularity-column"]').each(element => {
        const popularity = Number(element.text());
        expect(popularity).to.be.at.least(rating);
      });
    });
  }

  for (const restaurant of restaurants) {
    it(`should set ${restaurant} and filter table data by restaurant`, () => {
      cy.get('#restaurant-visibility-filter').select(restaurant);
      cy.get('td[headers="whereToOrder-column"]').should('contain', restaurant);
    });
  }
});
