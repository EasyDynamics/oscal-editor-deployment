FROM openjdk:11

COPY ./rest.jar /app/rest.jar

ENV PARENT_DIR="oscal-content" \
SSPS_DIR="ssps" \
PROFILES_DIR="profiles" \
CATALOGS_DIR="catalogs" \
COMPONENTS_DIR="components"

EXPOSE 8080

WORKDIR /app/

CMD ["java", "-jar", "rest.jar"]
