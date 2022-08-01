const SSP_NAVIGATION = "Enterprise Logging and Auditing System Security Plan";
const CATALOG_NAVIGATION =
  "Electronic Version of NIST SP 800-53 Rev 5 Controls and SP 800-53A Rev 5 Assessment Procedures";
const COMPONENT_NAVIGATION = "Test Component Definition";
const PROFILE_NAVIGATION_V4 =
  "NIST Special Publication 800-53 Revision 4 MODERATE IMPACT BASELINE";
const PROFILE_NAVIGATION_V5 =
  "NIST Special Publication 800-53 Revision 5 MODERATE IMPACT BASELINE";
const MONGODB_NAVIGATION = "MongoDB Component Definition Example";

describe("The Editor", () => {
  it("loads catalog editor", () => {
    cy.navToCatalogEditor(CATALOG_NAVIGATION);
    cy.waitForLoad();
    cy.contains(CATALOG_NAVIGATION);
  });

  it("loads MongoDB component editor", () => {
    cy.navToCdefEditor(MONGODB_NAVIGATION);
    cy.waitForLoad();
    cy.contains(MONGODB_NAVIGATION);
  });

  it("loads test component editor", () => {
    cy.navToCdefEditor(COMPONENT_NAVIGATION);    
    cy.waitForLoad();
    cy.contains(COMPONENT_NAVIGATION);
  });

  it("loads v4 profile editor", () => {
    cy.navToProfileEditor(PROFILE_NAVIGATION_V4);    
    cy.waitForLoad();
    cy.contains(PROFILE_NAVIGATION_V4);
  });

  it("loads v5 profile editor", () => {
    cy.navToProfileEditor(PROFILE_NAVIGATION_V5);    
    cy.waitForLoad();
    cy.contains(PROFILE_NAVIGATION_V5);
  });

  it("loads system security plan editor", () => {
    cy.navToSspEditor(SSP_NAVIGATION);
    cy.waitForLoad();
    cy.contains(SSP_NAVIGATION);
  });

  it("loads after navigating multiple documents", () => {
    cy.navToCdefEditor(MONGODB_NAVIGATION);
    cy.navToSspEditor(SSP_NAVIGATION);
    cy.navToProfileEditor(PROFILE_NAVIGATION_V4);
    cy.navToCatalogEditor(CATALOG_NAVIGATION);
    cy.navToCdefEditor(MONGODB_NAVIGATION);
    cy.navToCdefEditor(COMPONENT_NAVIGATION);
    cy.navToProfileEditor(PROFILE_NAVIGATION_V5);
    cy.waitForLoad();
    cy.contains(PROFILE_NAVIGATION_V5);
  });
});

describe("The Viewer", () => {
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  afterEach(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("loads a catalog", () => {
    cy.navToCatalogEditor(CATALOG_NAVIGATION);
    cy.waitForLoad();
    cy.contains("REST Mode").click();
    cy.contains("Catalog");
    cy.contains(CATALOG_NAVIGATION);
  });

  it("loads the v4 profile", () => {
    cy.navToProfileEditor(PROFILE_NAVIGATION_V4);
    cy.waitForLoad();
    cy.contains("REST Mode").click();
    cy.contains("Profile");
    cy.contains(PROFILE_NAVIGATION_V4);
  });

  it("loads the v5 profile", () => {
    cy.navToProfileEditor(PROFILE_NAVIGATION_V5);
    cy.waitForLoad();
    cy.contains("REST Mode").click();
    cy.contains("Profile");
    cy.contains(PROFILE_NAVIGATION_V5);
  });

  it("loads a component", () => {
    cy.navToCdefEditor(COMPONENT_NAVIGATION);
    cy.waitForLoad();
    cy.contains("REST Mode").click();
    cy.contains("Component");
    cy.contains(COMPONENT_NAVIGATION);
  });

  it("loads a system security plan", () => {
    cy.navToSspEditor(SSP_NAVIGATION);
    cy.waitForLoad();
    cy.contains("REST Mode").click();
    cy.contains("System Security Plan");
    cy.contains(SSP_NAVIGATION);
  });
});
