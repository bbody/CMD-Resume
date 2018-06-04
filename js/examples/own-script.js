$(document).ready(function() {
    var settings = {
        showForks: true,
        extraDetails: "../responses/my-extra-details.json"
    };
    
    $("body").CMDResume("https://s3-ap-southeast-2.amazonaws.com/bbody/Details/details.json", settings);
});