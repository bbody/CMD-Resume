Despite CMD-Resume being quite simple there are quite a few packages and tools which are used to develop, test, build and deploy.

![Build Flow](https://raw.githubusercontent.com/bbody/CMD-Resume/master/docs/images/merge_graph.png "Build Flow")

- Run Dependencies
    - [jQuery Terminal](http://terminal.jcubic.pl/) - required for getting a terminal inside web browser
    - [jQuery Mousewheel](https://github.com/jquery/jquery-mousewheel) - optional for improving mousewheel functionality
    - [jQuery](https://jquery.com/) - required for libraries and for core CMD-Resume functions
- Dependency Management
    - [NodeJS](https://nodejs.org/en/) - required for running NPM
    - [NPM](https://www.npmjs.com/) - required for installing dependencies
- Building
    - [Gulp](http://gulpjs.com/) - required for running tasks for development and deployment
- Testing
    - [Karma](https://karma-runner.github.io/) - used for running unit testing across multiple browsers
    - [Jasmine](https://jasmine.github.io/) - used for unit testing
    - [WebdriverIO](http://webdriver.io/) - used for UI testing
    - Web Browsers (Remote) - browser launchers for running the tests on the build server
        - [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
        - [Headless Firefox](https://github.com/karma-runner/karma-firefox-launcher)
        - [BrowserStack](https://www.browserstack.com/) - run tests across a large group of browsers
    - Web Browsers (Local) - browser launchers for running the tests on local machine
        - [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
        - [Headless Firefox](https://github.com/karma-runner/karma-firefox-launcher)
        - [Chrome](https://github.com/karma-runner/karma-chrome-launcher)
        - [Firefox](https://github.com/karma-runner/karma-firefox-launcher)
        - [Safari](https://github.com/karma-runner/karma-safari-launcher) (OSX/MacOS Only)
        - [Internet Explorer](https://github.com/karma-runner/karma-ie-launcher) (Windows Only)
        - [Edge](https://github.com/karma-runner/karma-edge-launcher) (Windows Only)
- Source Checking
    - [JSHint](http://jshint.com/) - used to pick up simple JavaScript problems which could lead to bugs (differs across code, tests and tooling)
    - [JSCS](http://jscs.info/) - used to ensure code style is consistent (differs across code, tests and tooling)
    - [JSON Lint](https://github.com/zaach/jsonlint) - used to check the JSON files creating the resume
    - [YAML Lint](https://github.com/rasshofer/yaml-lint) - used to lint the Travis file
    - [Travis Lint](https://github.com/travis-ci/travis.rb#lint) - used to lint and verify the Travis file according to Travis' recommended format
    - [Code Climate](https://codeclimate.com/github/bbody/CMD-Resume) - used to provide code coverage and code quality analysis
- HTML
    - [PugJs](https://github.com/pugjs/pug) - used for building HTML through templating
- JavaScript
    - [Gulp Uglify](https://www.npmjs.com/package/gulp-uglify) - used for minifying JavaScript code
- Markdown
    - [Markdown Preprocessor](https://github.com/jreese/markdown-pp) - build Markdown from a preprocessor
- Deployment
    - [Travis CI](https://travis-ci.org/) - used to build, run tests and deploy code
- Release
    - [Github Pages](https://pages.github.com/) - used to host example of CMD-Resume
    - [Github Releases](https://help.github.com/articles/creating-releases/) - used to package CMD-Resume and host in releases on Github repository
    - [NPM](https://www.npmjs.com/) - used to deploy new code to NPM repository

For more information a list of dependencies please check [package.json](https://github.com/bbody/CMD-Resume/blob/master/package.json).