[![Build Status](https://travis-ci.org/bbody/CMD-Resume.svg?branch=master)](https://travis-ci.org/bbody/CMD-Resume)
[![Maintainability](https://api.codeclimate.com/v1/badges/245ed2739858462f5337/maintainability)](https://codeclimate.com/github/bbody/CMD-Resume/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/245ed2739858462f5337/test_coverage)](https://codeclimate.com/github/bbody/CMD-Resume/test_coverage)
[![devDependencies Status](https://david-dm.org/bbody/cmd-resume/dev-status.svg)](https://david-dm.org/bbody/cmd-resume?type=dev)
[![npm version](https://badge.fury.io/js/cmd-resume.svg)](https://badge.fury.io/js/cmd-resume)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=TXJtSnFra2t1em56djV0cDNHbXBWQ0F1S2ZwWFNndG0rQTlySU5YaUZaUT0tLTFsTlp3ZUcrT29rMUNPcXhtbHRpNXc9PQ==--8f9c890ea5f00b2700273a981af403651fea3f65)](https://www.browserstack.com/automate/public-build/TXJtSnFra2t1em56djV0cDNHbXBWQ0F1S2ZwWFNndG0rQTlySU5YaUZaUT0tLTFsTlp3ZUcrT29rMUNPcXhtbHRpNXc9PQ==--8f9c890ea5f00b2700273a981af403651fea3f65)
# CMD Resume
## Description
CMD-Resume is a Javascript based command line for demonstrating your resume. [Here](http://cmd-resume.bbody.io/) is an example of a resume in a command line.

![CMD Resume Screenshot](https://raw.githubusercontent.com/bbody/CMD-Resume/master/docs/images/output.gif "CMD Resume Screenshot")

## Setup
### Prerequisites
- [jQuery 3.X.X](https://jquery.com/)
- [jQuery Terminal 2.0.1](http://terminal.jcubic.pl/)
- [Keyboard Polyfill](https://rawgit.com/inexorabletash/polyfill/master/keyboard.js)

### Steps
1. Include [jQuery](https://jquery.com/)
2. Include [Keyboard Polyfill](https://rawgit.com/inexorabletash/polyfill/master/keyboard.js)
3. Include [jQuery Terminal](http://terminal.jcubic.pl/)
4. Download *cmd-resume.js* ([Download latest version here](https://github.com/bbody/CMD-Resume/releases/latest))
5. Create a [JSON Resume](https://jsonresume.org/) file and upload to a remote directory or add to your website project
6. [Optional] Create a custom CMD Resume data file ([Schema here](CMD-RESUME-DATA-SCHEMA.md)) and upload to a remote directory or add to your website project
7. Initialize CMD Resume. **Note:** Settings and CMD Resume custom data are both optional variables
```javascript
$(document).ready(function() {
    var settings = {
        showForks: false,
        title: {
            color: "white",
            bold: false,
            italic: true
        },
        command: {
            color: "green",
            bold: true,
            italic: false,
            backgroundColor: "pink"
        },
        name: {
            color: "purple"
        },
        extraDetails: "responses/extra-details.json"
    };
    $("body").CMDResume("responses/details.json", settings);
});
```
8. Upload to website

## Browser Compatibility
![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer-tile_10-11/internet-explorer-tile_10-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
70 - 68 ✔ | 63 - 61 ✔ | 17 - 15 ✔ | 12 - 10 ✔ | 56 - 54 ✔ | 11 - 10 ✔ |

Assets from [Browsers Logos](https://github.com/alrra/browser-logos).

Currently only unit tests are run currently on [BrowserStack](https://www.browserstack.com/).
## Bugs and suggestions
If you find any bugs or have any suggestions on how to improve CMD Resume please post in the [Github issues](https://github.com/bbody/CMD-Resume/issues).

## How to contribute
If you wish to work on existing issues please check out the [Github issues](https://github.com/bbody/CMD-Resume/issues).

If you wish to contribute feel please read the [Contribution Guide](CONTRIBUTING.md).
