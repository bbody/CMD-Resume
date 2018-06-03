[![Build Status](https://travis-ci.org/bbody/CMD-Resume.svg?branch=master)](https://travis-ci.org/bbody/CMD-Resume)
[![Maintainability](https://api.codeclimate.com/v1/badges/245ed2739858462f5337/maintainability)](https://codeclimate.com/github/bbody/CMD-Resume/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/245ed2739858462f5337/test_coverage)](https://codeclimate.com/github/bbody/CMD-Resume/test_coverage)

# CMD Resume
## Description
CMD-Resume is a Javascript based command line for demonstrating your resume. [Here](http://cmd-resume.bbody.io/) is an example of a resume in a command line.

![CMD Resume Screenshot](https://s3-ap-southeast-2.amazonaws.com/bbody-images/github/cmd-resume/cmd-resume.png
 "CMD Resume Screenshot")

## Setup
### Prerequisites
- [jQuery 3.1.1](https://jquery.com/)
- [jQuery Terminal v0.11.23](http://terminal.jcubic.pl/)
- [jQuery Mousewheel v3.1.13](https://github.com/jquery/jquery-mousewheel)

### Steps
1. Include [jQuery](https://jquery.com/)
2. Include [jQuery Terminal](http://terminal.jcubic.pl/)
3. Include [jQuery Mousewheel](https://github.com/jquery/jquery-mousewheel)
4. Download *cmd-resume.js* ([Download v3 here](https://github.com/bbody/CMD-Resume/releases/latest))
5. Create a [JSON Resume](https://jsonresume.org/) file and upload to a remote directory or add to your website project
6. [Optional] Create a custom CMD Resume data file ([Schema here](CMD-RESUME-DATA-SCHEMA.md)) and upload to a remote directory or add to your website project
7. Initialize CMD Resume. **Note:** Settings and CMD Resume custom data are both optional variables
```javascript
var settings = {
    showForks: false, // For Github
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
    extraDetails: "uri/path/to/cmd-resume-custom-data.json"
};

$("body").CMDResume("uri/path/to/json-resume.json", settings);
```
8. Upload to website


## Bugs and suggestions
If you find any bugs or have any suggestions on how to improve CMD Resume please post in the [Github issues](https://github.com/bbody/CMD-Resume/issues).

## How to contribute
If you wish to work on existing issues please check out the [Github issues](https://github.com/bbody/CMD-Resume/issues).

If you wish to contribute feel please read the [Contribution Guide](CONTRIBUTING.md).
