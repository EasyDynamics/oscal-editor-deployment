# The build operates in three phases:
#  1. Build the oscal-react-library example app. This phase happens in a
#     Node environment. If a prebuilt viewer is provided, that is used.
#     Otherwise, the repository is cloned and the viewer is built.
#  2. Build the oscal-rest-service. This phase happens in an OpenJDK image.
#     Like with the viewer, if a prebuilt JAR file is provided, that is used.
#     Otherwise, the service is built from source.
#  3. The final "runtime" container is built. This is based off the Distroless
#     Java image with minimal additional software installed.
#  Steps 1 & 2 place their artifacts in /app/ and Step 3 copies the final artifact
#  into its /app/ directory with the appropriate filename.

ARG JAVA_VERSION=17
ARG NODE_VERSION=lts
# The maven container specifies a JAVA_VERSION environment variable so we have
# to find a way to rename our variable within that stage. ENV always overrides
# ARG, apparently even when it was set in a base image.
ARG _JAVA_VERSION=${JAVA_VERSION}

FROM node:${NODE_VERSION}-alpine as build-viewer

ARG OSCAL_REACT_GIT_REPO=https://github.com/EasyDynamics/oscal-react-library
ARG OSCAL_REACT_GIT_BRANCH=develop
ARG OSCAL_REACT_DIR=oscal-react-library
ARG OSCAL_REST_BASE_URL=/oscal/v1
ARG VIEWER_PATH

WORKDIR /app

# Copy the (possibly empty/undefined) viewer app into build
COPY $VIEWER_PATH /app/build
# If VIEWER_PATH has been defined, otherwise build from source
RUN if [ -n "$VIEWER_PATH" ] ; \
    then echo "Using viewer from $VIEWER_PATH" ; \
    else apk add --no-cache git && \
    rm -rf /app/build && \
    git clone --branch "$OSCAL_REACT_GIT_BRANCH" --depth 1 -- "$OSCAL_REACT_GIT_REPO" "$OSCAL_REACT_DIR" && \
    cd "$OSCAL_REACT_DIR" && \
    npm install -g npm@latest && \
    npm ci && \
    REACT_APP_REST_BASE_URL="$OSCAL_REST_BASE_URL" npm run build && \
    mv packages/oscal-viewer/build /app/ ; \
    fi

FROM maven:3-openjdk-${JAVA_VERSION} as build-service
ARG _JAVA_VERSION

ARG OSCAL_REST_SERVICE_GIT_REPO=https://github.com/EasyDynamics/oscal-rest-service
ARG OSCAL_REST_SERVICE_GIT_BRANCH=develop
ARG OSCAL_REST_SERVICE_DIR=oscal-rest-service
ARG REST_PATH

WORKDIR /app

COPY $REST_PATH /app/oscal-rest-service-app.jar

RUN if [ -n "$REST_PATH" ]; \
    then echo "Using REST service from $REST_PATH"; \
    else rm -rf /app/oscal-rest-service-app.jar && \
    git clone --branch "${OSCAL_REST_SERVICE_GIT_BRANCH}" --depth 1 -- "${OSCAL_REST_SERVICE_GIT_REPO}" "${OSCAL_REST_SERVICE_DIR}" && \
    cd "${OSCAL_REST_SERVICE_DIR}" && \
    mvn -Djava.version="${_JAVA_VERSION}" clean install && \
    # Even though we use a * glob here, there should only be one file that matches this spec. Using the
    # glob means that we don't have to worry about the specified version in the `pom.xml`
    mv oscal-rest-service-app/target/oscal-rest-service-app*.jar "/app/oscal-rest-service-app.jar"; \
    fi

FROM gcr.io/distroless/java${JAVA_VERSION}-debian11:nonroot

COPY --from=build-viewer /app/build /app/oscal-viewer-app
COPY --from=build-service /app/oscal-rest-service-app.jar /app/oscal-rest-service-app.jar

USER nonroot:nonroot

# Apply default configuration values via environment variable for the location of the OSCAL
# Content directory as well as the location of the OSCAL Viewer/Editor application to be
# served by the Spring app.
ENV PERSISTENCE_FILE_PARENT_PATH="oscal-content" \
    SPRING_WEB_RESOURCES_STATIC_LOCATIONS="classpath:/static,file:/app/oscal-viewer-app/"

EXPOSE 8080

WORKDIR /app

CMD ["oscal-rest-service-app.jar"]
