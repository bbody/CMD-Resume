QUnit.module( "Init Tests", {
  beforeEach: function() {
    // prepare something for all following tests
    this.cmdResume = CMDResume;
    this.cmdResume.init('#console');
  },
  afterEach: function() {
    // clean up after each test   
  }
});

QUnit.test( "Test title changed", function( assert ) {
	// Add test when name is null after variables
	assert.equal(document.title, "John Doe's Résumé");
});

QUnit.test( "Test name", function( assert ) {
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.equal(this.cmdResume.runCommand("name"), "[[b;green;#000]John Doe]");
});

QUnit.test( "Test man", function( assert ) {
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.equal(this.cmdResume.runMan(""), "[[i;white;#000]man:] No command entered.");
	assert.equal(this.cmdResume.runMan(null), "[[i;white;#000]man:] No command entered.");
	assert.equal(this.cmdResume.runMan(), "[[i;white;#000]man:] No command entered.");

	assert.equal(this.cmdResume.runMan("notacommand"), "[[i;white;#000]man:] `notacommand` is an unknown command.");

	assert.equal(this.cmdResume.runMan("name"), "[[i;white;#000]name] - owner of the résumé");
});

QUnit.test( "Test PGP key", function( assert ) {
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.equal(this.cmdResume.runCommand("pgpkey"), "[[i;white;#000]\nYOUR PGP KEY HERE]");
});

QUnit.test( "Test location", function( assert ) {
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.equal(this.cmdResume.runCommand("location"), "[[b;green;#000]Timbuktu]");
});

QUnit.test( "Test looking for", function( assert ) {
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.equal(this.cmdResume.runCommand("lookingfor"), "[[b;green;#000]Raking in the money]");
});

QUnit.test( "Test looking for", function( assert ) {
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.equal(this.cmdResume.runCommand("lookingfor"), "[[b;green;#000]Raking in the money]");
});

QUnit.test("Test social media", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("socialmedia"), 
		"[[b;red;#000]Social Media:]\nGithub - https://github.com/example\nBitbucket - https://bitbucket.org/example\nWebsite - http://www.example.com/\nTwitter - https://twitter.com/\nFacebook - https://facebook.com/\nSkype - test");
});


QUnit.test("Test splash screen", function(assert){
	var expectedResult = ""
	+ "                 _________________\n"
	+ "                /                /|\n"
	+ "               /                / |\n"
	+ "              /________________/ /|\n"
	+ "           ###|      ____      |//|\n"
	+ "          #   |     /   /|     |/.|\n"
	+ "         #  __|___ /   /.|     |  |_______________\n"
	+ "        #  /      /   //||     |  /              /|                  ___\n"
	+ "       #  /      /___// ||     | /              / |                 / \\ \\\n"
	+ "       # /______/!   || ||_____|/              /  |                /   \\ \\\n"
	+ "       #| . . .  !   || ||                    /  _________________/     \\ \\\n"
	+ "       #|  . .   !   || //      ________     /  /\\________________  {   /  }\n"
	+ "       /|   .    !   ||//~~~~~~/   0000/    /  / / ______________  {   /  /\n"
	+ "      / |        !   |\'/      /9  0000/    /  / / /             / {   /  /\n"
	+ "     / #\\________!___|/      /9  0000/    /  / / /_____________/___  /  /\n"
	+ "    / #     /_____\\/        /9  0000/    /  / / /_  /\\_____________\\/  /\n"
	+ "   / #                      ``^^^^^^    /   \\ \\ . ./ / ____________   /\n"
	+ "  +=#==================================/     \\ \\ ./ / /.  .  .  \\ /  /\n"
	+ "  |#                                   |      \\ \\/ / /___________/  /\n"
	+ "  #                                    |_______\\__/________________/\n"
	+ "  |                                    |               |  |  / /       \n"
	+ "  |                                    |               |  | / /       \n"
	+ "  |                                    |       ________|  |/ /________       \n"
	+ "  |                                    |      /_______/    \\_________/\\       \n"
	+ "  |                                    |     /        /  /           \\ )       \n"
	+ "  |                                    |    /OO^^^^^^/  / /^^^^^^^^^OO\\)       \n"
	+ "  |                                    |            /  / /        \n"
	+ "  |                                    |           /  / /\n"
	+ "  |                                    |          /___\\/\n"
	+ "  |hectoras                            |           oo\n"
	+ "  |____________________________________|\n"
	+ "\n"
	+ "Welcome to [[b;green;#000]John Doe]\'s résumé.\n"
	+ "Type [[i;white;#000]help] for commands";

	// Add test when name is null or disabled after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("splash"), expectedResult);
});

