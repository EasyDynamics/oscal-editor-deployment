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
const SSP_NAVIGATION = "Enterprise Logging and Auditing System Security Plan";
const CATALOG_NAVIGATION =
  "NIST Special Publication 800-53 Revision 5: Security and Privacy Controls for Federal Information Systems and Organizations";
const COMPONENT_NAVIGATION = "Test Component Definition";
const PROFILE_NAVIGATION =
  "NIST Special Publication 800-53 Revision 4 MODERATE IMPACT BASELINE";

Cypress.Commands.add(
  "navToViewer",
  (viewerLinkText, titleText, navigationProfile) => {
    cy.visit(Cypress.env("base_url"));
    // cy.findByText('OSCAL Catalog Editor').should('exist')
    cy.get("button").first().click();
    // cy.pause()
    cy.contains(viewerLinkText).click();
    cy.contains(navigationProfile).click();
    cy.findByText(titleText).should("be.visible");
  }
);

Cypress.Commands.add("navToSspViewer", () => {
  cy.navToViewer("SSP", "OSCAL System Security Plan Editor", SSP_NAVIGATION);
});

Cypress.Commands.add("navToCdefViewer", () => {
  cy.navToViewer("Component", "OSCAL Component Editor", COMPONENT_NAVIGATION);
});
Cypress.Commands.add("navToProfileViewer", () => {
  cy.navToViewer("Profile", "OSCAL Profile Editor", PROFILE_NAVIGATION);
});
Cypress.Commands.add("navToCatalogViewer", () => {
  cy.navToViewer("Catalog", "OSCAL Catalog Editor", CATALOG_NAVIGATION);
});
Cypress.Commands.add("navToTestSspRestMode", (sspTitle) => {
  cy.navToSspViewer();
  cy.contains("Select OSCAL SSP").parent().click();
  cy.contains(sspTitle).click();
  cy.contains(sspTitle).should("be.visible");
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
