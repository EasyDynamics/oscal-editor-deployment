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
