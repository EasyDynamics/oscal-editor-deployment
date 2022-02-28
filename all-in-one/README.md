# All-in-One Deployment

Simple Docker deployment of the back-end services and web-based user interface for the OSCAL Editor.

## Pulling the Image

The Docker image is hosted on the [GitHub Container Registry.](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

You can pull the image by running:
```
docker pull ghcr.io/easydynamics/oscal-editor-all-in-one
```

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

To build the Docker image manually instead of pulling from the registry, you'll need:
- The Dockerfile (provided in this repo)
- The [OSCAL Viewer](https://github.com/EasyDynamics/oscal-react-library)
  - Only needed if building for specific changes, otherwise GitHub source is used
- The [OSCAL REST Service](https://github.com/EasyDynamics/oscal-rest-service)

The latest versions of the OSCAL Viewer and OSCAL REST Service are hosted on [GitHub Packages.](https://github.com/orgs/EasyDynamics/packages) They can be easily downloaded using the `packages_pull.sh` bash script in this repo. Authentication to download from GitHub Packages requires a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with `package:read` permissions.

Example:
```
bash packages_pull.sh {GitHub Packages PAT}
``` 

### Building Required Resources

To build a specific version of the OSCAL Viewer or OSCAL REST Service:

Clone the OSCAL Viewer and build the production build by running `npm install && npm run build` in the `example` directory. This will create the `example/build/` directory.

Clone the OSCAL REST Service compile it into a .jar with `mvn install`. The .jar file will be written to `oscal-rest-service-{version}.jar` in the `target` directory.

More in-depth docs on building these resources can be found on their respective GitHub pages, linked above.

### Creating the Image

Once the required resources are set up, run `docker build --tag oscal-editor-all-in-one .`

By default, the Dockerfile will build the OSCAL Viewer from source and look for an `oscal-rest-service.jar` file in the current directory. 
To specify a local OSCAL Viewer distribution build use the `VIEWER_PATH` build argument. To provide a different path to the REST service
use the `REST_PATH` build argument.

For example:
```
docker build --build-arg VIEWER_PATH=./build --build-arg REST_PATH=./different_file.jar --tag oscal-editor-all-in-one .
```

To specify a different GitHub repo or branch for the OSCAL viewer use the `OSCAL_REACT_GIT_REPO` and `OSCAL_REACT_GIT_BRANCH`.

For example:
```
docker build --build-arg OSCAL_REACT_GIT_REPO=https://github.com/MyOrg/oscal-react-library  --build-arg OSCAL_REACT_GIT_BRANCH=some-feature-branch --tag oscal-editor-all-in-one .
```

Access other than read requires a [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
with [appropriate package permissions](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility#visibility-and-access-permissions-for-container-images).
It is recommended to save this PAT as an environment variable.

Using this PAT, log into the registry by running:
```
echo ${PAT} | docker login ghcr.io -u GITHUB_USERNAME --password-stdin
```

## Testing

The container can be tested using end-to-end Cypress tests.

More information on testing can be found in [end-to-end-tests.](../end-to-end-tests)
