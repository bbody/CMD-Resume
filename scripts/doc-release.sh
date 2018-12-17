#!/bin/sh
PACKAGE_VERSION=$1
GH_TOKEN=$2

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git checkout doc-build
git reset
git add CMD-RESUME-DATA-SCHEMA.md README.md CONTRIBUTING.md
git commit --message ":books: Compile documentation for version $PACKAGE_VERSION"
git add dist/*
git commit --message ":gem::bookmark: Compile for version $PACKAGE_VERSION release"

git remote add origin https://bbody:${GH_TOKEN}@github.com/bbody/CMD-Resume.git > /dev/null 2>&1
git push --quiet --set-upstream origin doc-build 
