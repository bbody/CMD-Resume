//---------- String helper functions ----------\\

// Replace any occurances of a string with substring
String.prototype.replaceAll = function(search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if (!replace){
        return this;
    }

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
};

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
function setFormat(string, color, bold, italic, backgroundColor){
    color = typeof color !== 'undefined' ? color: null;
    bold = typeof bold !== 'undefined' ? bold: false;
    italic = typeof italic !== 'undefined' ? italic: false;
    backgroundColor = typeof backgroundColor !== 'undefined' ? backgroundColor: null;

    var result = "[[";
    if (bold){
        result += "b";
    }
    if (italic){
        result += "i";
    }
    if (color != null){
        result += ";";
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

function setName(string){
    return setFormat(string, "green", true);
}

function setPGP(string){
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
}

function isNotEmptyArray(array){
    if (array == null || array.length == 0){
        return false;
    } else {
        return true;
    }
}

//---------- Resume Code ----------\\
var CMDResume = {};

// Command Storage
CMDResume.commandMap = {};
CMDResume.commandFunctionMap = {};

// External service caches
CMDResume.githubCache = "";

// Get the Github information
CMDResume.getGithub = function(){
    console.log("CAlling");
    if (this.githubCache == ""){
        console.log("Cache");
        var mess = setTitle("Repositories:");
        var list = [];
        //var githubFullUrl = ;
        $.getJSON('https://api.github.com/users/' + githubUsername + '/repos?callback=?', function(response){
            var repos = response.data;

            $(repos).each(function() {
                if (this != undefined){
                    var message = "\n" + setName(this.name);
                    if ((this.description != undefined) && (this.description.length > 0)){
                            message += " - " + this.description;
                        }

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
                        mess += "Too many requests.";
                    } else {
                       mess += "No repositories found.";
                   }
               }
            });
            console.log(mess);
            CMDResume.githubCache = mess;
            return CMDResume.githubCache;
        });
    }

    return CMDResume.githubCache;
};

// Open up a linked (resume) in a new window
CMDResume.pdf = function(){
    window.open(pdfLink);
    return "Hint: May need to allow pop-ups.";
};

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
};

CMDResume.hasSocialMedia = function(){
    return isNotEmptyArray(socialMedia);
};

// Return a list of skills in a table
CMDResume.getSkillTable = function(){
    var result = setTitle("Skills:\n");
    result += "           |\tProficient\t|\tExperienced\t|\tFamiliar\n";
    result += "Languages  |\t" + getRequired(skillsLanguages).join().replaceAll(",","\t|\t") + "\n";
    result += "Tools      |\t" + getRequired(skillsTools).join().replaceAll(",","\t|\t") + "\n";
    result += "Concepts   |\t" + getRequired(skillsConcepts).join().replaceAll(",","\t|\t");

    return result;
};

CMDResume.hasSkillTable = function(){
    return isNotEmptyArray(skillsLanguages)
        || isNotEmptyArray(skillsTools)
        || isNotEmptyArray(skillsConcepts);
};

// Update page title to Resume owners name
CMDResume.updateTitle = function(){
    if (isNotEmpty(name)){
        document.title = name + "'s Résumé";
    }
};

// Run man command
CMDResume.runMan = function(command){
    console.log(this.commandFunctionMap[command]);
    if (!command){
        return setCommand("man:") + " No command entered.";
    } else if (this.commandMap[command] != undefined){
        return setCommand(command) + " - " + this.commandMap[command] ;
    } else {
        return setCommand("man:") + " `" + command + "` is an unknown command.";
    }
};