QUnit.test("Test pdf", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("pdf"), "http://en.wikipedia.org/wiki/R%C3%A9sum%C3%A9\nHint: May need to allow pop-ups.");
});


QUnit.test("Test education", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("education"), "[[b;red;#000]Education:]\nSouth Hamptom Institute of Technology\tMaster of Computers\tGraduate July, 2014\nSchool of Hard Knocks\tBachelor of Life\tGraduate November, 2008");
});

QUnit.test("Test education -top", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("education -top"), "South Hamptom Institute of Technology\tMaster of Computers\tGraduate July, 2014");
});

QUnit.test("Test employment", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("employment"), "[[b;red;#000]Employment:]\nPrestige Worldwide\tBeat Lab Technician\tNovember 2013 - Present");
});

QUnit.test("Test employment -top", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("employment -top"), "Prestige Worldwide\tBeat Lab Technician\tNovember 2013 - Present");
});

QUnit.test("Test volunteering", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("volunteering"), "[[b;red;#000]Volunteering:]\nVolunteer\tVoluntation\tNovember 2013 - Present");
});

QUnit.test("Test volunteering -top", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("volunteering -top"), "Volunteer\tVoluntation\tNovember 2013 - Present");
});

QUnit.test("Test awards", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("awards"), "[[b;red;#000]Awards:]\nMad Coder\tProgrammer Institute\tDecember 2013");
});

QUnit.test("Test awards -top", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("awards -top"), "Mad Coder\tProgrammer Institute\tDecember 2013");
});

QUnit.test("Test membership", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("membership"), "[[b;red;#000]Membership:]\nSome Society\tPizza Box Opener");
});

QUnit.test("Test membership -top", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	assert.deepEqual(this.cmdResume.runCommand("membership -top"), "Some Society\tPizza Box Opener");
});

QUnit.test("Test skills", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	// TODO: Rewrite with new table formatting
	assert.deepEqual(this.cmdResume.runCommand("skills"), "[[b;red;#000]Skills:\n]           |\tProficient\t|\tExperienced\t|\tFamiliar\nLanguages  |\tC/C++ Java Python\t|\tC# .NET\t|\tPHP Javascript Bash\nTools      |\tGit Wordpress\t|\tAndroid Github\t|\tTCP/IP SVN\nConcepts   |\tKanban Agile\t|\tFunctional Testing\t|\tFunctional Programming");
});

QUnit.test("Test skills languages", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	var expected = "[[b;red;#000]Languages:]\nProficient\tC/C++ Java Python\nExperienced\tC# .NET\nFamiliar\tPHP Javascript Bash";
	assert.deepEqual(this.cmdResume.runCommand("skills -l"), expected);
	assert.deepEqual(this.cmdResume.runCommand("skills -languages"), expected);
});

QUnit.test("Test skills tools", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	var expected = "[[b;red;#000]Tools:]\nProficient\tGit Wordpress\nExperienced\tAndroid Github\nFamiliar\tTCP/IP SVN";
	assert.deepEqual(this.cmdResume.runCommand("skills -t"), expected);
	assert.deepEqual(this.cmdResume.runCommand("skills -tools"), expected);
});

QUnit.test("Test skills concepts", function(assert){
	// Add test when name is null after variables
	// TODO: Handle different styles when implemented
	var expected = "[[b;red;#000]Concepts:]\nProficient\tKanban Agile\nExperienced\tFunctional Testing\nFamiliar\tFunctional Programming";
	assert.deepEqual(this.cmdResume.runCommand("skills -c"), expected);
	assert.deepEqual(this.cmdResume.runCommand("skills -concepts"), expected);
});