#!/bin/bash

if [ -z $1 ]
then
	echo "Usage: packages_pull.sh {GitHub Packages PAT}"
	exit
fi

#Common header for authentication to GitHub services
token_header="Authorization: token $1"

#Get direct download url for the OSCAL Viewer .zip asset
#from the GitHub Releases API
viewer_url=$(curl \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/EasyDynamics/oscal-react-library/releases/latest | \
  jq --raw-output '.assets[] | select(.name=="viewer.zip") | .browser_download_url')

#Download the OSCAL Viewer package as .zip
#Then extract it and copy the production build of the Viewer
wget \
	-O viewer.zip \
	$viewer_url

unzip ./viewer.zip -d ./viewer
cp -r viewer/build ./build

#Get the latest version of the OSCAL Rest Service package from the GitHub Packages API
package_version=$(curl \
        -H "Accept: application/vnd.github.v3+json" \
        -H "$token_header" \
        https://api.github.com/orgs/EasyDynamics/packages/maven/com.easydynamics.oscal-rest-service-app/versions | \
        jq --raw-output '.[0].name')

#Get the Maven package metadata for the OSCAL Rest Service
curl -H "$token_header" \
https://maven.pkg.github.com/EasyDynamics/oscal-rest-service/com/easydynamics/oscal-rest-service-app/$package_version/maven-metadata.xml > output.xml

#Parse the metadata for the timestamp of the .jar artifact to download
timestamp=$(xmlstarlet sel -t -v "//metadata/versioning/snapshotVersions/snapshotVersion[last()]/value" output.xml)

#Download the OSCAL Rest Service as .jar
wget --header="$token_header" \
-O ./oscal-rest-service.jar \
https://maven.pkg.github.com/EasyDynamics/oscal-rest-service/com.easydynamics/oscal-rest-service-app/$package_version/oscal-rest-service-app-$timestamp.jar

#Clean up left over files
rm -rf viewer viewer.zip output.xml
