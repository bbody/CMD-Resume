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