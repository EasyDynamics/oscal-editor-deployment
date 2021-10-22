FROM openjdk:11-jre-slim

#GitHub PAT - this needs package:read permissions for the
#@easydynamics/oscal-viewer npm package and com.easydynamics.oscal-rest-service maven package.
ARG PACKAGE_TOKEN

RUN apt-get update; \
    apt-get install -y --no-install-recommends \
        curl wget jq xmlstarlet; \
#
#   Pull production build of OSCAL Viewer
#
#   Get the latest version from direct link to the GitHub npm registry
#   and download it as tarball.
#   Extract and copy to desired location   
    mkdir ./app; \
    wget --header "Authorization: token ${PACKAGE_TOKEN}" \
        $(curl \
        -H "Authorization: token ${PACKAGE_TOKEN}" \
        https://npm.pkg.github.com/EasyDynamics/@easydynamics/oscal-viewer/ | \
        jq --raw-output '."dist-tags".latest as $latest | \
        .versions[] | select(.version == $latest) | .dist.tarball' \
        ) -O oscal-viewer.tgz; \
    tar -xf ./oscal-viewer.tgz; \
    cp -r package/build ./app/build; \
#
#   Pull OSCAL REST Service
#
#   Get the latest version number of the REST Service from the GitHub Packages API
    export PACKAGE_VERSION=$(curl \
            -H "Accept: application/vnd.github.v3+json" \
            -H "Authorization: token ${PACKAGE_TOKEN}" \
            https://api.github.com/orgs/EasyDynamics/packages/maven/com.easydynamics.oscal-rest-service/versions | \
            jq --raw-output '.[0].name'); \
#   Get the metadata for the latest version, and parse it for the .jar artifact download link
    export TIMESTAMP=$(curl \
        -H "Authorization: token ${PACKAGE_TOKEN}" \
        https://maven.pkg.github.com/EasyDynamics/*/com/easydynamics/oscal-rest-service/${PACKAGE_VERSION}/maven-metadata.xml | \
        xmlstarlet sel -t -v "//metadata/versioning/snapshotVersions/snapshotVersion[position() = 1]/value"); \
#   Download the REST Service .jar artifact
    wget --header="Authorization: token ${PACKAGE_TOKEN}" \
    -O ./app/rest.jar \
    https://maven.pkg.github.com/EasyDynamics/oscal-rest-service/com.easydynamics.oscal-rest-service/${PACKAGE_VERSION}/oscal-rest-service-${TIMESTAMP}.jar; \
#   Clean up files, environment variables, and installed packages
    rm output.xml oscal-viewer.tgz; \
    unset TIMESTAMP; \
    unset PACKAGE_VERSION; \
    apt-get -y purge jq xmlstarlet curl wget; \
    apt autoremove -y --purge; \
#   Add a new group and add a new user to the group
#   Give permissions in the /app/ directory to the new user
    addgroup --system easygrc; \
    adduser --system easygrc --ingroup easygrc; \
    chown -R easygrc /app/

USER easygrc

#Set environment variables for the oscal content directory
#and location of the production build to be served by Spring Boot
ENV PERSISTENCE_FILE_PARENT_PATH="oscal-content" \
    SPRING_RESOURCES_STATIC_LOCATIONS="file:/app/build/"

EXPOSE 8080

WORKDIR /app/

ENTRYPOINT ["java", "-jar", "rest.jar"]