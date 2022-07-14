# All-in-One Deployment

Simple Docker deployment of the back-end services and web-based user interface for the the Open Security Controls Assessment Language (OSCAL) Editor.

## Pulling the Image

The Docker image is hosted on [Docker Hub](https://hub.docker.com/r/easydynamics/oscal-editor-all-in-one) and the [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

You can pull the image by running:

```
docker pull ghcr.io/easydynamics/oscal-editor-all-in-one
```

Note that you may need to authenticate first using `docker login`.

## OSCAL Content Directory

To view your local OSCAL files with the OSCAL Viewer, an `oscal-content` directory must be set up so it can be mounted in the container.
By default, the REST Service will look for a directory with the following structure:

```
oscal-content/
├── catalogs
├── component-definitions
├── profiles
└── system-security-plans
```

Each of the four sub-directories should contain the **JSON** OSCAL files of their respective schemas. There are tools available to convert other OSCAL formats to JSON such as [NIST's XSL converters](https://github.com/usnistgov/OSCAL/tree/main/json/convert).

Example OSCAL content can be downloaded from [Easy Dynamics' demo OSCAL content repo](https://github.com/EasyDynamics/oscal-demo-content). To clone the content, run:

```
git clone https://github.com/EasyDynamics/oscal-demo-content oscal-content
```

## Running

To run the docker image, run `docker run` with the `-p` flag specifying the port to map and the `-v` flag specifying the path of the OSCAL content directory.

Example:

```
docker run -p 8080:8080 -v "$(pwd)"/oscal-content:/app/oscal-content ghcr.io/easydynamics/oscal-editor-all-in-one
```

The container will run both the OSCAL Viewer and REST Service on startup. The OSCAL Viewer is available at the port specified in the run command, eg. `http://localhost:8080`, and HTTP requests can be made to the REST Service at the same port following the [OSCAL Rest API specification.](https://github.com/EasyDynamics/oscal-rest), eg. `http://localhost:8080/oscal/v1/ssps/cff8385f-108e-40a5-8f7a-82f3dc0eaba8`

### Manually Configuring Directory Paths

If needed, the directory and sub-directory paths of the OSCAL content directory can also be manually configured by overwriting these environment variables in the container:

- `PERSISTENCE_FILE_PARENT_PATH`
- `PERSISTENCE_FILE_CATALOGS_PATH`
- `PERSISTENCE_FILE_COMPONENT_DEFINITIONS_PATH`
- `PERSISTENCE_FILE_PROFILES_PATH`
- `PERSISTENCE_FILE_SSPS_PATH`

The environment variables can be set using the `-e` flag of the `docker run` command.

## Building & Testing

For information on locally building and testing, please see [BUILDING-TESTING.md](https://github.com/EasyDynamics/oscal-editor-deployment/blob/main/all-in-one/BUILDING-TESTING.md).

## Reporting Issues

If you experience any issues while running the deployment, open a new issue at: https://github.com/EasyDynamics/oscal-editor-deployment/issues and
provide a descriptive message about the problem.
