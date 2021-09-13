# All-in-One Deployment

Simple Docker deployment of the back-end services and web-based user interface for the EasyGRC platform.

## Running

To run the docker image, run `docker run` with the `-p` flag specifying the port to map and the `-v` flag specifying the name of the OSCAL content directory.

Example:
`docker run -p 8080:8080 -v $(pwd)/oscal-content:/app/oscal-content image_name`

The container will run both the OSCAL Viewer and REST Service on startup. The OSCAL Viewer is available at the port specified in the run command, eg. `http://localhost:8080`, and HTTP requests can be made to the REST Service at the same port following the [OSCAL Rest API specification.](https://github.com/EasyDynamics/oscal-rest) eg. `http://localhost:8080/oscal/v1/ssps/{ssp-uuid}`

### OSCAL Content Directory

By default, the container will look for an OSCAL content directory with the following structure:

The parent directory is named `oscal-content` and has four sub-directories:
`catalogs`, `component-definitions`, `profiles`, `system-security-plans`; each of these will contain the .json OSCAL files of their respective schemas.

These directory paths can be manually configured by overwriting these environment variables:
- `PERSISTENT_FILE_PARENT_PATH`
- `PERSISTENT_FILE_CATALOGS_PATH`
- `PERSISTENT_FILE_COMPONENT_DEFINITIONS_PATH`
- `PERSISTENT_FILE_PROFILES_PATH`
- `PERSISTENT_FILE_SSPS_PATH` 

The environment variables can be set using the `-e` flag of the `docker run` command.

Important note: because of the semantics of the REST API and the current implementation, every OSCAL object file in the directory must be named by its UUID (see the [OSCAL specification](https://pages.nist.gov/OSCAL/reference/latest/complete/json-outline/)) 

eg. `oscal-content/system-security-plans/cff8385f-108e-40a5-8f7a-82f3dc0eaba8.json` 
