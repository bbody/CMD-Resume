//---------- String helper functions ----------\\

// Replace any occurances of a string with substring
String.prototype.replaceAll = function(search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
        return this;

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};

// String comparison for better readability
String.prototype.is = function(comparison){
    return ("" + this) === comparison;
};

//---------- General helper functions ----------\\

// Get the first item in the array
function getTop(array){
    return (array[0].join()).replaceAll(",","\t");
}

// Get everything in the array and add to result
function getAll(result, array){ 
    array.map( function(item) {
        result += (item.join()).replaceAll(",","\t") + "\n";
    });
    return result;
}

// Return colour
function setFormat(string, color = null, bold = false, italic = false, backgroundColor = null){
    var result = "[[";
    if (bold){
        result += "b"
    }
    if (italic){
        result += "i"
    }
    if (color != null){
        if (bold || italic){
            result += ";";
        }
        result += color;
    }
    if (backgroundColor != null){
        if (bold || italic || color != null){
            result += ";";
        }
        result += backgroundColor;
    } else {
        if (bold || italic || color != null){
            result += ";";
        }
        
        result += "#000";    
    }

    result += "]";
    result += string;
    result += "]";

    console.log(result);

    return result;
}

// Map skills
function getRequired(skillList){
    var result = [];
    var i = 0;
    skillList.map(function(item){
        result[i] = item[1];
        i++;
    });
    return result;
}

//---------- Resume Code ----------\\
var CMDResume = {};

// Command Storage
CMDResume.commandMap = {};
CMDResume.commandFunctionMap = {};

// External service caches
CMDResume.githubCache = "";

// Get the Github information
CMDResume.getGithub = function(results){
    if (this.githubCache == ""){
        var mess = "Repositories:\n";
        var list = [];
        $.getJSON('https://api.github.com/users/'+githubUsername+'/repos?callback=?', function(response){
            var repos = response.data;

            $(repos).each(function() {
                if (this != undefined){
                    var message = this.name;
                    if ((this.description != undefined) && (this.description.length > 0)){
                            message += " - " + this.description;
                        }

                    message += "\n";

                    if (this.name != (githubUsername.toLowerCase()+'.github.com')) { //
                        if (!showForks && (this.fork == false)){
                            list.push(message);
                            mess += message;
                        } else if (showForks){
                            list.push(message);
                            mess += message;
                        }
                    }
                } else {
                    console.log(repos.meta);
                    if (data.meta.status == '403'){
                        mess += "Too many requests"
                    } else {
                       mess += "No repositories found."
                   }
               }
            });
            CMDResume.githubCache = mess;
            return CMDResume.githubCache;
        });
    }

    return this.githubCache;
};

// Open up a linked (resume) in a new window
CMDResume.pdf = function(){
    window.open(pdfLink);
    return "Hint: May need to allow pop-ups.";
}

// Return social media information
CMDResume.getSocialMedia = function(){
    var result = "Social Media:\n";
    socialMedia.map(function(item){
        if (item[1].length > 0){
            result += item[0] + " - " + item[1] + "\n";
        }
    });
    return result;
}

// Return a list of skills in a table
CMDResume.getSkillTable = function(){ 
    var result = "\t\t\t|\tProficient\t|\tExperienced\t|\tFamiliar\n";
    result += "Languages\t|" + getRequired(skillsLanguages).join().replaceAll(",","\t|\t") + "\n";
    result += "Tools\t|" + getRequired(skillsTools).join().replaceAll(",","\t|\t") + "\n";
    result += "Concepts\t|" + getRequired(skillsConcepts).join().replaceAll(",","\t|\t") + "\n";

    return result;
}

// Update page title to Resume owners name
CMDResume.updateTitle = function(){
    document.title = name + "'s Résumé";
}

// Run man command
CMDResume.runMan = function(command){
    if (!command){
        return "man: No command entered.";
    } else if (commandFunctionMap[command] != undefined){
        return command + " - " + commandMap[command];
    } else {
        return "man: `" + command + "` is an unknown command.";
    }
};

// Run the command
CMDResume.runCommand = function(command, top = false){
    var formattedCommand = command;
    
    if (top){
        formattedCommand += " -top";
    }

    return this.commandFunctionMap[formattedCommand];
};

// Parse command line
CMDResume.commandLineParse = function(input){
    var commandList = input.toLowerCase().split(" ");
    
    // Command sections
    var rootCommand = commandList[0] != undefined ? commandList[0] : false;
    var stemCommand = commandList[1] != undefined && commandList[1].length > 0 ? commandList[1] : false;

    if (rootCommand.is("help")){
        return this.commandMap.getCommandList();
    } else if (rootCommand.is("man")){
        return this.runMan(stemCommand);
    } else if (rootCommand.is("skills")){
        if (stemCommand){
            var fullCommand = rootCommand + " " + stemCommand;
            if (fullCommand in this.commandFunctionMap){
                return this.commandFunctionMap[fullCommand];
            } else {
                return "Warning: Invalid arguments";
            }
        } else {
            return this.commandFunctionMap[rootCommand];
        }
    } else if (this.commandFunctionMap.hasCommand(rootCommand)){
        return this.runCommand(rootCommand, stemCommand == "-top");   
    } else {
        if (rootCommand.length > 0){
            return "`" + rootCommand + "` is an unknown command.";
        } else {
            return "No command entered.";
        }
    }

    return "";
};

