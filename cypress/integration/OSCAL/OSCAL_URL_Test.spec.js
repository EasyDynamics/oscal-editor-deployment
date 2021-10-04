describe('system-security-plans', () => {
  it('successfully loads ssps ', () => {
    cy.visit('http://localhost:8080') 
    cy.findByText('OSCAL Catalog Viewer').should('exist')
    cy.get('button').first().click()
    cy.contains('System Security Plan Viewer').click()
    cy.findByText('OSCAL System Security Plan Viewer').should('be.visible')
    cy.contains('OSCAL SSP URL').first().should('exist').next().click().clear().type("http://localhost:8080/oscal/v1/ssps/ssp-example")
    cy.contains('Reload').click()
    cy.contains('Enterprise Logging and Auditing System Security Plan').should('be.visible')
    cy.scrollTo('bottom')
    cy.contains('This is the control implementation for the system.').should('be.visible')


  })
})
    

describe('component definitions', () => {
    it('successfully loads components ', () => {
      cy.visit('http://localhost:8080') 
      cy.findByText('OSCAL Catalog Viewer').should('exist')
      cy.get('button').first().click()
      cy.contains('Component Viewer').click()
      cy.contains('OSCAL Component Viewer').should('be.visible')
      cy.contains('Test Component Definition').should('be.visible')
      cy.contains('OSCAL Component URL').first().should('exist').next().click().clear().type("http://localhost:8080/oscal/v1/components/example-component")
      cy.contains('Reload').click()
      cy.contains('Test Vendor').should('be.visible')
      cy.scrollTo('bottom')

  })

})

