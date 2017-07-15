# Contribution Guide
## Setup
This guide assumes you are using a command line, if you want to use other tools please refer to your own tools documentation.

1. Clone the Github repository `git clone https://github.com/bbody/CMD-Resume.git`
2. Change directory to the repository `cd CMD-Resume`
3. Add git hooks to your project `git config core.hooksPath hooks`
4. [Install Node and NPM](https://docs.npmjs.com/getting-started/installing-node) (if not already installed)
5. Install the dependencies `npm install`
6. Install gulp command line tool `npm i -g gulp-cli` or `sudo npm i -g gulp-cli` if the first does not work
7. Test if the running script works `gulp`

## Making changes
1. Fork the repository
2. Create a new branch
3. Create an issue or ask to be assigned to an issue
4. Run command `gulp`
4. Make changes and write tests
5. Ensure tests and source code checking passes
6. Commit code (Using format of '[:emoticon:](https://github.com/slashsBin/styleguide-git-commit-message) Description of change')
7. Create pull request into main branch

## Technologies
Despite CMD-Resume being quite simple there are quite a few packages and tools which are used to develop, test, build and deploy.

- Running
    - [jQuery Terminal](http://terminal.jcubic.pl/)
    - [jQuery Mousewheel](https://github.com/jquery/jquery-mousewheel)
    - [jQuery](https://jquery.com/)
- Dependency Management
    - [NodeJS](https://nodejs.org/en/)
    - [NPM](https://www.npmjs.com/)
- Building
    - [Gulp](http://gulpjs.com/)
    - [Gulp Uglify](https://www.npmjs.com/package/gulp-uglify)
- Testing
    - [Karma](https://karma-runner.github.io/)
    - [Jasmine](https://jasmine.github.io/)
    - [WebdriverIO](http://webdriver.io/)
    - Web Browsers (Remote)
        - [PhantomJS](https://github.com/karma-runner/karma-phantomjs-launcher)
        - [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
    - Web Browsers (Local)
        - [PhantomJS](https://github.com/karma-runner/karma-phantomjs-launcher)
        - [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
        - [Chrome](https://github.com/karma-runner/karma-chrome-launcher)
        - [Firefox](https://github.com/karma-runner/karma-firefox-launcher)
        - [Safari](https://github.com/karma-runner/karma-safari-launcher) (OSX/MacOS Only)
        - [Internet Explorer](https://github.com/karma-runner/karma-ie-launcher) (Windows Only)
        - [Edge](https://github.com/karma-runner/karma-edge-launcher) (Windows Only)
- Source Checking
    - [JSHint](http://jshint.com/)
    - [JSCS](http://jscs.info/)
    - [Codecov](https://codecov.io/gh/bbody/CMD-Resume)
- Deployment
    - [Travis CI](https://travis-ci.org/)
    - [Github Pages](https://pages.github.com/)
    - [NPM Plugin](https://www.npmjs.com/package/cmd-resume)
    - [Github Releases](https://help.github.com/articles/creating-releases/)

For more information a list of dependencies please check [package.json](https://github.com/bbody/CMD-Resume/blob/master/package.json).