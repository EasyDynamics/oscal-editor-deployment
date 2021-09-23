FROM openjdk:11-jre-slim

#copy .jar of OSCAL REST Service
COPY ./oscal-rest-service-0.0.1-SNAPSHOT.jar /app/rest.jar

#copy production build of OSCAL Viewer
COPY ./build/ /app/build/

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

<<<<<<< HEAD
ENTRYPOINT ["java", "-jar", "rest.jar"]
=======
ENTRYPOINT ["java", "-jar", "rest.jar"]
>>>>>>> 77a0344ea8525d05e141c12380a36d2bce337d41
