FROM openjdk:11

COPY ./rest.jar /app/rest.jar

COPY ./build/ /app/build/

RUN addgroup --system easygrc && \
    adduser --system easygrc --ingroup easygrc && \
    chown -R easygrc /app/

USER easygrc

ENV PERSISTENCE_FILE_PARENT_PATH="oscal-content" \
    PERSISTENCE_FILE_SSPS_PATH="ssps" \
    PERSISTENCE_FILE_PROFILES_PATH="profiles" \
    PERSISTENCE_FILE_CATALOGS_PATH="catalogs" \
    PERSISTENCE_FILE_COMPONENTS_PATH="components" \
    SPRING_RESOURCES_STATIC_LOCATIONS="file:/app/build/"

EXPOSE 8080

WORKDIR /app/

CMD ["java", "-jar", "rest.jar"]
