# Overview

Various deployments of the OSCAL Editor including a Docker Image
for easy local editing of OSCAL files in JSON format.

![OSCAL Editor Screenshot](/docs/resources/oscal-editor.png)

To get started, simply pull the Docker image and run it, pointing to a directory of OSCAL content in JSON format:
```
docker pull ghcr.io/easydynamics/oscal-editor-all-in-one
docker run -p 8080:8080 -v "$(pwd)"/oscal-content:/app/oscal-content ghcr.io/easydynamics/oscal-editor-all-in-one
```
See the [all-In-one deployment](all-in-one) documentation for more details.

## All-In-One

The [All-In-One Deployment](all-in-one) provides a simple Docker deployment of both
the back-end services and web-based user interface for the OSCAL Editor.

## End to End Tests

The [End to End tests](end-to-end-tests) test the integration between the OSCAL Viewer
application and a back-end rest service using Cypress.

## Contributing

For the process of Contributing to the project, please review
[CONTRIBUTING.md](https://github.com/EasyDynamics/.github/CONTRIBUTING.md)
and adhere to the
[Code of Conduct](https://github.com/EasyDynamics/.github/CODE_OF_CONDUCT.md).

## Licensing

For information on the project's license, please review the [LICENSE](/LICENSE) file.
