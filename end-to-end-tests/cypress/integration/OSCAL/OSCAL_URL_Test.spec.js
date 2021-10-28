describe('system-security-plans', () => {
  it('successfully loads ssps ', () => {
    cy.visit(Cypress.env('base_url')) 
    cy.findByText('OSCAL Catalog Viewer').should('exist')
    cy.get('button').first().click()
    cy.contains('System Security Plan Viewer').click()
    cy.findByText('OSCAL System Security Plan Viewer').should('be.visible')
    cy.contains('OSCAL SSP URL').first().should('exist').next().click().clear().type(Cypress.env('base_url') + "/oscal/v1/ssps/cff8385f-108e-40a5-8f7a-82f3dc0eaba8")
    cy.contains('Reload').click()
    cy.contains('Enterprise Logging and Auditing System Security Plan').should('be.visible')
    cy.scrollTo('bottom')
    cy.contains('This is the control implementation for the system.').should('be.visible')
  })
})
    
describe('component definitions', () => {
    it('successfully loads components ', () => {
      cy.visit(Cypress.env('base_url')) 
      cy.findByText('OSCAL Catalog Viewer').should('exist')
      cy.get('button').first().click()
      cy.contains('Component Viewer').click()
      cy.contains('OSCAL Component Viewer').should('be.visible')
      cy.contains('Test Component Definition').should('be.visible')
      cy.contains('OSCAL Component URL').first().should('exist').next().click().clear().type(Cypress.env('base_url') + "/oscal/v1/component-definitions/8223d65f-57a9-4689-8f06-2a975ae2ad72")
      cy.contains('Reload').click()
      cy.contains('Test Vendor').should('be.visible')
      cy.scrollTo('bottom')
  })
})
