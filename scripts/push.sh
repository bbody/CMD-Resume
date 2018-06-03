#!/bin/sh

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git remote add upstream https://${GITHUB_PUSH}@github.com/bbody/CMD-Resume.git
git push upstream master 
