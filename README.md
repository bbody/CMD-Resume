[![Build Status][travis build img]][travis]
[![Maintainability][maintain img]][maintain]
[![Test Coverage][test cover img]][test cover]
[![devDependencies Status][devdep img]][devdep]
[![npm version][npm version img]][npm version]
[![BrowserStack Status][browserstack img]][browserstack]

[browserstack]: https://www.browserstack.com/automate/public-build/TXJtSnFra2t1em56djV0cDNHbXBWQ0F1S2ZwWFNndG0rQTlySU5YaUZaUT0tLTFsTlp3ZUcrT29rMUNPcXhtbHRpNXc9PQ==--8f9c890ea5f00b2700273a981af403651fea3f65
[browserstack img]: https://www.browserstack.com/automate/badge.svg?badge_key=TXJtSnFra2t1em56djV0cDNHbXBWQ0F1S2ZwWFNndG0rQTlySU5YaUZaUT0tLTFsTlp3ZUcrT29rMUNPcXhtbHRpNXc9PQ==--8f9c890ea5f00b2700273a981af403651fea3f65
[devdep]: https://david-dm.org/bbody/cmd-resume?type=dev
[devdep img]: https://david-dm.org/bbody/cmd-resume/dev-status.svg
[maintain]: https://codeclimate.com/github/bbody/CMD-Resume/maintainability
[maintain img]: https://api.codeclimate.com/v1/badges/245ed2739858462f5337/maintainability
[npm version]: https://badge.fury.io/js/cmd-resume
[npm version img]: https://badge.fury.io/js/cmd-resume.svg
[test cover]: https://codeclimate.com/github/bbody/CMD-Resume/test_coverage
[test cover img]: https://api.codeclimate.com/v1/badges/245ed2739858462f5337/test_coverage
[travis build img]: https://travis-ci.org/bbody/CMD-Resume.svg?branch=master
[travis]: https://travis-ci.org/bbody/CMD-Resume

# CMD Resume
## Description
CMD-Resume is a Javascript based command line for demonstrating your resume.
[Here][cmd example] is an example of a resume in a command line.

![CMD Resume Screenshot][cmd example image]

## Setup
### Prerequisites
- [jQuery 3.X.X][jquery]
- [jQuery Terminal 2.0.1][jquery terminal]
- [Keyboard Polyfill][polyfill]

### Steps
1. Include [jQuery][]
2. Include [Keyboard Polyfill][polyfill]
3. Include [jQuery Terminal][]
4. Download *cmd-resume.js* ([Download latest version here][version])
5. Create a [JSON Resume][] file and upload to a remote directory or add to
   your website project
6. \[Optional] Create a
   ([custom CMD Resume data file and extra commands][schema]) and upload to a
   remote directory or add to your website project
7. Initialize CMD Resume. **Note:** Settings and CMD Resume custom data are
   both optional variables
   !INCLUDECODE "js/examples/example-script.js" (javascript)
8. Upload to website

## Browser Compatibility
| ![Chrome][] | ![Firefox][] | ![Edge][] | ![Safari][] | ![Opera][] | ![IE][]   |
|:-----------:|:------------:|:---------:|:-----------:|:----------:|:---------:|
| 70 - 68 ✔   | 63 - 61 ✔    | 17 - 15 ✔ | 12 - 10 ✔   | 56 - 54 ✔  | 11 - 10 ✔ |

Assets from [Browser Logos][].

Currently only unit tests are run on [BrowserStack][].

[browser logos]: https://github.com/alrra/browser-logos
[browserstack]: https://www.browserstack.com/
[chrome]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[edge]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png
[firefox]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[ie]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer-tile_10-11/internet-explorer-tile_10-11_48x48.png
[opera]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png
[safari]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png

## Bugs and suggestions
If you find any bugs or have any suggestions on how to improve CMD Resume please
post in the [Github issues][issues].

## How to contribute
If you wish to work on existing issues please check out the
[Github issues][issues].

If you wish to contribute feel please read the [Contribution Guide][contribute].

[cmd example]: http://cmd-resume.bbody.io/
[cmd example image]: https://raw.githubusercontent.com/bbody/CMD-Resume/master/docs/images/output.gif "CMD Resume Screenshot"
[contribute]: CONTRIBUTING.md
[issues]: https://github.com/bbody/CMD-Resume/issues
[jquery]: https://jquery.com/
[jquery mousewheel]: https://github.com/jquery/jquery-mousewheel
[jquery terminal]: http://terminal.jcubic.pl/
[json resume]: https://jsonresume.org/
[polyfill]: https://rawgit.com/inexorabletash/polyfill/master/keyboard.js
[schema]: CMD-RESUME-DATA-SCHEMA.md
[version]: https://github.com/bbody/CMD-Resume/releases/latest
