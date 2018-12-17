#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout doc-build
  git add CMD-RESUME-DATA-SCHEMA.md
  git add README.md
  git add CONTRIBUTING.md
  git commit --message ":books: Compile documentation"
}

upload_files() {
  git remote add origin https://${GITHUB_TOKEN}@github.com/bbody/CMD-Resume.git > /dev/null 2>&1
  git push --quiet --set-upstream origin doc-build 
}

setup_git
commit_website_files
# upload_files