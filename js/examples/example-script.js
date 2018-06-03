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