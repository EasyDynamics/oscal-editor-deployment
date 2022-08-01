const NAVIGATION = [
  {
    editor: "Catalog Revision 4",
    title:
      "NIST Special Publication 800-53 Revision 4: Security and Privacy Controls for Federal Information Systems and Organizations",
    relativeURL: "/catalog/b954d3b7-d2c7-453b-8eb2-459e8d3b8462",
  },
  {
    editor: "Catalog Revision 5",
    title:
      "Electronic Version of NIST SP 800-53 Rev 5 Controls and SP 800-53A Rev 5 Assessment Procedures",
    relativeURL: "/catalog/1da16966-2d5b-4e8a-9056-0fe09d35412b",
  },
  {
    editor: "MongoDB",
    title: "MongoDB Component Definition Example",
    relativeURL: "/component-definition/a7ba800c-a432-44cd-9075-0862cd66da6b",
  },
  {
    editor: "Test Component",
    title: "Test Component Definition",
    relativeURL: "/component-definition/8223d65f-57a9-4689-8f06-2a975ae2ad72",
  },
  {
    editor: "Profile V4",
    title:
      "NIST Special Publication 800-53 Revision 4 MODERATE IMPACT BASELINE",

    relativeURL: "/profile/8b3beca1-fcdc-43e0-aebb-ffc0a080c486",
  },
  {
    editor: "Profile V5",
    title:
      "NIST Special Publication 800-53 Revision 5 MODERATE IMPACT BASELINE",
    relativeURL: "/profile/1019f424-1556-4aa3-9df3-337b97c2c856",
  },
  {
    editor: "System Security Plan",
    title: "Enterprise Logging and Auditing System Security Plan",
    relativeURL: "/system-security-plan/cff8385f-108e-40a5-8f7a-82f3dc0eaba8",
  },
];
describe("Test that the ", () => {
  it.each(NAVIGATION)(`%s loads by url`, (editor, title, relativeURL) => {
    cy.visit(`${Cypress.env("base_url")}${relativeURL}`);
    cy.waitForLoad();
    cy.contains(`${title}`);
  });
});
