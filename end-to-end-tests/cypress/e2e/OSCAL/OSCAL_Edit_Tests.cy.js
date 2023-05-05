const SSP_TITLE_ORIG = "Enterprise Logging and Auditing System Security Plan";

describe("Editing the system security plan title", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  after(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("edits the system security plan title", () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("Another SSP");
    cy.get(`[aria-label="save-system-security-plan-metadata-title"]`).click();
    cy.contains("Another SSP").should("be.visible");
  });
});

describe("Editing the System Security Plan Source", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  after(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("edits the system security plan source", () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    const findKeystroke = Cypress.platform === "darwin" ? "{meta}f" : "{ctrl}f";
    cy.get(".editor-scrollable")
      .type(findKeystroke)
      .focused()
      .type("Enterprise Logging and Auditing System Security Plan", { force: true })
      .type("{esc}", { force: true })
      .focused()
      .type("Even Better SSP", { force: true });
    cy.contains("Save").click();
    cy.contains("Even Better SSP").should("be.visible");
  });
});

describe("Editing the existing system security plan impl req statement", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  after(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("edits the system security plan title", () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("Another SSP");
    cy.get(`[aria-label="save-system-security-plan-metadata-title"]`).click();
    cy.contains("Another SSP").should("be.visible");
  });
});

describe("Editing the existing system security plan impl req statement", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  after(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("edits existing system security plan impl req statement", () => {
    const COMPONENT_NAME = "Enterprise Logging, Monitoring, and Alerting Policy";
    const PARAM_VALUE_NEW = "some other param value";
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.contains("button", COMPONENT_NAME).click();
    cy.get(
      `[aria-label="edit-bycomponent-795533ab-9427-4abe-820f-0b571bacfe6d-statement-au-1_smt.a"]`
    ).click();
    cy.getInputByLabel("au-1_prm_1").clear().type(PARAM_VALUE_NEW);
    cy.intercept("GET", "/oscal/v1/system-security-plans/*").as("getSsp");
    cy.get(`[aria-label="save-au-1_smt.a"]`).click({ force: true });
    cy.wait("@getSsp");
    // Verify updated value
    cy.contains("button", COMPONENT_NAME).click();
    cy.contains(PARAM_VALUE_NEW).should("be.visible");
  });
});

describe("Editing the new system security plan impl req statement", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  after(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("edits new system security plan impl req statement", () => {
    const COMPONENT_NAME = "Logging Server";
    const PARAM_VALUE_NEW = "some new param value" + cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.contains("button", COMPONENT_NAME).click();
    cy.get(
      `[aria-label="edit-bycomponent-e00acdcf-911b-437d-a42f-b0b558cc4f03-statement-au-1_smt.a"]`
    ).click();
    cy.getInputByLabel("au-1_prm_1").clear().type(PARAM_VALUE_NEW);
    cy.intercept("GET", "/oscal/v1/system-security-plans/*").as("getSsp");
    cy.get(`[aria-label="save-au-1_smt.a"]`).click({ force: true });
    cy.wait("@getSsp");
    // Verify updated value
    cy.contains("button", COMPONENT_NAME).click();
    cy.contains(PARAM_VALUE_NEW).should("be.visible");
  });
});

describe("Adding new system security plan impl req", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  after(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("adds new system security plan impl req", () => {
    const CONTROL_ID = "AU-2";
    const CONTROL_NAME = "Audit Events";
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.contains("button", "Add Control Implementation").click();
    cy.contains("Select Control").click({ force: true }).type(CONTROL_ID);
    cy.contains(`${CONTROL_ID} ${CONTROL_NAME}`).click();
    cy.intercept("GET", "/oscal/v1/system-security-plans/*").as("getSsp");
    cy.get(`[aria-label="save-system-security-plan-control-implementation"]`).click();
    cy.wait("@getSsp");
    // Verify updated value
    cy.contains("h2", CONTROL_NAME).should("be.visible");
  });
});

describe("Test 'Enter' Key Keypress in Textfields will", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  afterEach(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("Save All Changes Made to Edited Textfield", () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("A Different SSP{enter}");
    cy.contains("A Different SSP").should("be.visible");
  });

  it("Preserve Textfield Value if its the Only Key Pressed", () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("{enter}");
    cy.contains(SSP_TITLE_ORIG);
  });
});

describe("Test 'ESC' Key Keypress in Textfields will", () => {
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  afterEach(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("Cancel Edit State and Revert Any Changes to Previous Value", () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();

    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("My new title {esc}");
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .should("have.value", SSP_TITLE_ORIG);
  });
  it("Cancel Edit State if its the Only Key Pressed", () => {
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();

    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .clear()
      .type("{esc}");
    cy.get(`[aria-label="edit-system-security-plan-metadata-title"]`).click();
    cy.get(`[data-testid="textField-system-security-plan-metadata-title"]`)
      .click()
      .should("have.value", SSP_TITLE_ORIG);
  });
});

describe("Editing ac-2.2_smt from the Enterprise Logging and Auditing System Security Plan", () => {
  // Store current SSP and reset after test
  let origSspJson;
  before(() => {
    cy.getTestSspJson().then((result) => (origSspJson = result));
  });
  after(() => {
    cy.setTestSspJson(origSspJson);
  });

  it("displays new parameter", () => {
    const PARAM_VALUE_NEW = "some new param value";
    cy.navToSspEditor(SSP_TITLE_ORIG);
    cy.waitForLoad();
    cy.get('[aria-label*="ac-2.2_smt"]').click();
    cy.getInputByLabel("ac-2.2_prm_1").clear().type(PARAM_VALUE_NEW);
    cy.intercept("GET", "/oscal/v1/system-security-plans/*").as("getSsp");
    cy.get(`[aria-label="save-ac-2.2_smt"]`).click({ force: true });
    cy.wait("@getSsp");
    // Verify updated value
    cy.contains(PARAM_VALUE_NEW).should("be.visible");
  });
});
