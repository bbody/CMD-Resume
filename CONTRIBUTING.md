# Contribution Guide
## Creating an issue
There are no specific rules for submitting issues, however if you can follow the [following guidelines](https://upthemes.com/blog/2014/02/writing-useful-github-issues/) it would make prioritizing and development easier.

## Development
### Setup
This guide assumes you are using a command line, if you want to use other tools please refer to your own tools documentation.

1. Clone the Github repository `git clone https://github.com/bbody/CMD-Resume.git`
2. Change directory to the repository `cd CMD-Resume`
3. Add git hooks to your project `git config core.hooksPath hooks` (if git version >= 2.9). Or *nix: `./setup-hooks.sh`, Windows: `setup-hooks.bat`
4. [Install Node and NPM](https://docs.npmjs.com/getting-started/installing-node) (if not already installed)
5. Install the dependencies `npm install`
6. Install gulp command line tool `npm i -g gulp-cli` or `sudo npm i -g gulp-cli` if the first does not work
7. Test if the running script works `gulp`

### Making changes
1. Fork the repository
2. Create a new branch
3. Create an issue or ask to be assigned to an issue
4. Run command `gulp`
4. Make changes and write tests
5. Ensure tests and source code checking passes
6. Commit code (Using format of '[:emoticon:](https://github.com/slashsBin/styleguide-git-commit-message) Description of change') by default :pencil: is prepended to any commit message without an emoticon (through [git hook](https://github.com/bbody/CMD-Resume/blob/master/hooks/prepend-commit-emoticon.sh). **Optional:** [Change previous commit message](https://help.github.com/articles/changing-a-commit-message/)
7. Create pull request into main branch

## Technologies
Despite CMD-Resume being quite simple there are quite a few packages and tools which are used to develop, test, build and deploy.

- Running
    - [jQuery Terminal](http://terminal.jcubic.pl/) - required for getting a terminal inside web browser
    - [jQuery Mousewheel](https://github.com/jquery/jquery-mousewheel) - optional for improving mousewheel functionality
    - [jQuery](https://jquery.com/) - required for libraries and for core CMD-Resume functions
- Dependency Management
    - [NodeJS](https://nodejs.org/en/) - required for running NPM
    - [NPM](https://www.npmjs.com/) - required for installing dependencies
- Building
    - [Gulp](http://gulpjs.com/) - required for running tasks for development and deployment
    - [Gulp Uglify](https://www.npmjs.com/package/gulp-uglify) - used for minifying JavaScript code
- Testing
    - [Karma](https://karma-runner.github.io/) - used for running unit testing across multiple browsers
    - [Jasmine](https://jasmine.github.io/) - used for writing unit tests
    - [WebdriverIO](http://webdriver.io/)
    - Web Browsers (Remote) - browser launchers for running the tests on the build server
        - [PhantomJS](https://github.com/karma-runner/karma-phantomjs-launcher)
        - [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
    - Web Browsers (Local) - browser launchers for running the tests on local machine
        - [PhantomJS](https://github.com/karma-runner/karma-phantomjs-launcher)
        - [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
        - [Chrome](https://github.com/karma-runner/karma-chrome-launcher)
        - [Firefox](https://github.com/karma-runner/karma-firefox-launcher)
        - [Safari](https://github.com/karma-runner/karma-safari-launcher) (OSX/MacOS Only)
        - [Internet Explorer](https://github.com/karma-runner/karma-ie-launcher) (Windows Only)
        - [Edge](https://github.com/karma-runner/karma-edge-launcher) (Windows Only)
- Source Checking
    - [JSHint](http://jshint.com/) - used to pick up simple JavaScript problems which could lead to bugs (differs across code, tests and tooling)
    - [JSCS](http://jscs.info/) - used to ensure code style is consistent (differs across code, tests and tooling)
    - [Codecov](https://codecov.io/gh/bbody/CMD-Resume) - used to provide code coverage and code quality analysis
- Development
    - [PugJs](https://github.com/pugjs/pug) - used for building HTML through templating
- Deployment
    - [Travis CI](https://travis-ci.org/) - used to build, run tests and deploy code
    - [Github Pages](https://pages.github.com/) - used to host example of CMD-Resume
    - [Github Releases](https://help.github.com/articles/creating-releases/) - used to package CMD-Resume and host in releases on Github repository
    - [NPM](https://www.npmjs.com/package/cmd-resume) - used to deploy new code to NPM repository
    - ~[Yarn](https://yarnpkg.com) - used to deploy new code to NPM repository~

For more information a list of dependencies please check [package.json](https://github.com/bbody/CMD-Resume/blob/master/package.json).

## Releasing
Releasing can only be performed by an admin.
1. [Bump NPM version](https://docs.npmjs.com/cli/version)
2. Commit `git commit -am ":bookmark: Upgrade version"`
3. Push `git push origin master`
4. Push `git push && git push --tags`
