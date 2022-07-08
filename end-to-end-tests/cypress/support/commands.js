// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("navToViewer", (viewerLinkText, navigationProfile) => {
  cy.visit(Cypress.env("base_url"));
  cy.get("button").first().click();
  cy.wait(1000);
  cy.contains(viewerLinkText).click();
  cy.contains(navigationProfile).click();
});

Cypress.Commands.add("navToSspViewer", (toNavigate) => {
  cy.navToViewer("SSP", toNavigate);
});

Cypress.Commands.add("navToCdefViewer", (toNavigate) => {
  cy.navToViewer("Component", toNavigate);
});

Cypress.Commands.add("navToProfileViewer", (toNavigate) => {
  cy.navToViewer("Profile", toNavigate);
});

Cypress.Commands.add("navToCatalogViewer", (toNavigate) => {
  cy.navToViewer("Catalog", toNavigate);
});

Cypress.Commands.add("getInputByLabel", (label) => {
  cy.contains("label", label)
    .invoke("attr", "for")
    .then((id) => {
      //cy.get('#' + id)
      cy.get(`input[id="${id}"]`);
    });
});

Cypress.Commands.add("getTestSspJson", () => {
  cy.request(
    "GET",
    `${Cypress.env(
      "api_url"
    )}/system-security-plans/cff8385f-108e-40a5-8f7a-82f3dc0eaba8`
  ).then((response) => {
    return cy.wrap(response.body);
  });
});

Cypress.Commands.add("setTestSspJson", (sspJson) => {
  cy.request(
    "PUT",
    `${Cypress.env(
      "api_url"
    )}/system-security-plans/cff8385f-108e-40a5-8f7a-82f3dc0eaba8`,
    sspJson
  );
});
