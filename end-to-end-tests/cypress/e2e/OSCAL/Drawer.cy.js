/*catalog Editor
Profile Editor
Component Editor
System Security Plan Editor */
const SSP_NAVIGATION = "Enterprise Logging and Auditing System Security Plan";
const CATALOG_NAVIGATION =
  "NIST Special Publication 800-53 Revision 5: Security and Privacy Controls for Federal Information Systems and Organizations";
const COMPONENT_NAVIGATION = "Test Component Definition";
const PROFILE_NAVIGATION_V4 =
  "NIST Special Publication 800-53 Revision 4 MODERATE IMPACT BASELINE";
const PROFILE_NAVIGATION_V5 =
  "NIST Special Publication 800-53 Revision 5 MODERATE IMPACT BASELINE";
const MONGODB_NAVIGATION = "MongoDB Component Definition Example";

describe("Test can navigate to Drawer Components", () => {
  it("Successfully Loads Catalog Viewer", () => {
    cy.navToCatalogViewer(CATALOG_NAVIGATION);
  });

  it("Successfully Loads Component Viewer", () => {
    cy.navToCdefViewer(MONGODB_NAVIGATION);
    cy.navToCdefViewer(COMPONENT_NAVIGATION);
  });

  it("Successfully Loads Profile Component", () => {
    cy.navToProfileViewer(PROFILE_NAVIGATION_V4);
    cy.navToProfileViewer(PROFILE_NAVIGATION_V5);
  });

  it("Successfully Loads SSP Viewer", () => {
    cy.navToSspViewer(SSP_NAVIGATION);
  });

  it("Successfully Navigates Viewers in Random Order", () => {
    cy.navToCdefViewer(MONGODB_NAVIGATION);
    cy.navToSspViewer(SSP_NAVIGATION);
    cy.navToProfileViewer(PROFILE_NAVIGATION_V4);
    cy.navToCdefViewer(MONGODB_NAVIGATION);
    cy.navToCatalogViewer(CATALOG_NAVIGATION);
    cy.navToCdefViewer(COMPONENT_NAVIGATION);
    cy.navToProfileViewer(PROFILE_NAVIGATION_V5);
  });
});

describe("Test can navigate with REST mode off", () => {
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  afterEach(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("Successfully Loads Catalog in non REST", () => {
    cy.navToCatalogViewer(CATALOG_NAVIGATION);
    cy.contains("REST Mode").click();
    cy.contains("Catalog");
    cy.contains(CATALOG_NAVIGATION);
  });

  it("Successfully Loads Profile Version 4 in non REST", () => {
    cy.navToProfileViewer(PROFILE_NAVIGATION_V4);
    cy.contains("REST Mode").click();
    cy.contains("Profile");
    cy.contains(PROFILE_NAVIGATION_V4);
  });

  it("Successfully Loads Profile Version 5 in non REST", () => {
    cy.navToProfileViewer(PROFILE_NAVIGATION_V5);
    cy.contains("REST Mode").click();
    cy.contains("Profile");
    cy.contains(PROFILE_NAVIGATION_V4);
  });

  it("Successfully Loads Test Component in non REST", () => {
    cy.navToCdefViewer(COMPONENT_NAVIGATION);
    cy.contains("REST Mode").click();
    cy.contains("Component");
    cy.contains(COMPONENT_NAVIGATION);
  });

  it("Successfully Loads SSP in non REST", () => {
    cy.navToSspViewer(SSP_NAVIGATION);
    cy.contains("REST Mode").click();
    cy.contains("System Security Plan");
    cy.contains(SSP_NAVIGATION);
  });
});
