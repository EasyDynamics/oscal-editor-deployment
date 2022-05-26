const SSP_TITLE_ORIG = 'Enterprise Logging and Auditing System Security Plan'
const COMP_DEF_TITLE_ORIG = 'Test Component Definition'

describe('Test Editing System Security Plan Title', () => {
  it('Successfully Edits SSP Title', () => {
    cy.navToTestSspRestMode(SSP_TITLE_ORIG)
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
    cy.navToTestSspRestMode(SSP_TITLE_ORIG)
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

describe('Test Editing Existing SSP Impl Req Statement', () => {
  it('Successfully Edits Existing SSP Impl Req Statement', () => {
    const PARAM_VALUE_ORIG = 'all staff and contractors within the organization';
    const PARAM_VALUE_NEW = 'some other param value';
    cy.navToTestSspRestMode(SSP_TITLE_ORIG)
    cy.contains('button', 'Enterprise Logging, Monitoring, and Alerting Policy').click()
    cy.get(`[aria-label="edit-bycomponent-795533ab-9427-4abe-820f-0b571bacfe6d-statement-au-1_smt.a"]`).click()
    cy.getInputByLabel('au-1_prm_1').clear().type(PARAM_VALUE_NEW)
    cy.intercept('GET', '/oscal/v1/system-security-plans/*').as('getSsp')
    cy.get(`[aria-label="save-au-1_smt.a"]`).click({force: true})
    cy.wait('@getSsp')
    // Verify updated value
    cy.contains('button', 'Enterprise Logging, Monitoring, and Alerting Policy').click()
    cy.contains(PARAM_VALUE_NEW).should('be.visible')
    // Return to previous state
    cy.get(`[aria-label="edit-bycomponent-795533ab-9427-4abe-820f-0b571bacfe6d-statement-au-1_smt.a"]`).click()
    cy.getInputByLabel('au-1_prm_1').clear().type(PARAM_VALUE_ORIG)
    cy.get(`[aria-label="save-au-1_smt.a"]`).click({force: true})
    cy.wait('@getSsp')
    cy.contains('button', 'Enterprise Logging, Monitoring, and Alerting Policy').click()
    cy.contains(PARAM_VALUE_ORIG).should('be.visible')
  })
})
