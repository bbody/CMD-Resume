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
var resume = {};

// Command Storage
resume.commandMap = {};
resume.commandFunctionMap = {};

// External service caches
resume.githubCache = "";

// Get the Github information
resume.getGithub = function(results){
    if (resume.githubCache == ""){
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
            resume.githubCache = mess;
            return resume.githubCache;
        });
    }

    return resume.githubCache;
};

// Open up a linked (resume) in a new window
resume.pdf = function(){
    window.open(pdfLink);
    return "Hint: May need to allow pop-ups.";
}

// Return social media information
resume.getSocialMedia = function(){
    var result = "Social Media:\n";
    socialMedia.map(function(item){
        if (item[1].length > 0){
            result += item[0] + " - " + item[1] + "\n";
        }
    });
    return result;
}

// Return a list of skills in a table
resume.getSkillTable = function(){ 
    var result = "\t\t\t|\tProficient\t|\tExperienced\t|\tFamiliar\n";
    result += "Languages\t|" + getRequired(skillsLanguages).join().replaceAll(",","\t|\t") + "\n";
    result += "Tools\t|" + getRequired(skillsTools).join().replaceAll(",","\t|\t") + "\n";
    result += "Concepts\t|" + getRequired(skillsConcepts).join().replaceAll(",","\t|\t") + "\n";

    return result;
}

// Update page title to Resume owners name
resume.updateTitle = function(){
    document.title = name + "'s Résumé";
}

// Run man command
resume.runMan = function(command){
    if (!command){
        return "man: No command entered.";
    } else if (commandFunctionMap[command] != undefined){
        return command + " - " + commandMap[command];
    } else {
        return "man: `" + command + "` is an unknown command.";
    }
};

// Run the command
resume.runCommand = function(command, top = false){
    var formattedCommand = command;
    
    if (top){
        formattedCommand += " -top";
    }

    return resume.commandFunctionMap[formattedCommand];
};

// Parse command line
resume.commandLineParse = function(input){
    var commandList = input.toLowerCase().split(" ");
    
    // Command sections
    var rootCommand = commandList[0] != undefined ? commandList[0] : false;
    var stemCommand = commandList[1] != undefined && commandList[1].length > 0 ? commandList[1] : false;

    if (rootCommand.is("help")){
        return resume.commandMap.getCommandList();
    } else if (rootCommand.is("man")){
        return resume.runMan(stemCommand);
    } else if (rootCommand.is("skills")){
        if (stemCommand){
            var fullCommand = rootCommand + " " + stemCommand;
            if (fullCommand in resume.commandFunctionMap){
                return resume.commandFunctionMap[fullCommand];
            } else {
                return "Warning: Invalid arguments";
            }
        } else {
            return resume.commandFunctionMap[rootCommand];
        }
    } else if (resume.commandFunctionMap.hasCommand(rootCommand)){
        return resume.runCommand(rootCommand, stemCommand == "-top");   
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
resume.init = function(){
    // Update page title
    this.updateTitle();
    this.initVariables();
};

// Initialize variables
resume.initVariables = function(){
    // Splash screen
    this.splash = splash;
    this.splash += "Welcome to " + name + "'s résumé.\n";
    this.splash += "Type [[b;#ffffff;#000]help] for commands\n"
    this.commandMap["splash"] = "print the welcome screen.";
    this.commandFunctionMap["splash"] = this.splash;

    // Clear screen
    this.commandMap["clear"] = "clear command history from screen.";

    // Github
    this.commandMap["github"] = "list Github repositories.";
    this.commandFunctionMap["github"] = resume.getGithub;

    // Name
    this.commandMap["name"] = "owner of the résumé.";
    this.commandFunctionMap["name"] = name;

    // PDF
    this.commandMap["pdf"] = "pdf version of the resume.";
    this.commandFunctionMap["pdf"] = resume.pdf;

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
    this.commandFunctionMap["skills -l"] = this.commandFunctionMap["skills -language"] 
        = getAll("Languages:\n", skillsLanguages);
    this.commandFunctionMap["skills -t"] = this.commandFunctionMap["skills -tools"] 
        = getAll("Tools:\n", skillsTools);
    this.commandFunctionMap["skills -c"] = this.commandFunctionMap["skills -concepts"] 
        = getAll("Concepts:\n", skillsConcepts);
};

//---------- Object extra functions ----------\\

// Checks if a command is in the function map
resume.commandFunctionMap.hasCommand = function(command){
    if (command == "hasCommand"){
        return false;
    } else {
        return this[command] != undefined;
    }
};

// Get list of functions from command map
resume.commandMap.getKeys = function(){
    var command = [];
    $.map(this, function(element,index) {
        command.push(index);
    });

    return command;
}; 

// Get key list of the command map
resume.commandMap.getCommandList = function (){
    var commands = "Available Commands:\n";
    for(var key in this) {

        if( typeof this[key] !== 'function') {
            commands += key + " - " + this[key] + "\n";
        }
    }
    return commands;
};

//---------- Initialize ----------\\
function initCMDResume(){
    // Initialize CMD Resume class
    resume.init();

    // Command Line Settings
    resume.settings =
    {
        greetings: resume.splash,
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        completion: resume.commandMap.getKeys()

    };

    // Pre-call Github
    resume.getGithub();
}
