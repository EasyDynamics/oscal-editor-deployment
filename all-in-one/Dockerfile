FROM ubuntu:latest

#copy production build of OSCAL viewer
COPY ./build /app/build

#copy backend jar file
COPY ./rest.jar /app/rest.jar

COPY ./run-viewer-and-server.sh /app/run-viewer-and-server.sh

#install java and npm serve
RUN apt-get update && \ 
DEBIAN_FRONTEND=noninteractive apt-get -yq --no-install-recommends install default-jre npm
RUN npm install -g npm@latest && npm install -g serve@latest

#expose port 5000
EXPOSE 5000

WORKDIR /app/
ENTRYPOINT ["bash", "run-viewer-and-server.sh"]
