# All-in-One Deployment

Simple Docker deployment of the back-end services and web-based user interface for the EasyGRC platform.

## Pulling the Image

The Docker image is hosted on the [GitHub Container Registry.](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

To pull the image, first authenticate to the container registry. This requires a [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
with `read:packages` permissions. It is recommended to save this PAT as an environment variable.

Using this PAT, log into the registry by running:

`echo ${PAT} | docker login ghcr.io -u GITHUB_USERNAME --password-stdin`

After logging in, pull the image by running:

`docker pull ghcr.io/easydynamics/easygrc-all-in-one`

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
Each of the four sub-directories should contain the .json OSCAL files of their respective schemas.

For convenience, this directory structure can be set up by running this command in your terminal:

`mkdir oscal-content oscal-content/catalogs oscal-content/component-definitions oscal-content/profiles oscal-content/system-security-plans`

Important note: because of the semantics of the REST API and the current implementation, every OSCAL object file in the directory must be named by its UUID (see the [OSCAL specification](https://pages.nist.gov/OSCAL/reference/latest/complete/json-outline/)).

eg. `oscal-content/system-security-plans/cff8385f-108e-40a5-8f7a-82f3dc0eaba8.json` 

## Running

To run the docker image, run `docker run` with the `-p` flag specifying the port to map and the `-v` flag specifying the path of the OSCAL content directory.

Example: 

`docker run -p 8080:8080 -v "$(pwd)"/oscal-content:/app/oscal-content ghcr.io/easydynamics/easygrc-all-in-one`

The container will run both the OSCAL Viewer and REST Service on startup. The OSCAL Viewer is available at the port specified in the run command, eg. `http://localhost:8080`, and HTTP requests can be made to the REST Service at the same port following the [OSCAL Rest API specification.](https://github.com/EasyDynamics/oscal-rest) eg. `http://localhost:8080/oscal/v1/ssps/cff8385f-108e-40a5-8f7a-82f3dc0eaba8`

### Manually Configuring Directory Paths

If needed, the directory and sub-directory paths of the OSCAL content directory can also be manually configured by overwriting these environment variables in the container:
- `PERSISTENT_FILE_PARENT_PATH`
- `PERSISTENT_FILE_CATALOGS_PATH`
- `PERSISTENT_FILE_COMPONENT_DEFINITIONS_PATH`
- `PERSISTENT_FILE_PROFILES_PATH`
- `PERSISTENT_FILE_SSPS_PATH` 

The environment variables can be set using the `-e` flag of the `docker run` command.

## Building the Image Locally

To build the Docker image manually instead of pulling from the registry, you'll need:
- The Dockerfile (provided in this repo)
- The [OSCAL Viewer](https://github.com/EasyDynamics/oscal-react-library)
- The [OSCAL REST Service](https://github.com/EasyDynamics/oscal-rest-service)

The latest versions of the OSCAL Viewer and OSCAL REST Service are hosted on [GitHub Packages.](https://github.com/orgs/EasyDynamics/packages) They can be easily downloaded using the `packages_pull.sh` bash script in this repo. Authentication to download from GitHub Packages requires a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with `package:read` permissions.

Example:

`bash packages_pull.sh {GitHub Packages PAT}` 

### Building Required Resources

To build a specific version of the OSCAL Viewer or OSCAL REST Service:

Clone the OSCAL Viewer and build the production build by running `npm install && npm run build` in the `example` directory. This will create the `example/build/` directory.

Clone the OSCAL REST Service compile it into a .jar with `mvn install`. The .jar file will be written to `oscal-rest-service-{version}.jar` in the `target` directory.

More in-depth docs on building these resources can be found on their respective GitHub pages, linked above.

### Creating the Image

Once the required resources are set up, run `docker build --tag easygrc-all-in-one .`

By default, the Dockerfile will look for a directory called `build` containing the production build of the OSCAL Viewer, and a `oscal-rest-service.jar` file, both in the current directory. To provide a different path to these files, use the `VIEWER_PATH` and `REST_PATH` build arguments.

For example:

`docker build --build-arg VIEWER_PATH=./different_directory --build-arg REST_PATH=./different_file.jar --tag easygrc-all-in-one .`

## Testing

The container can be tested using end-to-end Cypress tests.

More information on testing can be found in [end-to-end-tests.](../end-to-end-tests)
