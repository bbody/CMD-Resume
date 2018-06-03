#!/bin/sh

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git remote add origin https://${GH_TOKEN}@github.com/bbody/CMD-Resume.git > /dev/null 2>&1
git push --quiet --set-upstream origin master 
