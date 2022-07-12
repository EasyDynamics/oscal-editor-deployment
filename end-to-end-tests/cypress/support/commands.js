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

Cypress.Commands.add(
  "navToViewer",
  (viewerLinkText, navigationProfile) => {
    let requestsMade = [];
    for (const route of ["catalog", "system-security-plans", "component-definitions", "profiles"]) {
      cy.intercept('GET', `${Cypress.env("api_url")}/${route}`, () => {
        requestsMade.push(route);
      }).as(route);
    }
    cy.visit(Cypress.env("base_url"));
    cy.get("button").first().click();

    // Wait 1.5s for the events to start firing. In actuality it probably doesn't need to be
    // this log but it also gives time for the handler above to fire as well.
    cy.wait(1500);
    // Wait for any requests that were made to finish. We give all requests 1m. They
    // probably don't need that long, but they can have it.
    if (requestsMade.length) {
      cy.wait(requestsMade, { timeout: 60000 });
    }
    // Allow the app to process the received data
    cy.wait(5000);

    cy.contains(viewerLinkText).should("be.visible").click();
    cy.contains(navigationProfile, { timeout: 10000 }).click();
  }
);

Cypress.Commands.add("navToSspViewer", (toNavigate) => {
  cy.navToViewer("System Security Plan", toNavigate);
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
