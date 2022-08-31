const SSP_TITLE_ORIG = "Enterprise Logging and Auditing System Security Plan";
const COMP_DEF_TITLE_ORIG = "Test Component Definition";

describe('Loading system security plans', () => {
  it('loads SSPs by REST Mode', () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.get(`[aria-label="show code"]`).click()
    cy.scrollTo('bottom')
    cy.contains('This is the control implementation for the system.').should('be.visible')
  })
  it('loads system security plans by URL', () => {
    cy.navToSspEditor(SSP_TITLE_ORIG)
    cy.contains("REST Mode").click()
    cy.contains('OSCAL System Security Plan URL').first().should('exist').next().click().clear().type(Cypress.env('base_url') + "/oscal/v1/system-security-plans/cff8385f-108e-40a5-8f7a-82f3dc0eaba8")
    cy.contains('Reload').click()
    cy.contains(SSP_TITLE_ORIG).should('be.visible')
    cy.scrollTo('bottom')
    cy.contains('This is the control implementation for the system.').should('be.visible')
  })
  it('displays Enterprise Asset Owners Party', () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.waitForLoad();
    cy.get(`[aria-label="Enterprise Asset Owners contact button"]`).click();
    cy.contains("No address information provided");
    cy.contains("No telephone information provided");
    cy.contains("owners@enterprise.org");
  });
  it('displays Enterprise Asset Administrators Party', () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.waitForLoad();
    cy.get(`[aria-label="Enterprise Asset Administrators contact button"]`).click();
    cy.contains("0000 St");
    cy.contains("+18005555555");
    cy.contains("admins@enterprise.org");
    cy.contains("account@email.com");
  });

})

describe('Loading Component Definitions', () => {
  it('loads Components by REST Mode', () => {
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG)
    cy.contains(COMP_DEF_TITLE_ORIG).should('be.visible')
    cy.contains('Test Vendor').should('be.visible')
    cy.scrollTo('bottom')
  })
  it('loads components by URL', () => {
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG)
    cy.contains("REST Mode").click()
    cy.contains('OSCAL Component URL').first().should('exist').next().click().clear().type(Cypress.env('base_url') + "/oscal/v1/component-definitions/8223d65f-57a9-4689-8f06-2a975ae2ad72")
    cy.contains('Reload').click()
    cy.contains(COMP_DEF_TITLE_ORIG).should('be.visible')
    cy.contains('Test Vendor').should('be.visible')
    cy.scrollTo('bottom')
  })
})

describe('Errors caused by loading a bad component definition', () => {
  beforeEach(() => {
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG);
    cy.contains("REST Mode").click();
    cy.contains('OSCAL Component URL').first().should('exist').next().click().clear().type("https://raw.githubusercontent.com/usnistgov/oscal-content/main/examples/ssp/json/ssp-example.json");
    cy.contains('Reload').click();
  });

  it('display "yikes" on load of wrong object type', () => {
    cy.contains('Yikes').should('be.visible')
  });

  it('do not persist after loading a valid component in Viewer', () => {
    cy.contains('OSCAL Component URL').first().should('exist').next().click().clear().type("https://raw.githubusercontent.com/EasyDynamics/oscal-demo-content/main/component-definitions/example-component.json");
    cy.contains('Reload').click();
    cy.contains('Test Component Definition').should('be.visible');
  });

  it('do not persist after loading a valid component in Editor', () => {
    cy.contains("REST Mode").click();
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG);
  });
});
