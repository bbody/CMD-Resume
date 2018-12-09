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