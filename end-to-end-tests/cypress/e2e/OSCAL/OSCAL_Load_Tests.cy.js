const SSP_TITLE_ORIG = "Enterprise Logging and Auditing System Security Plan";
const COMP_DEF_TITLE_ORIG = "Test Component Definition";
const CATALOG_TITLE =
  "NIST Special Publication 800-53 Revision 4: Security and Privacy Controls for Federal Information Systems and Organizations";

describe("Loading system security plans", () => {
  beforeEach(() => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.waitForLoad();
  });

  it("loads SSPs by REST Mode", () => {
    cy.get(`[aria-label="show code"]`).click();
    cy.scrollTo("bottom");
    cy.contains("This is the control implementation for the system.").should(
      "be.visible"
    );
  });

  it("loads system security plans by URL", () => {
    cy.contains("REST Mode").click();
    cy.contains("OSCAL System Security Plan URL")
      .first()
      .should("exist")
      .next()
      .click()
      .clear()
      .type(
        Cypress.env("base_url") +
          "/oscal/v1/system-security-plans/cff8385f-108e-40a5-8f7a-82f3dc0eaba8"
      );
    cy.contains("Reload").click();
    cy.contains(SSP_TITLE_ORIG).should("be.visible");
    cy.scrollTo("bottom");
    cy.contains("This is the control implementation for the system.").should(
      "be.visible"
    );
  });

  it("displays Enterprise Asset Owners Party", () => {
    cy.contains("Parties").click();
    cy.get(`[aria-label="Enterprise Asset Owners details button"]`).click();
    cy.contains("No address information provided");
    cy.contains("No telephone information provided");
    cy.contains("owners@enterprise.org");
  });

  it("displays Enterprise Asset Administrators Party", () => {
    cy.contains("Parties").click();
    cy.get(
      `[aria-label="Enterprise Asset Administrators details button"]`
    ).click();
    cy.contains("0000 St");
    cy.contains("+18005555555");
    cy.contains("admins@enterprise.org");
    cy.contains("account@email.com");
  });

  it("navigates to the profile/catalog inheritance and grabs hash from anchor link", () => {
    cy.contains("Profiles/Catalog Inheritance").trigger("mouseover");
    cy.get(`[aria-label="profile-catalog-inheritance anchor link"]`).click();
    cy.url().should("include", "#profile-catalog-inheritance");
  });

  it("navigates to the system characteristics network architecture and grabs hash from anchor link", () => {
    cy.contains("Network Architecture").trigger("mouseover");
    cy.get(`[aria-label="network-architecture anchor link"]`).click();
    cy.url().should("include", "#network-architecture");
  });

  it("navigates to a system implementation inventory items and grabs hash from anchor link", () => {
    cy.contains("Inventory Items").trigger("mouseover");
    cy.get(`[aria-label="inventory-items anchor link"]`).click();
    cy.url().should("include", "#inventory-items");
  });

  it("navigates to the control implementation and grabs hash from anchor link", () => {
    cy.contains("Control Implementation").trigger("mouseover");
    cy.get(`[aria-label="control-implementation anchor link"]`).click();
    cy.url().should("include", "#control-implementation");
  });

  it("navigates to a control implementation sub-control (ac-2.5) and grabs hash from anchor link", () => {
    cy.contains("AC-2(5) Inactivity Logout").trigger("mouseover", {
      force: true,
    });
    cy.get(`[aria-label="ac-2.5 anchor link"]`).click();
    cy.url().should("include", "#ac-2.5");
  });
});

describe("Loading Component Definitions", () => {
  beforeEach(() => {
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG);
    cy.waitForLoad();
  });

  it("loads Components by REST Mode", () => {
    cy.contains(COMP_DEF_TITLE_ORIG).should("be.visible");
    cy.contains("Parties").click();
    cy.contains("Test Vendor").should("be.visible");
    cy.scrollTo("bottom");
  });

  it("loads components by URL", () => {
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG);
    cy.contains(COMP_DEF_TITLE_ORIG).should("be.visible");
    cy.contains("Parties").click();
    cy.contains("Test Vendor").should("be.visible");
    cy.scrollTo("bottom");
  });

  it("loads components by URL", () => {
    cy.contains("REST Mode").click();
    cy.contains("OSCAL Component URL")
      .first()
      .should("exist")
      .next()
      .click()
      .clear()
      .type(
        Cypress.env("base_url") +
          "/oscal/v1/component-definitions/8223d65f-57a9-4689-8f06-2a975ae2ad72"
      );
    cy.contains("Reload").click();
    cy.contains(COMP_DEF_TITLE_ORIG).should("be.visible");
    cy.contains("Parties").click();
    cy.contains("Test Vendor").should("be.visible");
    cy.scrollTo("bottom");
  });

  it("loads metadata roles", () => {
    cy.contains("Roles").click();
    cy.contains("Document creator");
    cy.contains("Contact");
  });

  it("loads metadata role details", () => {
    cy.contains("Roles").click();
    cy.get(`[aria-label="Document creator details button"]`).click();
    cy.contains("Creates documents describing the system");
  });

  it("loads metadata locations", () => {
    cy.contains("Locations").click();
    cy.contains("NIST");
    cy.contains("Not Specified");
  });

  it("loads metadata location details", () => {
    cy.contains("Locations").click();
    cy.get(`[aria-label="NIST details button"]`).click();
    cy.contains("100 Bureau Drive");
    cy.contains("Mail Stop 8970");
    cy.contains("Gaithersburg, MD 20899-8970");
    cy.contains("301-975-8616");
    cy.contains("itl_inquiries@nist.gov");
    cy.contains("https://www.nist.gov/");
  });

  it("navigates to parties from hash", () => {
    const urlWithControlFragment =
      "http://localhost:8080/catalog/b954d3b7-d2c7-453b-8eb2-459e8d3b8462#parties";
    cy.visit({
      url: urlWithControlFragment,
      method: "GET",
    });
    cy.waitForLoad();
    cy.contains("Joint Task Force, Transformation Initiative").should(
      "be.visible"
    );
  });

  it("navigates to the control implementation and grabs hash from anchor link", () => {
    cy.contains("Control Implementations").trigger("mouseover");
    cy.get(`[aria-label="control-implementations anchor link"]`).click();
    cy.url().should("include", "#control-implementations");
  });

  it("navigates to a control implementation sub-control (ac-2.3) and grabs hash from anchor link", () => {
    cy.get("h2")
      .contains("AC-2(3) Disable Inactive Accounts")
      .first()
      .trigger("mouseover", { force: true });
    cy.get(`[aria-label="ac-2.3 anchor link"]`).click();
    cy.url().should("include", "#ac-2.3");
  });
});

