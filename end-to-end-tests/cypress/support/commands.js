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
  (viewerLinkText, navigationProfile, skipWait = true) => {
    cy.intercept({
      method: "GET",
      url: `${Cypress.env("api_url")}/catalogs`,
    }).as("catalogs");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env("api_url")}/system-security-plans`,
    }).as("SSP");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env("api_url")}/component-definitions`,
    }).as("components");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env("api_url")}/profiles`,
    }).as("profiles");
    cy.visit(Cypress.env("base_url"));
    cy.get("button").first().click();

    if (!skipWait) {
      cy.wait(["@catalogs", "@SSP", "@components", "@profiles"]);
    }
    cy.contains(viewerLinkText).click();
    cy.contains(navigationProfile).click();
  }
);

Cypress.Commands.add("navToSspViewer", (toNavigate, skipWait = true) => {
  cy.navToViewer("System Security Plan", toNavigate, skipWait);
});

Cypress.Commands.add("navToCdefViewer", (toNavigate, skipWait = true) => {
  cy.navToViewer("Component", toNavigate, skipWait);
});

Cypress.Commands.add("navToProfileViewer", (toNavigate, skipWait = true) => {
  cy.navToViewer("Profile", toNavigate, skipWait);
});

Cypress.Commands.add("navToCatalogViewer", (toNavigate, skipWait = true) => {
  cy.navToViewer("Catalog", toNavigate, skipWait);
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
