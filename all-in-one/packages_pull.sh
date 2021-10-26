#!/bin/bash

if [ -z $1]
then
	echo "Usage: registry_pull.sh {GitHub Packages PAT}"
	exit
fi

#Common header for authentication to GitHub services
token_header="Authorization: token $1"

#Get metadata of the oscal-viewer package from GitHub packages
#and parse it for the direct download URL for the tarball distribution
viewer_tarball_url=$(curl \
	-H "$token_header" \
	https://npm.pkg.github.com/EasyDynamics/@easydynamics/oscal-viewer/ | \
	jq --raw-output '."dist-tags".latest as $latest |
	.versions[] | select(.version == $latest) | .dist.tarball')

#Download the OSCAL Viewer package as a tarball
#Then extract it and copy the production build of the Viewer
wget --header "$token_header" \
	-O oscal-viewer.tgz \
	$viewer_tarball_url

tar -xf ./oscal-viewer.tgz
cp -r package/build ./build

#Get the latest version of the OSCAL Rest Service package from the GitHub Packages API
package_version=$(curl \
        -H "Accept: application/vnd.github.v3+json" \
        -H "$token_header" \
        https://api.github.com/orgs/EasyDynamics/packages/maven/com.easydynamics.oscal-rest-service/versions | \
        jq --raw-output '.[0].name')

#Get the Maven package metadata for the OSCAL Rest Service
curl -H "$token_header" \
https://maven.pkg.github.com/EasyDynamics/*/com/easydynamics/oscal-rest-service/$package_version/maven-metadata.xml > output.xml

#Parse the metadata for the timestamp of the .jar artifact to download
timestamp=$(xmlstarlet sel -t -v "//metadata/versioning/snapshotVersions/snapshotVersion[last()]/value" output.xml)

#Download the OSCAL Rest Service as .jar
wget --header="$token_header" \
-O ./oscal-rest-service.jar \
https://maven.pkg.github.com/EasyDynamics/oscal-rest-service/com.easydynamics/oscal-rest-service/$package_version/oscal-rest-service-$timestamp.jar

#Clean up left over files
rm -rf package oscal-viewer.tgz output.xml