// Run the command
CMDResume.runCommand = function(command, top){
    var formattedCommand = command;

    // Set Top up
    top = typeof top !== 'undefined' ? top: false;
    if (top){
        formattedCommand += " -top";
    }

    var response = this.commandFunctionMap[formattedCommand];

    if ($.isFunction(response)){
        console.log(response);
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

    // Setup Terminal
    $(tag).terminal(function(command, term) {
        term.echo(CMDResume.commandLineParse(command) + "\n");
    },
    this.settings);
};

CMDResume.getSplash = function(){
    var welcome = "";
    // Splash screen
    if (hasSplash){
        welcome = splash + "\n";
    }
    if (isNotEmpty(name)){
        welcome += "Welcome to " + setName(name) + "'s résumé.\n";
    } else {
        welcome += "Welcome to my résumé.\n";
    }
    welcome += "Type ";
    welcome += setCommand("help");
    welcome +=" for commands";
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
        this.commandFunctionMap[command] = getAll(setTitle(command.capitalizeFirstLetter() + ":") + "\n", data);
        this.commandFunctionMap[command + " -top"] = getTop(data);
    }
};

// Initialize variables
CMDResume.initVariables = function(){
    // Help
    this.commandMap["help"] = "lists help for all the commands";

    // Man pages
    this.commandMap.man = "describes what each command does";
    
    // Clear screen
    this.commandMap.clear = "clear command history from screen";

    // Splash screen
    this.setCommand("splash", "print the welcome screen", this.getSplash, this.getSplash());


    // Name
    this.setCommand("name", "owner of the résumé", setName(name), name);

    // Looking for
    this.setCommand("lookingfor", "looking for", setName(lookingfor), lookingfor);

    // Location
    this.setCommand("location", "current location", setName(loc), loc);

    // PDF
    this.setCommand("pdf", "pdf version of the résumé", this.pdf, pdfLink);

    // Education
    this.setArrayCommand("education", "education history", education);

    // Employment
    this.setArrayCommand("employment", "employment history", employment);

    // Volunteering
    this.setArrayCommand("volunteering", "volunteering history", volunteering);

    // Awards
    this.setArrayCommand("awards", "awards obtained", awards);

    // Memberships
    this.setArrayCommand("membership", "membership obtained", membership);

    // Github
    this.setCommand("github", "list Github repositories", this.getGithub, githubUsername);
    
    // Skills
    this.initSkills();

    // Social Media
    if (this.hasSocialMedia()){
        this.commandMap.socialmedia = "Social Media profiles";
        this.commandFunctionMap.socialmedia = this.getSocialMedia();
    }

    // PGP Key
    this.setCommand("pgpkey", "public PGP key", setPGP(publicPGPkey), publicPGPkey);

};

CMDResume.initSkills = function(){
    if (this.hasSkillTable()){
        var skillSubCategories = "";
        // Skills - languages
        if (isNotEmptyArray(skillsLanguages)){
            this.commandFunctionMap["skills -l"] = getAll(setTitle("Languages:") +"\n", skillsLanguages);
            this.commandFunctionMap["skills -languages"] = this.commandFunctionMap["skills -l"];
            skillSubCategories += "[-languages|l]";
        }
        // Skills -technologies
        if (isNotEmptyArray(skillsTools)){
            this.commandFunctionMap["skills -t"] = getAll(setTitle("Tools:") + "\n", skillsTools);
            this.commandFunctionMap["skills -tools"] = this.commandFunctionMap["skills -t"];
            skillSubCategories += "[-tools|t]";
        }
        // Skills - concepts
        if (isNotEmptyArray(skillsConcepts)){
            this.commandFunctionMap["skills -c"] = getAll(setTitle("Concepts:") + "\n", skillsConcepts);
            this.commandFunctionMap["skills -concepts"] = this.commandFunctionMap["skills -c"];
            skillSubCategories += "[-concepts|c]";
        }
        // Skills in total
        this.commandMap["skills"] = "skills obtained. " + skillSubCategories;
        this.commandFunctionMap["skills"] = this.getSkillTable();
    }
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
    var commands = setTitle("Available Commands:");
    for (var key in this) {
        if( typeof this[key] !== 'function') {
            commands += "\n";
            commands += setCommand(key) + " - " + this[key];
        }
    }
    return commands;
};