// Initialize class
CMDResume.init = function(){
    // Update page title
    this.updateTitle();
    this.initVariables();

    // Command Line Settings
    this.settings =
    {
        greetings: CMDResume.getSplash(),
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        completion: CMDResume.commandMap.getKeys()

    };

    // Pre-call Github
    this.getGithub();

    $('body').terminal(function(command, term) {
        term.echo(CMDResume.commandLineParse(command));
    }, 
    this.settings);
};

CMDResume.getSplash = function(){
    var welcome = "";
    // Splash screen
    if (this.hasSplash){
        welcome = splash;    
    }

    welcome += "Welcome to " + name + "'s résumé.\n";
    welcome += "Type ";
    welcome += setFormat("help", "white", true);
    welcome +=" for commands\n"

    return welcome;
};

// Initialize variables
CMDResume.initVariables = function(){
    this.hasSplash = false;
    
    this.commandMap["splash"] = "print the welcome screen.";
    this.commandFunctionMap["splash"] = this.getSplash();

    // Clear screen
    this.commandMap["clear"] = "clear command history from screen.";

    // Github
    this.commandMap["github"] = "list Github repositories.";
    this.commandFunctionMap["github"] = this.getGithub;

    // Name
    this.commandMap["name"] = "owner of the résumé.";
    this.commandFunctionMap["name"] = name;

    // PDF
    this.commandMap["pdf"] = "pdf version of the resume.";
    this.commandFunctionMap["pdf"] = this.pdf;

    // Looking for
    this.commandMap["lookingfor"] = "looking for.";
    this.commandFunctionMap["lookingfor"] = lookingfor;

    // Location
    this.commandMap["location"] = "current location.";
    this.commandFunctionMap["location"] = loc;

    // Education
    this.commandMap["education"] = "education history. [-top]";
    this.commandFunctionMap["education -top"] = getTop(education);
    this.commandFunctionMap["education"] = getAll("Education:\n", education);

    // Employment
    this.commandMap["employment"] = "employment history. [-top]";
    this.commandFunctionMap["employment -top"] = getTop(employment);
    this.commandFunctionMap["employment"] = getAll("Employment:\n", employment);

    // Volunteering
    this.commandMap["volunteering"] = "volunteering history. [-top]";
    this.commandFunctionMap["volunteering -top"] = getTop(volunteering);
    this.commandFunctionMap["volunteering"] = getAll("Volunteering:\n", volunteering);

    // Awards
    this.commandMap["awards"] = "awards obtained.";
    this.commandFunctionMap["awards"] = getAll("Awards:\n", awards);

    // Memberships
    this.commandMap["membership"] = "membership obtained.";
    this.commandFunctionMap["membership"] = getAll("Professional membership:\n", membership);

    // PGP Key
    this.commandMap["pgpkey"] = "my public PGP key.";
    this.commandFunctionMap["pgpkey"] = publicPGPkey;

    // Social Media
    this.commandMap["socialmedia"] = "Social Media profiles.";
    this.commandFunctionMap["socialmedia"] = this.getSocialMedia();

    // Skills
    this.commandMap["skills"] = "skills obtained. [-languages|l][-tools|t][-concepts|c]";
    this.commandFunctionMap["skills"] = this.getSkillTable();

    // Skills - languages
    this.commandFunctionMap["skills -l"] = getAll("Languages:\n", skillsLanguages);
    this.commandFunctionMap["skills -languages"] = this.commandFunctionMap["skills -l"];
    
    // Skills -technologies
    this.commandFunctionMap["skills -t"] = getAll("Tools:\n", skillsTools);
    this.commandFunctionMap["skills -tools"] = this.commandFunctionMap["skills -t"];

    // Skills - concepts
    this.commandFunctionMap["skills -c"] = getAll("Concepts:\n", skillsConcepts);
    this.commandFunctionMap["skills -concepts"] = this.commandFunctionMap["skills -c"];
};

//---------- Object extra functions ----------\\

// Checks if a command is in the function map
CMDResume.commandFunctionMap.hasCommand = function(command){
    if (command == "hasCommand"){
        return false;
    } else {
        return this[command] != undefined;
    }
};

// Get list of functions from command map
CMDResume.commandMap.getKeys = function(){
    var command = [];
    $.map(this, function(element,index) {
        command.push(index);
    });

    return command;
}; 

// Get key list of the command map
CMDResume.commandMap.getCommandList = function (){
    var commands = "Available Commands:\n";
    for(var key in this) {

        if( typeof this[key] !== 'function') {
            commands += key + " - " + this[key] + "\n";
        }
    }
    return commands;
};

