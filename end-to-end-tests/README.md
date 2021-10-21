# Running End to End Tests

## Steps for Running Cypress Tests
1. To run the Cypress tests, you first need to have the create and run the Docker container. To create the container, navigate to
the `/all-in-one` directory and run `docker build --tag <container-name> .`.
2. Once the container is created, run it using `docker run -p 8080:8080 -v $(pwd)/oscal-content:/app/oscal-content easygrc`. If your
path to the repository contains spaces or any special characters, run the following command:</br>
&emsp;`docker run -p 8080:8080 -v "$(pwd)"/oscal-content:/app/oscal-content easygrc`. Note the quotes around the `$(pwd)`.
3. Navigate to the `/end-to-end-tests` directory and run `npm install`
4. If Cypress has not been installed yet, run `npm install cypress --save-dev`. This [installs Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress#npm-install) as a devDependency for the project.
5. Run `npx cypress open` to run the tests. A window showing all Cypress tests will open. To run all tests, click the <i>Run integration spec</i> button. To
run a specific test file, click on that file in the window.
6. If you make changes to a test file, the tests will run again after the changes are saved.
7. To create a new Cypress test file, create a `.spec.js` file in the `cypress/integration/OSCAL` directory.