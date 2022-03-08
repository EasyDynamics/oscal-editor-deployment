FROM node:17.6.0-alpine as build-viewer

RUN apk add --no-cache git

ARG OSCAL_REACT_GIT_REPO=https://github.com/EasyDynamics/oscal-react-library
ARG OSCAL_REACT_GIT_BRANCH=develop
ARG OSCAL_REACT_DIR=oscal-react-library
ARG OSCAL_REST_BASE_URL=/oscal/v1
ARG VIEWER_PATH

WORKDIR /app

# Copy the (possibly empty/undefined) viewer app into build
COPY $VIEWER_PATH /app/build
# If VIEWER_PATH has been defined, otherwise build from source
RUN if [[ -n "$VIEWER_PATH" ]] ; \
    then echo "Using viewer from $VIEWER_PATH" ; \
    else rm -rf /app/build && \
    git clone --branch "$OSCAL_REACT_GIT_BRANCH" --depth 1 -- "$OSCAL_REACT_GIT_REPO" "$OSCAL_REACT_DIR" && \
    cd "$OSCAL_REACT_DIR" && \
    npm ci && \
    cd example && \
    npm ci && \
    REACT_APP_REST_BASE_URL="$OSCAL_REST_BASE_URL" npm run build && \
    mv build /app/ ; \
    fi


FROM openjdk:11-jre-slim

ARG REST_PATH=./oscal-rest-service.jar

#copy .jar of OSCAL REST Service
COPY $REST_PATH /app/rest.jar

#copy production build of OSCAL Viewer
COPY --from=build-viewer /app/build /app/build

#add a new group and add a new user to the group
#give permissions in the /app/ directory to the new user
RUN addgroup --system oscaledit && \
    adduser --system oscaledit --ingroup oscaledit && \
    chown -R oscaledit /app/

USER oscaledit

#set environment variables for the oscal content directory
#and location of the production build to be served by Spring Boot
ENV PERSISTENCE_FILE_PARENT_PATH="oscal-content" \
    SPRING_WEB_RESOURCES_STATIC_LOCATIONS="classpath:/static,file:/app/build/"

EXPOSE 8080

WORKDIR /app/

ENTRYPOINT ["java", "-jar", "rest.jar"]