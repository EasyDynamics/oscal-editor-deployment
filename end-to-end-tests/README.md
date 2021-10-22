# Running End to End Tests

## Steps for Running Cypress Tests
1. To run the Cypress tests, you first need to have the create and run the Docker container. Directions for doing so can be
   found [here](../all-in-one/README.md). Following these instructions will have the container run in the background, used by
   Cypress to run the tests.
2. Navigate to the `/end-to-end-tests` directory and run `npm install`
3. If Cypress has not been installed yet, run `npm install cypress --save-dev`. This [installs Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress#npm-install) as a devDependency for the project.
4. Run `npx cypress open` to run the tests. A window showing all Cypress tests will open. To run all tests, click the <i>Run integration spec</i> button. To
run a specific test file, click on that file in the window.
5. If you make changes to a test file, the tests will run again after the changes are saved.
6. To create a new Cypress test file, create a `.spec.js` file in the `cypress/integration/OSCAL` directory.