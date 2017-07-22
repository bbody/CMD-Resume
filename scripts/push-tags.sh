#!/bin/bash

# Create a git tag of the new version to use
# If package.json major and minor versions match last tag, then increment last tag. Else use package.json major.minor.0.
{sed -nE 's/^[ \\t]*\"version\": \"([0-9]{1,}\\.[0-9]{1,}\\.)[0-9x]{1,}\",$/\\1/p' package.json; git describe --abbrev=0 | sed -E 's/^v([0-9]{1,}\\.[0-9]{1,}\\.)([0-9]{1,})$/\\1 \\2/g'; } | tr \"\\n\" \" \" | awk '{printf($1==$2?\"v\"$2$3+1:\"v\"$1\"0\")}' | xargs -I {} git tag -a {} -m {}

# Update package.json based on the git tag we just created
npm --no-git-tag-version version from-git

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git remote rm origin
git remote add origin https://bbody:${GITHUB_TOKEN}@github.com/bbody/CMD-Resume.git
git add package.json
git add package-lock.json
git commit -am ":pencil: Update version"
git push origin master
git push --tags