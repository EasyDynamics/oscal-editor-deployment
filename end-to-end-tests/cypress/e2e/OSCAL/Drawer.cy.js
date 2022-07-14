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
  it("Successfully Loads Catalog Editor", () => {
    cy.navToCatalogEditor(CATALOG_NAVIGATION);
  });

  it("Successfully Loads Component Editor", () => {
    cy.navToCdefEditor(MONGODB_NAVIGATION);
    cy.navToCdefEditor(COMPONENT_NAVIGATION);
  });

  it("Successfully Loads Profile Component", () => {
    cy.navToProfileEditor(PROFILE_NAVIGATION_V4);
    cy.navToProfileEditor(PROFILE_NAVIGATION_V5);
  });

  it("Successfully Loads SSP Editor", () => {
    cy.navToSspEditor(SSP_NAVIGATION);
  });

  it("Successfully Navigates Editors in Random Order", () => {
    cy.navToCdefEditor(MONGODB_NAVIGATION);
    cy.navToSspEditor(SSP_NAVIGATION);
    cy.navToProfileEditor(PROFILE_NAVIGATION_V4);
    cy.navToCatalogEditor(CATALOG_NAVIGATION);
    cy.navToCdefEditor(MONGODB_NAVIGATION);
    cy.navToCdefEditor(COMPONENT_NAVIGATION);
    cy.navToProfileEditor(PROFILE_NAVIGATION_V5);
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
    cy.navToCatalogEditor(CATALOG_NAVIGATION);
    cy.contains("REST Mode").click();
    cy.contains("Catalog");
    cy.contains(CATALOG_NAVIGATION);
  });

  it("Successfully Loads Profile Version 4 in non REST", () => {
    cy.navToProfileEditor(PROFILE_NAVIGATION_V4);
    cy.contains("REST Mode").click();
    cy.contains("Profile");
    cy.contains(PROFILE_NAVIGATION_V4);
  });

  it("Successfully Loads Profile Version 5 in non REST", () => {
    cy.navToProfileEditor(PROFILE_NAVIGATION_V5);
    cy.contains("REST Mode").click();
    cy.contains("Profile");
    cy.contains(PROFILE_NAVIGATION_V4);
  });

  it("Successfully Loads Test Component Definiition in non REST", () => {
    cy.navToCdefEditor(COMPONENT_NAVIGATION);
    cy.contains("REST Mode").click();
    cy.contains("Component");
    cy.contains(COMPONENT_NAVIGATION);
  });

  it("Successfully Loads MongoDB Editor in non REST", () => {
    cy.navToCdefEditor(COMPONENT_NAVIGATION);
    cy.contains("REST Mode").click();
    cy.contains("Component");
    cy.contains(COMPONENT_NAVIGATION);
  });

  it("Successfully Loads SSP in non REST", () => {
    cy.navToSspEditor(SSP_NAVIGATION);
    cy.contains("REST Mode").click();
    cy.contains("System Security Plan");
    cy.contains(SSP_NAVIGATION);
  });
});
