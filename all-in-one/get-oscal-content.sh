#!/bin/bash

parent=oscal-content
declare -A directories
directories["catalog"]="$parent/catalogs"
directories["component-definition"]="$parent/component-definitions"
directories["profile"]="$parent/profiles"
directories["system-security-plan"]="$parent/system-security-plans"

download-file() (
  local top_element="$1"
  local url="$2"

  local download_path="${directories[$top_element]}/$(basename "$url")"

  # Using curl instead of wget ensures that the script works out-of-the-box on
  # macOS and most Linux distros
  if ! curl -sL -o "$download_path" "$url"; then
    echo "!!! Unable to download $top_element"
    exit 1
  fi
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
