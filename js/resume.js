
function github(username){
    var mess = "Repositories:\n";
    var list = [];

    jQuery.githubUser = function(username, callback) {
        jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback);
    }
    

    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        
        $(repos).each(function() {
            var message = this.name + " - " + this.description + "\n";
            if (this.name != (username.toLowerCase()+'.github.com')) {
               
                list.push(message);
                mess += message;
            }
            
        });
        console.log(mess);
        return mess;
    });
   
 return mess;
}

function pdf(){
    window.open(pdfLink);
    return "Hint: May need to allow pop-ups.";
}

