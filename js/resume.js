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

String.prototype.capitalizeFirstLetter = function(){
    var temp = this.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    return temp;
}

//---------- General helper functions ----------\\

// Get the first item in the array
function getTop(array){
    return (array[0].join()).replaceAll(",","\t");
}

// Get everything in the array and add to result
function getAll(result, array){ 
    array.map( function(item) {
        result += (item.join()).replaceAll(",","\t");
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

    return result;
}

function setTitle(string){
    return setFormat(string, "red", true);
}

function setCommand(string){
    return setFormat(string, "white", false, true);
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

function isNotEmpty(string){
    if (string == undefined || string == null || string.length == 0){
        return false;
    } else {
        return true;
    }
};

function isNotEmptyArray(array){
    if (array == null || array.length == 0){
        return false;
    } else {
        return true;
    }
};

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
        var githubFullUrl = 'https://api.github.com/users/' + githubUsername + '/repos?callback=?';
        $.getJSON(githubFullUrl, function(response){
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
    var result = setTitle("Social Media:");
    socialMedia.map(function(item){
        if (isNotEmpty(item[1])){
            result += "\n";
            result += item[0] + " - " + item[1];
        }
    });
    return result;
}

CMDResume.hasSocialMedia = function(){
    return isNotEmptyArray(socialMedia);
}

// Return a list of skills in a table
CMDResume.getSkillTable = function(){ 
    var result = "\t\t\t|\tProficient\t|\tExperienced\t|\tFamiliar\n";
    result += "Languages\t|" + getRequired(skillsLanguages).join().replaceAll(",","\t|\t") + "\n";
    result += "Tools\t|" + getRequired(skillsTools).join().replaceAll(",","\t|\t") + "\n";
    result += "Concepts\t|" + getRequired(skillsConcepts).join().replaceAll(",","\t|\t");

    return result;
}

CMDResume.hasSkillTable = function(){
    return isNotEmptyArray(skillsLanguages) 
        || isNotEmptyArray(skillsTools) 
        || isNotEmptyArray(skillsConcepts);
}

// Update page title to Resume owners name
CMDResume.updateTitle = function(){
    if (isNotEmpty(name)){
        document.title = name + "'s Résumé";
    }
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

    var response = this.commandFunctionMap[formattedCommand];

    if ($.isFunction(response)){
        return response();
    } else {
        return response;
    }
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
CMDResume.init = function(tag){
    // Update page title
    this.updateTitle();
    this.initVariables();

    // Command Line Settings
    this.settings =
    {
        greetings: CMDResume.getSplash() + "\n",
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        completion: CMDResume.commandMap.getKeys()

    };

    // Pre-call Github
    if (isNotEmpty(githubUsername)){
        this.getGithub();    
    }
    

    $(tag).terminal(function(command, term) {
        term.echo(CMDResume.commandLineParse(command) + "\n");
    }, 
    this.settings);
};

CMDResume.getSplash = function(){
    var welcome = "";
    // Splash screen
    if (this.hasSplash){
        welcome = splash;    
    }
    
    if (isNotEmpty(name)){
        welcome += "Welcome to " + name + "'s résumé.\n";
    } else {
        welcome += "Welcome to my résumé.\n";
    }
    
    welcome += "Type ";
    welcome += setCommand("help");
    welcome +=" for commands"

    return welcome;
};

CMDResume.setCommand = function(command, information, method, data){

        if (isNotEmpty(data)){
            this.commandMap[command] = information;
            this.commandFunctionMap[command] = method;
        }
};

CMDResume.setArrayCommand = function(command, information, data){
    if (isNotEmptyArray(data)){
        this.commandMap[command] = information + " [-top]";
        this.commandFunctionMap[command] = getAll(command.capitalizeFirstLetter() + ":\n", data);
        this.commandFunctionMap[command + " -top"] = getTop(data);
    }
};

// Initialize variables
CMDResume.initVariables = function(){
    this.hasSplash = false;
    
    this.commandMap["splash"] = "print the welcome screen.";
    this.commandFunctionMap["splash"] = this.getSplash();

    // Clear screen
    this.commandMap["clear"] = "clear command history from screen.";

    // Github
    this.setCommand("github", "list Github repositories.", this.getGithub, githubUsername);

    // Name
    this.setCommand("name", "owner of the résumé.", name, name);

    // PDF
    this.setCommand("pdf", "pdf version of the résumé.", this.pdf, pdfLink);

    // Looking for
    this.setCommand("lookingfor", "looking for.", lookingfor, lookingfor);

    // Location
    this.setCommand("location", "current location.", loc, loc);

    // PGP Key
    this.setCommand("pgpkey", "my public PGP key.", publicPGPkey, publicPGPkey);


    // Education
    this.setArrayCommand("education", "education history.", education);

    // Employment
    this.setArrayCommand("employment", "employment history.", employment);

    // Volunteering
    this.setArrayCommand("volunteering", "volunteering history.", volunteering);

    // Awards
    this.setArrayCommand("awards", "awards obtained.", awards);

    // Memberships
    this.setArrayCommand("membership", "membership obtained.", membership);

    // Social Media
    if (this.hasSocialMedia()){
        this.commandMap["socialmedia"] = "Social Media profiles.";
        this.commandFunctionMap["socialmedia"] = this.getSocialMedia();
    }

    // Skills
    this.initSkills();
};

CMDResume.initSkills = function(){
    if (this.hasSkillTable()){
        var skillSubCategories = "";
        
        // Skills - languages
        if (isNotEmptyArray(skillsLanguages)){
            this.commandFunctionMap["skills -l"] = getAll("Languages:\n", skillsLanguages);
            this.commandFunctionMap["skills -languages"] = this.commandFunctionMap["skills -l"];
            skillSubCategories += "[-languages|l]";
        }
        
        // Skills -technologies
        if (isNotEmptyArray(skillsTools)){
            this.commandFunctionMap["skills -t"] = getAll("Tools:\n", skillsTools);
            this.commandFunctionMap["skills -tools"] = this.commandFunctionMap["skills -t"];
            skillSubCategories += "[-tools|t]";
        }

        // Skills - concepts
        if (isNotEmptyArray(skillsConcepts)){
            this.commandFunctionMap["skills -c"] = getAll("Concepts:\n", skillsConcepts);
            this.commandFunctionMap["skills -concepts"] = this.commandFunctionMap["skills -c"];
            skillSubCategories += "[-concepts|c]"
        }

        // Skills in total
        this.commandMap["skills"] = "skills obtained. " + skillSubCategories;
        this.commandFunctionMap["skills"] = this.getSkillTable();
    }
}

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
    var commands = setTitle("Available Commands:");

    for(var key in this) {
        
        if( typeof this[key] !== 'function') {
            commands += "\n";
            commands += setCommand(key) + " - " + this[key];
        }
        
    }
    return commands;
};

