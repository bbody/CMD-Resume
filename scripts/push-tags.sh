#!/bin/bash

npm version patch

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION

# Update package.json based on the git tag we just created

git tag $PACKAGE_VERSION
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git remote rm origin
git remote add origin https://bbody:${GITHUB_TOKEN}@github.com/bbody/CMD-Resume.git
git add package.json
git add package-lock.json
git commit -m ":pencil: Update version"
git push origin master
git push --tags