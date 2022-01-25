#!/bin/bash

parent=oscal-content
declare -A directories
directories["catalog"]="$parent/catalogs"
directories["component-definition"]="$parent/components"
directories["profile"]="$parent/profiles"
directories["system-security-plan"]="$parent/ssps"

download-file() (
  local top_element="$1"
  local url="$2"
  local temp
  # Fall back to using a different (good-enough) style of temporary directory
  # if mktemp(1) fails
  if ! temp="$(mktemp)"; then
    temp="${directories[$top_element]}/temp.json"
  fi

  # Download the file to a temporary location so that we can parse its UUID
  if ! curl -sL -o "$temp" "$url"; then
    echo "!!! Unable to download $top_element"
    exit 1
  fi

  # Parse the UUID and move the file in place, giving it that name
  uuid="$(jq --raw-output ".\"${top_element}\".\"uuid\"" "$temp")"
  mv "$temp" "${directories[$top_element]}/${uuid}.json"
)

# Create each of the directories where various types of files will go; passing
# the -p flag ensures that we create the parent-level directory as well
for dir in "${directories[@]}"; do
  mkdir -p "$dir"
done

# To add additional files (of an already defined type), follow this general format of
#  download-file <TYPE> <URL>
download-file catalog "https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/catalog/json/basic-catalog.json"
download-file component-definition "https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/component-definition/json/example-component.json"
download-file profile "https://raw.githubusercontent.com/usnistgov/oscal-content/master/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_LOW-baseline_profile.json"
download-file system-security-plan "https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/ssp/json/ssp-example.json"
