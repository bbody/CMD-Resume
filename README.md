# CMD Resume
## Description
CMD-Resume is a Javascript based command line for demonstrating your resume. [Here](https://www.brendonbody.com/CMD-Resume/) is an example of a resume in a command line.

## Screenshot
![CMD Resume Screenshot](https://s3-ap-southeast-2.amazonaws.com/bbody-images/github/cmd-resume/cmd-resume.png
 "CMD Resume Screenshot")

## Setup
### Prerequisites
- [jQuery 2.2.X](https://jquery.com/)
- [jQuery Terminal v0.10.X](http://terminal.jcubic.pl/)

### Steps
1. Include jQuery
2. Include jQuery Terminal
3. Download *details.js* and *resume.js*
4. Update details.js
	1. Update ASCII text ([Multiline string convertor](http://www.valkrysa.com/experiments/multi-line-string-generator/)), remember to escape any special characters
	2. Update detail variables
5. Add the below code snippet:
```javascript
	$(document).ready(function() {
        CMDResume.init('body');      
    });
```

## Road Map
- Version 1
	- ~~Add colouring~~
	- Test cases
	- ASCII Art Convertor

- Version 2
	- JSON call to get details
	- Turn into jQuery Library
