#!/bin/bash

# Rewrite package.json back to how it was
cp package.json.backup package.json

# Tidy up
rm -f package.json.backup
