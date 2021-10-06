/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("The App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000/");
  });

  it("audits the home page", () => {
    cy.lighthouse({
      performance: 100,
      accessibility: 100,
      "best-practices": 100,
      seo: 100,
    });

    cy.pa11y();
  });
});
