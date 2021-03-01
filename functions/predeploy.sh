#!/bin/bash

# Delete existing files
rm -f phits-tech-common-*.tgz

# Package common
npm pack ../common
COMMON_PACKAGE=`ls phits-tech-common-*.tgz`

# Rewrite package.json to use common from tgz
sed -i.backup -E "s/\"@phits-tech\/common\": \"[^\"]*\"/\"@phits-tech\/common\": \"file:.\/$COMMON_PACKAGE\"/g" package.json
