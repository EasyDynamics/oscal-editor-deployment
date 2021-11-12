# End to End Tests

The following tests are testing a Docker deployment of an OSCAL Viewer interface calling a backend REST service. The Cypress
tests check that everything appears on the screen as expected when making REST calls to files representing the various OSCAL objects.

## Steps for Running Cypress Tests
[Cypress](https://www.cypress.io/) is an end-to-end testing suite for running automated tests, in a browser, of web applications.

1. To run the Cypress tests, you first need to have the create and run the Docker container. Directions for doing so can be
   found [here](../all-in-one/README.md). Following these instructions will have the container run in the background, used by
   Cypress to run the tests.
2. Navigate to the `/end-to-end-tests` directory and run `npm install`
3. If Cypress has not been installed yet, run `npm install cypress --save-dev`. This [installs Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress#npm-install) as a devDependency for the project.
4. Run `npx cypress open` to run the tests. A window showing all Cypress tests will open. To run all tests, click the <i>Run integration spec</i> button. To
run a specific test file, click on that file in the window.
5. If you make changes to a test file, the tests will run again after the changes are saved.
6. To create a new Cypress test file, create a `.spec.js` file in the `cypress/integration/OSCAL` directory.

## Example OSCAL Content

The tests depend on running the Docker container with an `oscal-content` directory mounted that contains example OSCAL files from NIST's [OSCAL content repo.](https://github.com/usnistgov/oscal-content)

A script is provided to download these files and set up the directory: [get-oscal-content.sh](../all-in-one/get-oscal-content.sh)

More information on the OSCAL content directory can be found in the [all-in-one directory.](../all-in-one)

For convenience, you can also copy the script here:

```
#!/bin/bash

parent=oscal-content
catalogs=$parent/catalogs
components=$parent/component-definitions
profiles=$parent/profiles
ssps=$parent/system-security-plans

#Create the oscal-content directories, if they don't already exist
mkdir -p $parent $catalogs $components $profiles $ssps

#Getting the example catalog json file, renaming it, and placing it in the catalogs directory
curl https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/catalog/json/basic-catalog.json > $catalogs/temp.json
name=$(cat $catalogs/temp.json | jq --raw-output '."catalog"' \
 | jq --raw-output '."uuid"')
mv $catalogs/temp.json $catalogs/$name.json

#Getting the example component definition json file, renaming it, and placing it in the component-definitions directory
curl https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/component-definition/json/example-component.json > $components/temp.json
name=$(cat $components/temp.json | jq --raw-output '."component-definition"' \
 | jq --raw-output '."uuid"')
mv $components/temp.json $components/$name.json

#Getting the example profile json file, renaming it, and placing it in the profiles directory
curl https://raw.githubusercontent.com/usnistgov/oscal-content/master/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_LOW-baseline_profile.json > $profiles/temp.json
name=$(cat $profiles/temp.json | jq --raw-output '."profile"' \
 | jq --raw-output '."uuid"')
mv $profiles/temp.json $profiles/$name.json

#Getting the example SSP json file, renaming it, and placing it in the SSPs directory
curl https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/ssp/json/ssp-example.json > $ssps/temp.json
name=$(cat $ssps/temp.json | jq --raw-output '."system-security-plan"' \
 | jq --raw-output '."uuid"')
mv $ssps/temp.json $ssps/$name.json
```
