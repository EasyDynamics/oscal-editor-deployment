FROM openjdk:11-jre-slim

ARG VIEWER_PATH=./build REST_PATH=./oscal-rest-service.jar

#copy .jar of OSCAL REST Service
COPY $REST_PATH /app/rest.jar

#copy production build of OSCAL Viewer
COPY $VIEWER_PATH /app/build

#add a new group and add a new user to the group
#give permissions in the /app/ directory to the new user
RUN addgroup --system easygrc && \
    adduser --system easygrc --ingroup easygrc && \
    chown -R easygrc /app/

USER easygrc

#set environment variables for the oscal content directory
#and location of the production build to be served by Spring Boot
ENV PERSISTENCE_FILE_PARENT_PATH="oscal-content" \
    SPRING_RESOURCES_STATIC_LOCATIONS="file:/app/build/"

EXPOSE 8080

WORKDIR /app/

ENTRYPOINT ["java", "-jar", "rest.jar"]
