# CMD Resume
## Description
CMD-Resume is a Javascript based command line for demonstrating your resume. [Here](https://www.brendonbody.com/CMD-Resume/) is an example of a resume in a command line.

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
6. [Optional] Create a custom CMD Resume data file ([Schema here]()) and upload to a remote directory or add to your website project
7. Initialize CMD Resume. **Note:** Settings and CMD Resume custom data are both optional variables ```
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
        }
    };
	$("body").CMDResume("uri/path/to/json-resume.json", "uri/path/to/cmd-resume-custom-data.json", settings);
```
8. Upload to website
