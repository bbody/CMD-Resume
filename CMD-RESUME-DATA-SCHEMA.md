# Optional Information

Outside of the [JSON Resume][] specifications some
additional data can be provided.

## Properties

-   github: A Github user name (string, optional) - will overwrite the social
    media profile Github (If it exists)

-   pgpkey: A PGP Key separated into lines (array\[string], optional)

-   pdf: A link to a PDF resume (string, optional) - will overwrite the social
    media profile resume (If it exists)

-   splash: A ASCII splash screen split into lines (array\[string], optional)

*Note:* Ensure strings are properly escaped, please
[validate JSON][json lint] first.

[Example file][example], or below:

```json
{
	"github": "example",
	"pgpkey": [
		"-----BEGIN PGP PUBLIC KEY BLOCK-----",
		"Version: BCPG C# v1.6.1.0",
		"",
		"mQENBFfTy6QBCACnidKsby4bQGwzUrX2Fc6KZaWILFaMKH9bpqhYX4RHzv1IOdLD",
		"g+80BYpCEmgtC4qjr4BkeyHBdmXgGyk3j0S3cmafl2H6sg4UCuwR6mvEoKUlpiM8",
		"Df5g0uU0LKKiYRrHIl0+pRDaJVk/FHWV/D/euS5AWXlcLibVKK2n83wPINbCGz1Z",
		"V6bNOUIEXFPJ+XgBDjB0wzqjdmnTGYpMJqtDvKEsORC5X2jIzJ/rtyIlZDIATUGF",
		"PHwM3w6IjA7rxVzx2RCf0aCdc/8/EB2LNZfMW1+607hdNAWclloEnkvdhk/YHEpk",
		"CKB81NHGva3xDdVRlCk47f8IzfFl5kmmd9O/ABEBAAG0AIkBHAQQAQIABgUCV9PL",
		"pAAKCRA2foQTPrrKzbjMB/9vVs2tEEiV8wPrGjNJ+Pgm5JPMwm93P9ef0BavyVtP",
		"z3FN7KMY413KMeNOUN3L9RGKNvA3SA42s3t3wrg/iKpxWgJW8Kqb4CviJz65xX8f",
		"WaSiG90mkKCjoG12Wiiw3AXikaFdLtO3yASjO0W5zHHPy8B0g4MfjTVMtOd4GOfH",
		"xxYAUcd5TwgX0/7zgrfN+fCJ9lEjiO8uPol2sRPHSsgtp6oifsGvqiqT+ckqweD4",
		"pdi7YDQPwYcU03SRJWLUqJkIj9XsC8lvqnUIjDji1Ytqp7rxt5P7X741l09Vbo+s",
		"tpyTch5Ey68PqHFIUqLUprNv+izUhbDF/X/vPv3BtnTg",
		"=a7Um",
		"-----END PGP PUBLIC KEY BLOCK-----"
	],
	"pdf": "",
	"splash": [
		"                 _________________",
		"                /                /|",
		"               /                / |",
		"              /________________/ /|",
		"           ###|      ____      |//|",
		"          #   |     /   /|     |/.|",
		"         #  __|___ /   /.|     |  |_______________",
		"        #  /      /   //||     |  /              /|                  ___",
		"       #  /      /___// ||     | /              / |                 / \\ \\",
		"       # /______/!   || ||_____|/              /  |                /   \\ \\",
		"       #| . . .  !   || ||                    /  _________________/     \\ \\",
		"       #|  . .   !   || //      ________     /  /\\________________  {   /  }",
		"       /|   .    !   ||//~~~~~~/   0000/    /  / / ______________  {   /  /",
		"      / |        !   |'/      /9  0000/    /  / / /             / {   /  /",
		"     / #\\________!___|/      /9  0000/    /  / / /_____________/___  /  /",
		"    / #     /_____\\/        /9  0000/    /  / / /_  /\\_____________\\/  /",
		"   / #                      ``^^^^^^    /   \\ \\ . ./ / ____________   /",
		"  +=#==================================/     \\ \\ ./ / /.  .  .  \\ /  /",
		"  |#                                   |      \\ \\/ / /___________/  /",
		"  #                                    |_______\\__/________________/",
		"  |                                    |               |  |  / /       ",
		"  |                                    |               |  | / /       ",
		"  |                                    |       ________|  |/ /________       ",
		"  |                                    |      /_______/    \\_________/\\       ",
		"  |                                    |     /        /  /           \\ )       ",
		"  |                                    |    /OO^^^^^^/  / /^^^^^^^^^OO\\)       ",
		"  |                                    |            /  / /        ",
		"  |                                    |           /  / /",
		"  |                                    |          /___\\/",
		"  |hectoras                            |           oo",
		"  |____________________________________|"
	],
	"spiritanimal": "Cassowary",
    "countriestravelledto": [
	    {
	        "name": "USA",
	        "cities": ["Chicago", "New York", "Los Angeles"],
	        "timeperiod": "2018"
	    },
	    {
	        "name": "Canada",
	        "cities": ["Toronto", "Vancouver"],
	        "timeperiod": "2017"
	    },
	    {
	        "name": "Australia",
	        "cities": ["Brisbane", "Sydney", "Melbourne"],
	        "timeperiod": "All my life"
	    }
	],
	"project_start": {
		"unixtime": 1378645853000,
		"motivation": "try and find a job"
	}
}
```

## Extra commands

Extra commands can be used to add extra functionality, leveraged with optional
information you can extend the functionality of CMD Resume to fit your own
unique circumstances.

### API
#### Types of commands

-   `basic` - a basic command that will just return the string value of data
    argument

-   `system` - a command that will not rely on any data and purely uses the
    browse or jQuery Terminal API

-   `calculated` - a command that will perform a basic operation on the data
    argument

-   `array` - a command that will take an array and perform a series of
    operations to display it

#### Required parameters

| type       | name | title | description | data | handler | handlers |
| ---------- |:----:|:-----:|:-----------:|:----:|:-------:|:--------:|
| basic      | ✔    | -     | ✔           | ✔    | ✖       | ✖        |
| system     | ✔    | -     | ✔           | ✖    | ✔       | ✖        |
| calculated | ✔    | -     | ✔           | ✔    | ✔       | ✖        |
| array      | ✔    | -     | ✔           | ✔    | ✖       | ✔        |

*Note:* `title` is never a required field and will default to the same value as
`name`

### Overriding commands

Standard commands can be overwritten very easily by ensuring they have the same
name. For example, location in the below example.

### Example

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

[example]: https://github.com/bbody/CMD-Resume/blob/master/responses/extra-details.json
[json lint]: https://jsonlint.com/
[json resume]: https://jsonresume.org/
