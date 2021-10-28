#!/bin/bash

parent=oscal-content
catalogs=$parent/catalogs
components=$parent/component-definitions
profiles=$parent/profiles
ssps=$parent/system-security-plans

#Create the oscal-content directories, if they don't already exist
mkdir -p $parent $catalogs $components $profiles $ssps

#Getting the example catalog json file, renaming it, and placing it in the catalogs directory
curl https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/catalog/json/basic-catalog.json > $catalogs/temp.json
name=$(cat $catalogs/temp.json | jq --raw-output '."catalog"' \
 | jq --raw-output '."uuid"')
mv $catalogs/temp.json $catalogs/$name.json

#Getting the example component definition json file, renaming it, and placing it in the component-definitions directory
curl https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/component-definition/json/example-component.json > $components/temp.json
name=$(cat $components/temp.json | jq --raw-output '."component-definition"' \
 | jq --raw-output '."uuid"')
mv $components/temp.json $components/$name.json

#Getting the example profile json file, renaming it, and placing it in the profiles directory
curl https://raw.githubusercontent.com/usnistgov/oscal-content/master/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_LOW-baseline_profile.json > $profiles/temp.json
name=$(cat $profiles/temp.json | jq --raw-output '."profile"' \
 | jq --raw-output '."uuid"')
mv $profiles/temp.json $profiles/$name.json

#Getting the example SSP json file, renaming it, and placing it in the SSPs directory
curl https://raw.githubusercontent.com/usnistgov/oscal-content/master/examples/ssp/json/ssp-example.json > $ssps/temp.json
name=$(cat $ssps/temp.json | jq --raw-output '."system-security-plan"' \
 | jq --raw-output '."uuid"')
mv $ssps/temp.json $ssps/$name.json