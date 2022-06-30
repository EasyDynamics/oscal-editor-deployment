/*catalog Editor
Profile Editor
Component Editor
System Security Plan Editor */
const SSP_TITLE_ORIG = "Enterprise Logging and Auditing System Security Plan";
const COMP_DEF_TITLE_ORIG = "Test Component Definition";

describe("Test can navigate to Drawer Components", () => {
  // it("Successfully Loads Catalog Viewer", () => {
  //       cy.navToProfileViewer();

  //   cy.navToCatalogViewer();
  // });
  
  // it("Successfully Loads Profile Component", () => {
  //   cy.navToProfileViewer();
  // });
  
  // it("Successfully Loads Component Viewer", () => {
  //   cy.navToCdefViewer();
  // });
  
  it("Successfully Loads SSP Viewer", () => {
    cy.navToSspViewer();
  });
});
