#!/bin/sh

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git remote add origin https://${GITHUB_TOKEN}@github.com/bbody/CMD-Resume.git > /dev/null 2>&1
git status
git push origin master 
