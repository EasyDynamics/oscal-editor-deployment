const NAVIGATION = [
  {
    editor: "Catalog",
    title:
      "NIST Special Publication 800-53 Revision 5: Security and Privacy Controls for Federal Information Systems and Organizations",
    relativeURL: "/catalog/613fca2d-704a-42e7-8e2b-b206fb92b456",
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
describe("Test navigation by URLs route to", () => {
  it("each of the editors pages", () => {
    cy.wrap(NAVIGATION).each((element) => {
      cy.visit(`${Cypress.env("base_url")}${element.relativeURL}`);
      cy.contains(element.title);
    });
  });
});
