Despite CMD-Resume being quite simple there are quite a few packages and tools
which are used to develop, test, build and deploy.

![Build Flow][]

-   Run Dependencies
    - [jQuery Terminal][] - required for getting a terminal inside web browser
    - [jQuery Mousewheel][] - optional for improving mousewheel functionality
    - [jQuery][] - required for libraries and for core CMD-Resume functions

-   Dependency Management
    - [NodeJS][node] - required for running NPM
    - [NPM][] - required for installing dependencies

-   Building
    - [Gulp][] - required for running tasks for development and deployment

-   Testing
    -   [Karma][] - used for running unit testing across multiple browsers
    -   [Jasmine][] - used for unit testing
    -   [WebdriverIO][] - used for UI testing

    -   Web Browsers (Remote) - browser launchers for running the tests on the
        build server
        - [Headless Chrome][chrome]
        - [Headless Firefox][firefox]
        - [BrowserStack][browserstack] - run tests across a large group of
            browsers

    -   Web Browsers (Local) - browser launchers for running the tests on local
        machine
        - [Headless Chrome][chrome]
        - [Headless Firefox][firefox]
        - [Chrome][karma chrome]
        - [Firefox][karma fox]
        - [Safari][karma safari] (OSX/MacOS Only)
        - [Internet Explorer][karma ie] (Windows Only)
        - [Edge][karma edge] (Windows Only)

-   Source Checking
    - [JSHint][] - used to pick up simple JavaScript problems which could lead
      to bugs (differs across code, tests and tooling)
    - [JSCS][] - used to ensure code style is consistent (differs across code,
      tests and tooling)
    - [JSON Lint][] - used to check the JSON files creating the resume
    - [YAML Lint][] - used to lint the Travis file
    - [Travis Lint][] - used to lint and verify the Travis file according to
      Travis' recommended format
    - [Code Climate][] - used to provide code coverage and code quality
      analysis

-   HTML
    - [PugJs][] - used for building HTML through templating
-   JavaScript
    - [Gulp Uglify][] - used for minifying JavaScript code
-   Markdown
    - [Markdown Preprocessor][md pp] - build Markdown from a preprocessor
-   Deployment
    - [Travis CI][] - used to build, run tests and deploy code
-   Release
    - [Github Pages][] - used to host example of CMD-Resume
    - [Github Releases][] - used to package CMD-Resume and host in releases on
      Github repository
    - [NPM][] - used to deploy new code to NPM repository

For more information a list of dependencies please check
[package.json][package].

[browserstack]: https://www.browserstack.com/
[build flow]: https://raw.githubusercontent.com/bbody/CMD-Resume/master/docs/images/merge_graph.png "Build Flow"
[chrome]: https://developers.google.com/web/updates/2017/04/headless-chrome
[code climate]: https://codeclimate.com/github/bbody/CMD-Resume
[firefox]: https://github.com/karma-runner/karma-firefox-launchers
[github pages]: https://pages.github.com/
[github releases]: https://help.github.com/articles/creating-releases/
[gulp]: http://gulpjs.com/
[gulp uglify]: https://www.npmjs.com/package/gulp-uglify
[jasmine]: https://jasmine.github.io/
[jquery]: https://jquery.com/
[jquery mousewheel]: https://github.com/jquery/jquery-mousewheel
[jquery terminal]: http://terminal.jcubic.pl/
[jscs]: http://jscs.info/
[jshint]: http://jshint.com/
[json lint]: https://github.com/zaach/jsonlint
[karma]: https://karma-runner.github.io/
[karma chrome]: https://github.com/karma-runner/karma-chrome-launcher
[karma edge]: https://github.com/karma-runner/karma-edge-launcher
[karma ie]: https://github.com/karma-runner/karma-ie-launcher
[karma fox]: https://github.com/karma-runner/karma-firefox-launcher
[karma safari]: https://github.com/karma-runner/karma-safari-launcher
[md pp]: https://github.com/jreese/markdown-pp
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[package]: https://github.com/bbody/CMD-Resume/blob/master/package.json
[pugjs]: https://github.com/pugjs/pug
[travis ci]: https://travis-ci.org/
[travis lint]: https://github.com/travis-ci/travis.rb#lint
[webdriverio]: http://webdriver.io/
[yaml lint]: https://github.com/rasshofer/yaml-lint