describe("Errors caused by loading a bad component definition", () => {
  beforeEach(() => {
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG);
    cy.waitForLoad();
    cy.contains("REST Mode").click();
    cy.contains("OSCAL Component URL")
      .first()
      .should("exist")
      .next()
      .click()
      .clear()
      .type(
        "https://raw.githubusercontent.com/usnistgov/oscal-content/main/examples/ssp/json/ssp-example.json"
      );
    cy.contains("Reload").click();
  });

  it('display "yikes" on load of wrong object type', () => {
    cy.contains("Yikes").should("be.visible");
  });

  it("do not persist after loading a valid component in Viewer", () => {
    cy.contains("OSCAL Component URL")
      .first()
      .should("exist")
      .next()
      .click()
      .clear()
      .type(
        "https://raw.githubusercontent.com/EasyDynamics/oscal-demo-content/main/component-definitions/example-component.json"
      );
    cy.contains("Reload").click();
    cy.contains("Test Component Definition").should("be.visible");
  });

  it("do not persist after loading a valid component in Editor", () => {
    cy.contains("REST Mode").click();
    cy.navToCdefEditor(COMP_DEF_TITLE_ORIG);
  });
});

describe("Loading OSCAL Catalog Groups", () => {
  beforeEach(() => {
    cy.navToCatalogEditor(CATALOG_TITLE);
    cy.waitForLoad();
    cy.contains("REST Mode").click();
    cy.contains("OSCAL Catalog URL")
      .first()
      .should("exist")
      .next()
      .click()
      .clear()
      .type(
        "https://raw.githubusercontent.com/EasyDynamics/oscal-demo-content/main/catalogs/NIST_SP-800-53_rev4_catalog.json"
      );
    cy.contains("Reload").click();
    cy.contains("Control Groups").should("be.visible");
  });

  it("navigates to parties section from hash", () => {
    const urlWithControlFragment =
      "http://localhost:8080/catalog/b954d3b7-d2c7-453b-8eb2-459e8d3b8462#parties";
    cy.visit({
      url: urlWithControlFragment,
      method: "GET",
    });
    cy.waitForLoad();
    cy.contains("Joint Task Force, Transformation Initiative").should(
      "be.visible"
    );
  });

  it("navigates to roles from hash", () => {
    const urlWithControlFragment =
      "http://localhost:8080/catalog/b954d3b7-d2c7-453b-8eb2-459e8d3b8462#roles";
    cy.visit({
      url: urlWithControlFragment,
      method: "GET",
    });
    cy.waitForLoad();
    cy.contains("Document creator").should("be.visible");
  });

  it("displays a control (CP-2)", () => {
    cy.get("button").contains("Contingency Planning").click();
    cy.contains("CP-2 Contingency Plan").click();
    cy.contains("The organization:").should("be.visible");
  });

  it("navigates to top-level control (PM-11) from hash", () => {
    const urlWithControlFragment =
      "http://localhost:8080/catalog/b954d3b7-d2c7-453b-8eb2-459e8d3b8462#pm/pm-11";
    cy.visit({
      url: urlWithControlFragment,
      method: "GET",
    });
    cy.waitForLoad();
    cy.contains("The organization:").should("be.visible");
  });

  it("navigates to sub-level control (AU-2.2) from hash", () => {
    const urlWithControlFragment =
      "http://localhost:8080/catalog/b954d3b7-d2c7-453b-8eb2-459e8d3b8462#au/au-2/au-2.2";
    cy.visit({
      url: urlWithControlFragment,
      method: "GET",
    });
    cy.waitForLoad();
    cy.contains("Compilation of Audit Records from Multiple Sources").should(
      "be.visible"
    );
  });

  it("navigates to control (RA-5) and grabs hash from anchor link", () => {
    cy.get("button").contains("Risk Assessment").click();
    cy.contains("Vulnerability Scanning").trigger("mouseover");
    cy.get(`[aria-label="ra/ra-5 anchor link"]`).click();
    cy.url().should("include", "#ra/ra-5");
  });

  it("navigates to a backmatter resource (CNSS Policy 15) and grabs hash from anchor link", () => {
    cy.contains("CNSS Policy 15").trigger("mouseover");
    cy.get(
      `[aria-label="a4aa9645-9a8a-4b51-90a9-e223250f9a75 anchor link"]`
    ).click();
    cy.url().should("include", "#a4aa9645-9a8a-4b51-90a9-e223250f9a75");
  });
});
