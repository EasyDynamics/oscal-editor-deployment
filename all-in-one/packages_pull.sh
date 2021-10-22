#!/bin/bash

if [ -z $1]
then
	echo "Usage: registry_pull.sh {GitHub Packages PAT}"
	exit
fi

token_header="Authorization: token $1"
viewer_tarball_url=$(curl \
	-H "$token_header" \
	https://npm.pkg.github.com/EasyDynamics/@easydynamics/oscal-viewer/ | \
	jq --raw-output '."dist-tags".latest as $latest |
	.versions[] | select(.version == $latest) | .dist.tarball')

wget --header "$token_header" \
	-O oscal-viewer.tgz \
	$viewer_tarball_url

tar -xf ./oscal-viewer.tgz
cp -r package/build ./build

package_version=$(curl \
        -H "Accept: application/vnd.github.v3+json" \
        -H "$token_header" \
        https://api.github.com/orgs/EasyDynamics/packages/maven/com.easydynamics.oscal-rest-service/versions | \
        jq --raw-output '.[0].name')

curl -H "$token_header" \
https://maven.pkg.github.com/EasyDynamics/*/com/easydynamics/oscal-rest-service/$package_version/maven-metadata.xml > output.xml

timestamp=$(xmlstarlet sel -t -v "//metadata/versioning/snapshotVersions/snapshotVersion[last()]/value" output.xml)

wget --header="$token_header" \
-O ./oscal-rest-service.jar \
https://maven.pkg.github.com/EasyDynamics/oscal-rest-service/com.easydynamics/oscal-rest-service/$package_version/oscal-rest-service-$timestamp.jar

rm -rf package oscal-viewer.tgz output.xml
