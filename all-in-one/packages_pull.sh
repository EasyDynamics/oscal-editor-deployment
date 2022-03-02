#!/bin/bash

cmd_name="$0"

usage() (
  echo "Usage: $cmd_name PAT"
  echo ""
  echo "  Downloads the pre-built packages from GitHub Packages"
  echo "  for the OSCAL Web App and REST service."
  echo "  The PAT may be provided as an argument or through the"
  echo "  OSCAL_EDITOR_GITHUB_PACKAGES_PAT environment variable. The PAT must have"
  echo "  the read:packages permission."
  echo ""
  echo "  Example 1:"
  echo "      $cmd_name ghp_exampletoken1231"
  echo ""
  echo "  Example 2:"
  echo "      export OSCAL_EDITOR_GITHUB_PACKAGES_PAT=ghp_exampletoken1231"
  echo "      $cmd_name"
  echo ""
)

assert-required-commands() (
  commands=(jq xmlstarlet curl unzip)
  missing=0
  for cmd in "${commands[@]}"; do
    if ! command -v "$cmd" &> /dev/null; then
      echo "!!! Required command $cmd is missing."
      # This assumes that the package name and the command name are the same;
      # this is true for all current commands and Ubuntu/Debian but may not
      # hold true for Fedora/RHEL/SUSE.
      echo "    Install the $cmd package and try again."
      ((missing++))
    fi
  done
  exit "$missing"
)

unauthenticated-v3-api-request() (
  local url="$1"

  curl \
    -sL \
    -H "Accept: application/vnd.github.v3+json" \
    "$url"
)

authenticated-v3-api-request() (
  local url="$1"
  local token="$2"

  curl \
    -sL \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token $token" \
    "$url"
)

authenticated-pkg-api-request() (
  local url="$1"
  local token="$2"

  curl \
    -sL \
    -H "Authorization: token $token" \
    "$url"
)

get-viewer-zip() (
  local request_url="https://api.github.com/repos/EasyDynamics/oscal-react-library/releases/latest"
  local zip_url

  zip_url="$(unauthenticated-v3-api-request "$request_url" | jq --raw-output '.assets[] | select(.name=="oscal-viewer.zip") | .browser_download_url' )"
  if [ "$?" -ne 0 ] || [ -z "$zip_url" ] ; then
    echo "!!! Unable to get download url for OSCAL React Viewer"
    exit 1
  fi

  local output="./viewer.zip"
  if ! curl -sL -o "$output" "$zip_url"; then
    echo "!!! Unable to download OSCAL React Viewer ZIP file"
    exit 1
  fi
)

get-rest-service-jar() (
  local token="$1"
  local request_url="https://api.github.com/orgs/EasyDynamics/packages/maven/com.easydynamics.oscal-rest-service-app/versions"

  local package_version
  package_version="$(authenticated-v3-api-request "$request_url" "$token" | jq --raw-output '.[0].name' 2> /dev/null)"

  if [ "$?" -ne 0 ] || [ -z "$package_version" ] ; then
    echo "!!! Unable to get OSCAL Rest Service package version"
    echo "    Check the provided PAT has sufficient permissions and try again"
    exit 1
  fi

  local metadata_url="https://maven.pkg.github.com/EasyDynamics/oscal-rest-service/com/easydynamics/oscal-rest-service-app/$package_version/maven-metadata.xml"

  local metadata
  metadata="$(authenticated-pkg-api-request "$metadata_url" "$token")"
  if [ "$?" -ne 0 ]; then
    echo "!!! Unable to get the OSCAL Rest Service package metadata"
    echo "    Check the provided PAT has sufficient permissions and try again"
    exit 1
  fi
  local timestamp
  timestamp="$(echo "$metadata" | xmlstarlet sel -t -v "//metadata/versioning/snapshotVersions/snapshotVersion[last()]/value" "-")"
  if [ "$?" -ne 0 ]; then
    echo "!!! Unable to parse the timestamp from the OSCAL Rest Service package metadata."
    exit 1
  fi

  local service_jar_url="https://maven.pkg.github.com/EasyDynamics/oscal-rest-service/com.easydynamics/oscal-rest-service-app/$package_version/oscal-rest-service-app-$timestamp.jar"
  if ! curl -H "Authorization: token $token" -sL -o "./oscal-rest-service.jar" "$service_jar_url"; then
    echo "!!! Unable to download the OSCAL Rest Service .jar file"
    exit 1
  fi
)

cleanup() (
  rm -rf ./viewer ./viewer.zip
)

main() (
  local token="${1:-$OSCAL_EDITOR_GITHUB_PACKAGES_PAT}"

  # Ensure that the token is present and that it matches the expected format of
  # a GitHub PAT.
  if [ -z "$token" ]; then
    usage
    exit 1
  fi

  # Formats based on:
  # https://github.blog/changelog/2021-03-31-authentication-token-format-updates-are-generally-available/
  if [[ ! "$token" =~ ^gh[pousr]_ ]]; then
    echo "!!! The provided GitHub PAT is invalid"
    exit 1
  fi

  echo "==> Checking required commands are installed"

  if ! assert-required-commands; then
    exit 1
  fi

  echo "==> Downloading OSCAL Viewer"

  if ! get-viewer-zip; then
    exit 1
  fi

  unzip -qo ./viewer.zip -d ./viewer
  cp -r viewer/build .

  echo "==> Fetching OSCAL REST Service JAR file"

  if ! get-rest-service-jar "$token"; then
    exit 1
  fi

  echo "==> Done!"
)

main "$@"
exit $?
