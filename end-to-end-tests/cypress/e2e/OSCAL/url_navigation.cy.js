const CATALOG_NAVIGATION =
  "NIST Special Publication 800-53 Revision 5: Security and Privacy Controls for Federal Information Systems and Organizations";
const CATALOG_URL_NAV =
  "http://localhost:8080/catalog/613fca2d-704a-42e7-8e2b-b206fb92b456";

const MONGODB_NAVIGATION = "MongoDB Component Definition Example";
const MONGODB_URL_NAV =
  "http://localhost:8080/component-definition/a7ba800c-a432-44cd-9075-0862cd66da6b";

const COMPONENT_NAVIGATION = "Test Component Definition";
const COMPONENT_URL_NAV =
  "http://localhost:8080/component-definition/8223d65f-57a9-4689-8f06-2a975ae2ad72";

const PROFILE_NAVIGATION_V4 =
  "NIST Special Publication 800-53 Revision 4 MODERATE IMPACT BASELINE";
const PROFILE_V4_URL =
  "http://localhost:8080/profile/8b3beca1-fcdc-43e0-aebb-ffc0a080c486";

const PROFILE_NAVIGATION_V5 =
  "NIST Special Publication 800-53 Revision 5 MODERATE IMPACT BASELINE";
const PROFILE_V5_URL =
  "http://localhost:8080/profile/1019f424-1556-4aa3-9df3-337b97c2c856";

const SSP_NAVIGATION = "Enterprise Logging and Auditing System Security Plan";
const SSP_URL_NAV =
  "http://localhost:8080/system-security-plan/cff8385f-108e-40a5-8f7a-82f3dc0eaba8";

describe("The use URLs to navigate", () => {
  describe(" from SSP Editor to", () => {
    before(() => {
      cy.navToSspEditor(SSP_NAVIGATION);
    });
    afterEach(() => {
      cy.navToSspEditor(SSP_NAVIGATION);
      cy.contains(SSP_NAVIGATION);
    });
    it("Catalog Viewer", () => {
      cy.visit(CATALOG_URL_NAV);
      cy.contains(CATALOG_NAVIGATION);
    });
    it("MongoDB Component Viewer", () => {
      cy.visit(MONGODB_URL_NAV);
      cy.contains(MONGODB_NAVIGATION);
    });
    it("Profile Version 4 Viewer", () => {
      cy.visit(PROFILE_V4_URL);
      cy.contains(PROFILE_NAVIGATION_V4);
    });
    it("MongoDB Component Viewer", () => {
      cy.visit(PROFILE_V5_URL);
      cy.contains(PROFILE_NAVIGATION_V5);
    });
  });
  it("from Catalog to SSP", () => {
    cy.navToCatalogEditor(CATALOG_NAVIGATION);
    cy.visit(SSP_URL_NAV);
    cy.contains(SSP_NAVIGATION);
  });

});

it("Navigates to Editors by URLs in Random order", () => {
    cy.navToSspEditor(SSP_NAVIGATION);

    cy.visit(SSP_URL_NAV);
    cy.contains(SSP_NAVIGATION);
    
    cy.visit(PROFILE_V5_URL);
    cy.contains(PROFILE_NAVIGATION_V5);

    cy.visit(PROFILE_V4_URL);
    cy.contains(PROFILE_NAVIGATION_V4);

    cy.visit(MONGODB_URL_NAV);
    cy.contains(MONGODB_NAVIGATION);

    cy.visit(CATALOG_URL_NAV);
    cy.contains(CATALOG_NAVIGATION);

    cy.visit(PROFILE_V4_URL);
    cy.contains(PROFILE_NAVIGATION_V4);

    cy.visit(SSP_URL_NAV);
    cy.contains(SSP_NAVIGATION);

    cy.visit(PROFILE_V5_URL);
    cy.contains(PROFILE_NAVIGATION_V5);

    cy.visit(MONGODB_URL_NAV);
    cy.contains(MONGODB_NAVIGATION);

    cy.visit(CATALOG_URL_NAV);
    cy.contains(CATALOG_NAVIGATION);

  });