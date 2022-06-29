const SSP_TITLE_ORIG = "Enterprise Logging and Auditing System Security Plan";
const COMP_DEF_TITLE_ORIG = "Test Component Definition";

describe("Test Editing Title Using Enter key", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  afterEach(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("Successfully Edits Title with Enter", () => {
    cy.navToTestSspRestMode(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("Another SSP{enter}");
    cy.contains("Another SSP").should("be.visible");
  });

  it("Successfully keeps title on Enter press", () => {
    cy.navToTestSspRestMode(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .trigger('keydown',{
        key: 'Enter'
    })
    cy.contains(SSP_TITLE_ORIG).should("be.visible");
  });
});

describe("Cancel on ESC Keypress", () => {
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  afterEach(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("Successfully cancels any changes on ESC keypress", () => {
    cy.navToTestSspRestMode(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("{moveToEnd}{esc}");
    cy.contains(SSP_TITLE_ORIG).should("be.visible");
  });
  it("ESC key cancels textfield edit action", () => {
    cy.navToTestSspRestMode(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("Another SSP{esc}",{parseSpecialCharSequences:true});
    cy.contains(SSP_TITLE_ORIG).should("be.visible");
  });
});
