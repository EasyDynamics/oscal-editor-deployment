const SSP_TITLE_ORIG = "Enterprise Logging and Auditing System Security Plan";
const COMP_DEF_TITLE_ORIG = "Test Component Definition";

describe('Test Loading System Security Plans', () => {
  it('Successfully Loads SSPs by REST Mode', () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.get(`[aria-label="show code"]`).click()
    cy.scrollTo('bottom')
    cy.contains('This is the control implementation for the system.').should('be.visible')
  })
  it('Successfully Loads SSPs by URL', () => {
    cy.navToSspEditor(SSP_TITLE_ORIG)
    cy.contains("REST Mode").click()
    cy.contains('OSCAL System Security Plan URL').first().should('exist').next().click().clear().type(Cypress.env('base_url') + "/oscal/v1/system-security-plans/cff8385f-108e-40a5-8f7a-82f3dc0eaba8")
    cy.contains('Reload').click()
    cy.contains(SSP_TITLE_ORIG).should('be.visible')
    cy.scrollTo('bottom')
    cy.contains('This is the control implementation for the system.').should('be.visible')
  })
})

describe('Test Loading Component Definitions', () => {
  it('Successfully Loads Components by REST Mode', () => {
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG)
    cy.contains(COMP_DEF_TITLE_ORIG).should('be.visible')
    cy.contains('Test Vendor').should('be.visible')
    cy.scrollTo('bottom')
  })
  it('Successfully Loads Components by URL', () => {
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG)
    cy.contains("REST Mode").click()
    cy.contains('OSCAL Component URL').first().should('exist').next().click().clear().type(Cypress.env('base_url') + "/oscal/v1/component-definitions/8223d65f-57a9-4689-8f06-2a975ae2ad72")
    cy.contains('Reload').click()
    cy.contains(COMP_DEF_TITLE_ORIG).should('be.visible')
    cy.contains('Test Vendor').should('be.visible')
    cy.scrollTo('bottom')
  })
})

describe("Test Loading Wrong Object Type", () => {
  it("Displays Proper Error on Load of Wrong Object Type", () => {
    cy.visit(Cypress.env("base_url"));
    cy.contains("REST Mode").click();
    cy.contains("OSCAL Catalog URL")
      .first()
      .should("exist")
      .next()
      .click()
      .clear()
      .type(
        "https://raw.githubusercontent.com/usnistgov/oscal-content/main/examples/ssp/json/ssp-example.json"
      );
    cy.contains("Reload").click();
    cy.contains("Yikes").should("be.visible");
  });
});
