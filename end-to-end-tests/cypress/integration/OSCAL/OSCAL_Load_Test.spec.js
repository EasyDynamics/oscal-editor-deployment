const SSP_TITLE_ORIG = 'Enterprise Logging and Auditing System Security Plan'
const COMP_DEF_TITLE_ORIG = 'Test Component Definition'

function navigateToSsps() {
  cy.visit(Cypress.env('base_url')) 
  cy.findByText('OSCAL Catalog Viewer').should('exist')
  cy.get('button').first().click()
  cy.contains('System Security Plan Viewer').click()
  cy.findByText('OSCAL System Security Plan Viewer').should('be.visible')
}

function navigateToComponentDefinitions() {
  cy.visit(Cypress.env('base_url')) 
  cy.findByText('OSCAL Catalog Viewer').should('exist')
  cy.get('button').first().click()
  cy.contains('Component Viewer').click()
  cy.contains('OSCAL Component Viewer').should('be.visible')
}

function navigateToTestSspRestMode() {
  navigateToSsps()
  cy.contains('Select OSCAL SSP').parent().click()
  cy.contains(SSP_TITLE_ORIG).click()
  cy.contains(SSP_TITLE_ORIG).should('be.visible')
}

describe('Test Loading System Security Plans', () => {
  it('Successfully Loads SSPs by REST Mode', () => {
    navigateToTestSspRestMode()
    cy.get(`[aria-label="show code"]`).click()
    cy.scrollTo('bottom')
    cy.contains('This is the control implementation for the system.').should('be.visible')
  })
  it('Successfully Loads SSPs by URL', () => {
    navigateToSsps()
    cy.contains("REST Mode").click()
    cy.contains('OSCAL SSP URL').first().should('exist').next().click().clear().type(Cypress.env('base_url') + "/oscal/v1/system-security-plans/cff8385f-108e-40a5-8f7a-82f3dc0eaba8")
    cy.contains('Reload').click()
    cy.contains(SSP_TITLE_ORIG).should('be.visible')
    cy.scrollTo('bottom')
    cy.contains('This is the control implementation for the system.').should('be.visible')
  })
})

describe('Test Editing System Security Plan Title', () => {
  it('Successfully Edits SSP Title', () => {
    navigateToTestSspRestMode()
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click()
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`).click().clear().type('Another SSP')
    cy.get(`[aria-label="save-system-security-plan-metadata-title"]`).click()
    cy.contains('Another SSP').should('be.visible')
    // Return to previous state
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click()
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`).click().clear().type(SSP_TITLE_ORIG)
    cy.get(`[aria-label="save-system-security-plan-metadata-title"]`).click()
    cy.contains(SSP_TITLE_ORIG).should('be.visible')
  })
})

describe('Test Editing System Security Plan Source', () => {
  it('Successfully Edits SSP Source', () => {
    navigateToTestSspRestMode()
    const findKeystroke = Cypress.platform === 'darwin' ? '{meta}f' : '{ctrl}f'
    cy.get('.monaco-editor textarea:first')
      .type(findKeystroke).focused().type('Enterprise Logging and Auditing System Security Plan', {force: true})
      .type('{esc}', {force: true}).focused().type('Even Better SSP', {force: true})
    cy.contains('Save').click()
    cy.contains('Even Better SSP').should('be.visible')
    // Return to previous state
    cy.get('.monaco-editor textarea:first')
      .type(findKeystroke).focused().type('Even Better SSP', {force: true})
      .type('{esc}', {force: true}).focused().type('Enterprise Logging and Auditing System Security Plan', {force: true})
    cy.contains('Save').click()
    cy.contains(SSP_TITLE_ORIG).should('be.visible')
  })
})

describe('Test Loading Component Definitions', () => {
  it('Successfully Loads Components by REST Mode', () => {
    navigateToComponentDefinitions()
    cy.contains('Select OSCAL Component').parent().click()
    cy.contains(COMP_DEF_TITLE_ORIG).click()
    cy.contains(COMP_DEF_TITLE_ORIG).should('be.visible')
    cy.contains('Test Vendor').should('be.visible')
    cy.scrollTo('bottom')
  })
  it('Successfully Loads Components by URL', () => {
    navigateToComponentDefinitions()
    cy.contains("REST Mode").click()
    cy.contains('OSCAL Component URL').first().should('exist').next().click().clear().type(Cypress.env('base_url') + "/oscal/v1/component-definitions/8223d65f-57a9-4689-8f06-2a975ae2ad72")
    cy.contains('Reload').click()
    cy.contains(COMP_DEF_TITLE_ORIG).should('be.visible')
    cy.contains('Test Vendor').should('be.visible')
    cy.scrollTo('bottom')
  })
})

describe('Test Loading Wrong Object Type', () => {
  it('Displays Proper Error on Load of Wrong Object Type', () => {
    cy.visit(Cypress.env('base_url')) 
    cy.contains("REST Mode").click()
    cy.contains('OSCAL Catalog URL').first().should('exist').next().click().clear().type("https://raw.githubusercontent.com/usnistgov/oscal-content/main/examples/ssp/json/ssp-example.json")
    cy.contains('Reload').click()
    cy.contains('Yikes').should('be.visible')
  })
})