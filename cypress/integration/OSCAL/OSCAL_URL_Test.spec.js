
describe('system-security-plans', () => {
  it('successfully loads ssps ', () => {
    cy.visit('http://localhost:8080') 
    cy.screenshot()
    cy.get('.jss2 > .MuiIconButton-label > .MuiSvgIcon-root').click()
    cy.get('.MuiList-root > :nth-child(2) > .MuiTypography-root').click()
    cy.contains('OSCAL System Security Plan Viewer').should('be.visible')
    cy.get('#oscal-url').should("be.enabled").type('{backspace}').clear()
    cy.get('#oscal-url').type("http://localhost:8080/oscal/v1/ssps/ssp-example")
    cy.screenshot()
    cy.get('.MuiGrid-grid-xs-2 > .MuiButtonBase-root > .MuiButton-label').click()
    cy.contains('Enterprise Logging and Auditing System Security Plan').should('be.visible')
    cy.contains('Parties').should('be.visible')
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiList-root > :nth-child(2)')
    cy.contains('This is a partial implementation that addresses the logging server portion of the auditing system.').should('be.visible')
    cy.contains('Enterprise Logging, Monitoring, and Alerting Policy').should('be.visible')
  })

})

describe('component definitions', () => {
  it('successfully loads components ', () => {
    cy.visit('http://localhost:8080') 
    cy.screenshot()
    cy.get('.jss2 > .MuiIconButton-label > .MuiSvgIcon-root').click()
    cy.get('.MuiList-root > :nth-child(3) > .MuiTypography-root').click()
    cy.contains('OSCAL Component Viewer').should('be.visible')
    cy.get('#oscal-url').should("be.enabled").type('{backspace}').clear()
    cy.get('#oscal-url').type("http://localhost:8080/oscal/v1/components/example-component")
    cy.screenshot()
    cy.get('.MuiGrid-grid-xs-2 > .MuiButtonBase-root > .MuiButton-label').click()
    cy.contains('Test Component Definition').should('be.visible')
    cy.contains('Control Implementations').should('be.visible')
    
  })

})