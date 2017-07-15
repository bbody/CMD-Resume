$(document).ready(function() {
    var settings = {
        showForks: true
    };
    
    $("body").CMDResume("https://s3-ap-southeast-2.amazonaws.com/bbody/Details/details.json", "../responses/my-extra-details.json", settings);
});