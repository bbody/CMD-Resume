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
        extraDetails: "responses/extra-details.json",
        customCommands: [
            {
                name: "spiritanimal",
                title: "Spirit Animal",
                description: "the animal I most identify with",
                type: "basic",
                data: ["extra", "spiritanimal"]
            },
            {
                name: "geolocation",
                title: "Geolocation",
                description: "checks if geolocation is enabled",
                type: "system",
                handler: function() {
                    return "Geolocation is " + (navigator.geolocation ?  "" : "not ") +
                        "supported for this browser";
                }
            },
            {
                name: "projectyears",
                title: "Project Years",
                description: "years since the project started",
                type: "calculated",
                data: ["extra", "project_start"],
                dataIsObject: true,
                handler: function(value) {
                    var startYear = (new Date(value.unixtime)).getFullYear();
                    var endYear = (new Date()).getFullYear();
                    return "Started " + (endYear - startYear) + " years ago to " + value.motivation;
                }
            },
            {
                name: "countries",
                title: "Countries",
                description: "countries that I've been to",
                type: "array",
                data: ["extra", "countriestravelledto"],
                handlers: {
                    organisation: function(value) {
                        return value.name;
                    },
                    title: function(value) {
                        return value.cities.join(", ");
                    },
                    date: function(value) {
                        return value.timeperiod;
                    }
                }
            },
            {
                name: "location",
                title: "Location",
                description: "current location",
                type: "calculated",
                data: ["basics", "location"],
                dataIsObject: true,
                handler: function(data) {
                    return "The great city of " + data.city;
                }
            }
        ]
    };
    $("body").CMDResume("responses/details.json", settings);
});
```
8. Upload to website

## Browser Compatibility
### Unit Tests
| ![Chrome][] | ![Firefox][] | ![Edge][] | ![Safari][] | ![Opera][] | ![IE][]   |
|:-----------:|:------------:|:---------:|:-----------:|:----------:|:---------:|
| Latest 3 ✔   | Latest 3 ✔    | Latest 3 ✔ | Latest 3 ✔   | Latest 3 ✔  | 11 - 10 ✔ |

### UI Tests
| ![Chrome][] | ![Firefox][] | ![Edge][] | ![Safari][] |
|:-----------:|:------------:|:---------:|:-----------:|
| Latest ✔   | Latest ✔    | Latest ✔ | Latest ✔   |

Assets from [Browser Logos][].

[browser logos]: https://github.com/alrra/browser-logos
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
