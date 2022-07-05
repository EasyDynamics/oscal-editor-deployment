const SSP_TITLE_ORIG = 'Enterprise Logging and Auditing System Security Plan'
const COMP_DEF_TITLE_ORIG = 'Test Component Definition'

describe('Test Editing System Security Plan Title', () => {
  // Store current SSP and reset after test
  let origSspJson
  before(() => {
    cy.getTestSspJson().then(result => origSspJson = result)
  })
  after(() => {
    cy.setTestSspJson(origSspJson)
  })

  it('Successfully Edits SSP Title', () => {
    cy.navToSspViewer();
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click()
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`).click().clear().type('Another SSP')
    cy.get(`[aria-label="save-system-security-plan-metadata-title"]`).click()
    cy.contains('Another SSP').should('be.visible')
  })
})

describe('Test Editing System Security Plan Source', () => {
  // Store current SSP and reset after test
  let origSspJson
  before(() => {
    cy.getTestSspJson().then(result => origSspJson = result)
  })
  after(() => {
    cy.setTestSspJson(origSspJson)
  })

  it('Successfully Edits SSP Source', () => {
    cy.navToSspViewer();
    const findKeystroke = Cypress.platform === 'darwin' ? '{meta}f' : '{ctrl}f'
    cy.get('.monaco-editor textarea:first')
      .type(findKeystroke).focused().type('Enterprise Logging and Auditing System Security Plan', {force: true})
      .type('{esc}', {force: true}).focused().type('Even Better SSP', {force: true})
    cy.contains('Save').click()
    cy.contains('Even Better SSP').should('be.visible')
  })
})

describe('Test Editing Existing SSP Impl Req Statement', () => {
  // Store current SSP and reset after test
  let origSspJson
  before(() => {
    cy.getTestSspJson().then(result => origSspJson = result)
  })
  after(() => {
    cy.setTestSspJson(origSspJson)
  })

  it('Successfully Edits Existing SSP Impl Req Statement', () => {
    const COMPONENT_NAME = 'Enterprise Logging, Monitoring, and Alerting Policy'
    const PARAM_VALUE_ORIG = 'all staff and contractors within the organization'
    const PARAM_VALUE_NEW = 'some other param value'
    cy.navToSspViewer();
    cy.contains('button', COMPONENT_NAME).click()
    cy.get(`[aria-label="edit-bycomponent-795533ab-9427-4abe-820f-0b571bacfe6d-statement-au-1_smt.a"]`).click()
    cy.getInputByLabel('au-1_prm_1').clear().type(PARAM_VALUE_NEW)
    cy.intercept('GET', '/oscal/v1/system-security-plans/*').as('getSsp')
    cy.get(`[aria-label="save-au-1_smt.a"]`).click({force: true})
    cy.wait('@getSsp')
    // Verify updated value
    cy.contains('button', COMPONENT_NAME).click()
    cy.contains(PARAM_VALUE_NEW).should('be.visible')
  })
})

describe('Test Editing New SSP Impl Req Statement', () => {
  // Store current SSP and reset after test
  let origSspJson
  before(() => {
    cy.getTestSspJson().then(result => origSspJson = result)
  })
  after(() => {
    cy.setTestSspJson(origSspJson)
  })

  it('Successfully Edits New SSP Impl Req Statement', () => {
    const COMPONENT_NAME = 'Logging Server'
    const PARAM_VALUE_NEW = 'some new param value'+
    cy.navToSspViewer();
    cy.contains('button', COMPONENT_NAME).click()
    cy.get(`[aria-label="edit-bycomponent-e00acdcf-911b-437d-a42f-b0b558cc4f03-statement-au-1_smt.a"]`).click()
    cy.getInputByLabel('au-1_prm_1').clear().type(PARAM_VALUE_NEW)
    cy.intercept('GET', '/oscal/v1/system-security-plans/*').as('getSsp')
    cy.get(`[aria-label="save-au-1_smt.a"]`).click({force: true})
    cy.wait('@getSsp')
    // Verify updated value
    cy.contains('button', COMPONENT_NAME).click()
    cy.contains(PARAM_VALUE_NEW).should('be.visible')
  })
})

describe('Test Adding New SSP Impl Req', () => {
  // Store current SSP and reset after test
  let origSspJson
  before(() => {
    cy.getTestSspJson().then(result => origSspJson = result)
  })
  after(() => {
    cy.setTestSspJson(origSspJson)
  })

  it('Successfully Adds New SSP Impl Req', () => {
    const CONTROL_ID = 'AU-2'
    const CONTROL_NAME = 'Audit Events'
    cy.navToSspViewer();
    cy.contains('button', 'Add Control Implementation').click()
    cy.contains('Select Control').click({force: true}).type(CONTROL_ID)
    cy.contains(`${CONTROL_ID} ${CONTROL_NAME}`).click()
    cy.intercept('GET', '/oscal/v1/system-security-plans/*').as('getSsp')
    cy.get(`[aria-label="save-system-security-plan-control-implementation"]`).click()
    cy.wait('@getSsp')
    // Verify updated value
    cy.contains('h2', CONTROL_NAME).should('be.visible')
  })
})