QUnit.module( "Init Tests", {
  beforeEach: function() {
    // prepare something for all following tests
    $('#console').CMDResume("", {});
  },
  afterEach: function() {
    // clean up after each test   
  }
});

QUnit.test("Test 'updateTitle' without a name", function(assert){
  $.updateTitle();
  assert.equal(document.title, "Command Line Résumé");
});

QUnit.test("Test 'updateTitle' with a name", function(assert){
  $.CMDResume.updateTitle("John Doe");
  assert.equal(document.title, "John Doe's Résumé");
});

QUnit.test("Test 'setFormat' with default styles", function(assert){
  // Inline
  assert.equal("something".setFormat("title"), "[[b;red;#000]something]");
  assert.equal("something".setFormat("command"), "[[i;white;#000]something]");
  assert.equal("something".setFormat("name"), "[[b;green;#000]something]");
  assert.equal("something".setFormat("pgp"), "[[i;white;#000]something]");

  // Variable
  var multiLine = ""
    + "something\n"
    + "more";

  assert.equal(multiLine.setFormat("title"), "[[b;red;#000]" + multiLine + "]");
  assert.equal(multiLine.setFormat("command"), "[[i;white;#000]" + multiLine + "]");
  assert.equal(multiLine.setFormat("name"), "[[b;green;#000]" + multiLine + "]");
  assert.equal(multiLine.setFormat("pgp"), "[[i;white;#000]" + multiLine + "]");

});

QUnit.test("Test 'setFormat' with provided styles function", function(assert){
  
  var styles = {
    title: {
      color: "red",
      bold: true,
      italic: true,
      backgroundColor: "blue"
    },
    command: {
      color: "blue",
      bold: false,
      italic: true,
      backgroundColor: "red"
    },
    pgp: {
      color: "green",
      bold: true,
      italic: false,
      backgroundColor: "yellow"
    },
    name: {
      color: "yellow",
      bold: false,
      italic: false,
      backgroundColor: "green"
    }
  };

  $('#console').CMDResume("", styles);

  // Inline
  assert.equal("something".setFormat("title"), "[[bi;red;blue]something]");
  assert.equal("something".setFormat("command"), "[[i;blue;red]something]");
  assert.equal("something".setFormat("name"), "[[;yellow;green]something]");
  assert.equal("something".setFormat("pgp"), "[[b;green;yellow]something]");

  // Variable
  var multiLine = ""
    + "something\n"
    + "more";

  assert.equal(multiLine.setFormat("title"), "[[bi;red;blue]" + multiLine + "]");
  assert.equal(multiLine.setFormat("command"), "[[i;blue;red]" + multiLine + "]");
  assert.equal(multiLine.setFormat("name"), "[[;yellow;green]" + multiLine + "]");
  assert.equal(multiLine.setFormat("pgp"), "[[b;green;yellow]" + multiLine + "]");
});
