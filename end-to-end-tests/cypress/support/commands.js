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

Cypress.Commands.add("waitForLoad", () => {
  cy.get('circle', { timeout: 10000 } ).should('not.exist');
});

Cypress.Commands.add("navToEditorByDrawer", (oscalType, pageTitle) => {
  let requestsMade = [];
  for (const route of [
    "catalogs",
    "system-security-plans",
    "component-definitions",
    "profiles",
  ]) {
    cy.intercept("GET", `${Cypress.env("api_url")}/${route}`, () => {
      requestsMade.push(route);
    }).as(route);
  }
  cy.visit(Cypress.env("base_url"));

  // Wait for any requests that were made to finish. We give all requests 1m. They
  // probably don't need that long, but they can have it.
  if (requestsMade.length) {
    cy.wait(requestsMade, { timeout: 60000 });
  }
  
  cy.get('ul[aria-label="file system navigator"] li', { timeout: 30000 })
    .should('have.attr', 'aria-expanded', 'false') 
    .contains(oscalType)
    .click();

  cy.contains(pageTitle).click();
});

const oscalObjectTypes = [
  {
    commandName: "navToSspEditor",
    oscalType: "System Security Plan",
  },
  {
    commandName: "navToCdefEditor",
    oscalType: "Component",
  },
  {
    commandName: "navToProfileEditor",
    oscalType: "Profile",
  },
  {
    commandName: "navToCatalogEditor",
    oscalType: "Catalog",
  },
]

oscalObjectTypes.forEach((oscalObjectType) => {
  Cypress.Commands.add(oscalObjectType.commandName, (pageTitle) => {
    cy.navToEditorByDrawer(oscalObjectType.oscalType, pageTitle);
  })
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

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})
