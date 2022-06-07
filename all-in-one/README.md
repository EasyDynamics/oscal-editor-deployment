# All-in-One Deployment

Simple Docker deployment of the back-end services and web-based user interface for the OSCAL Editor.

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
Each of the four sub-directories should contain the **JSON** OSCAL files of their respective schemas.  There are tools available to convert other OSCAL formats to JSON such as [NIST's XSL converters](https://github.com/usnistgov/OSCAL/tree/main/json/convert).

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

The container will run both the OSCAL Viewer and REST Service on startup. The OSCAL Viewer is available at the port specified in the run command, eg. `http://localhost:8080`, and HTTP requests can be made to the REST Service at the same port following the [OSCAL Rest API specification.](https://github.com/EasyDynamics/oscal-rest), eg. http://localhost:8080/oscal/v1/ssps/cff8385f-108e-40a5-8f7a-82f3dc0eaba8

### Manually Configuring Directory Paths

If needed, the directory and sub-directory paths of the OSCAL content directory can also be manually configured by overwriting these environment variables in the container:
- `PERSISTENCE_FILE_PARENT_PATH`
- `PERSISTENCE_FILE_CATALOGS_PATH`
- `PERSISTENCE_FILE_COMPONENT_DEFINITIONS_PATH`
- `PERSISTENCE_FILE_PROFILES_PATH`
- `PERSISTENcE_FILE_SSPS_PATH`

The environment variables can be set using the `-e` flag of the `docker run` command.

## Building the Image Locally

The Docker image can be built locally, instead of being pulled from the registry, by using the
`Dockerfile` provided within this repository. Optionally, you can provide prebuilt copies of the
[OSCAL Viewer][react-lib] and the [OSCAL REST Service][service]; however, if those are not provided
the `Dockerfile` will automatically fetch the source from GitHub and build them when building the
container.

The latest tagged version of the [OSCAL Viewer][viewer] is available as a
[build artifact][viewer-artifact] of the latest release of the [`oscal-react-library`][react-lib].
You may download that file, pass it as the `VIEWER_PATH` build arg as described below. The latest
snapshot release of the [OSCAL REST Service][service] is hosted on [GitHub packages][package].

You may optionally download both the latest version of the OSCAL Viewer and REST Service using the
`packages_pull.sh` shell script in this directory. In order to use the script, you will need to
leverage a GitHub [PAT][pat]. The script can be invoked as `packages_pull.sh <PAT>`. The downloaded
files may be passed to the `VIEWER_PATH` and `REST_PATH` build args as described below.

[react-lib]: https://github.com/EasyDynamics/oscal-react-library
[viewer]: https://github.com/EasyDynamics/oscal-react-library/tree/develop/example
[service]: https://github.com/EasyDynamics/oscal-rest-service
[viewer-artifact]: https://github.com/EasyDynamics/oscal-react-library/releases/latest/download/oscal-viewer.zip
[package]: https://github.com/EasyDynamics/oscal-rest-service/packages/1369238
[pat]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token


### Creating the Image

The image can be built by running

```bash
docker build --tag oscal-editor-all-in-one .
```

By default, the `Dockerfile` will build the OSCAL Viewer from source unless the `VIEWER_PATH` build argument is
provided and will build the OSCAL REST Service from source unless the `REST_PATH` build argument is provided.
When building from source, the `develop` branch is used by default.

For example, to specify a locally-built Viewer and REST service in local directory,

```bash
docker build --build-arg VIEWER_PATH=./oscal-viewer --build-arg REST_PATH=./oscal-rest.jar --tag oscal-editor-all-in-one .
```

To build from source but to use a branch other than `develop`, you can use the `OSCAL_REACT_GIT_BRANCH` to change
the branch of for OSCAL Viewer and `OSCAL_REST_SERVICE_GIT_BRANCH` to change the branch for the OSCAL REST service.

For example, to use the `feature/foo` branch of the Viewer and `feature/bar` of the REST service:

```bash
docker build --build-arg OSCAL_REACT_GIT_BRANCH=feature/foo --build-arg OSCAL_REST_SERVICE_GIT_BRANCH=feature/bar --tag oscal-editor-all-in-one .
```

For each project, you may also specify `OSCAL_REACT_GIT_REPO` and `OSCAL_REST_SERVICE_GIT_REPO` if you wish to build
from using using branches on a fork of the repository.

### Building Required Resources

If you wish to build the OSCAL Viewer or REST service yourself, you may do so following the documentation from the respective
repositories and then passing the path to the build artifacts using the `VIEWER_PATH` and/or `REST_PATH` build arguments. In
most cases this is not necessary as the `_GIT_BRANCH` build arguments support both branches and tags. 

## Testing

The container can be tested using end-to-end Cypress tests.

More information on testing can be found in [end-to-end-tests.](../end-to-end-tests)
