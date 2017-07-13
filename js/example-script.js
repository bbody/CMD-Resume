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
        }
    };
    $("body").CMDResume("responses/details.json", "responses/extra-details.json", settings);
});