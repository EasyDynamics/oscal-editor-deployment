/*catalog Editor
Profile Editor
Component Editor
System Security Plan Editor */
const SSP_TITLE_ORIG = "Enterprise Logging and Auditing System Security Plan";
const COMP_DEF_TITLE_ORIG = "Test Component Definition";

describe("Test can navigate to Drawer Components", () => {
  it("Successfully Loads each Drawer Component", () => {
    cy.navToTestSspRestMode(SSP_TITLE_ORIG);

    cy.navToProfileViewer();
    cy.navToCdefViewer();
    cy.navToCatalogViewer();
    cy.navToSspViewer();
  });
});
