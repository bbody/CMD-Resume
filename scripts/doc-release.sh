#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout doc-build
  git reset
  git add CMD-RESUME-DATA-SCHEMA.md
  git add README.md
  git add CONTRIBUTING.md
  git commit --message ":books: Compile documentation for version v${PACKAGE_VERSION}"
  git add dist/*
  git commit --message ":gem::bookmark: Compile for v${PACKAGE_VERSION} release"
}

upload_files() {
  git remote add origin https://bbody:${GH_TOKEN}@github.com/bbody/CMD-Resume.git > /dev/null 2>&1
  git push --quiet --set-upstream origin doc-build 
}

setup_git
commit_website_files
upload_files