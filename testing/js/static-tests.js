/* --- String helper function tests  --- */

QUnit.test( "Test String 'is' function", function( assert ) {
  assert.ok("".is(""));
  assert.ok("hello".is('hello'));
  assert.ok(new String(5).is('5'));

  assert.notOk("5".is(5));
  assert.notOk("".is(" "));
  assert.notOk("".is(null));
});

QUnit.test( "Test String 'capitalizeFirstLetter' function", function( assert ) {
  assert.equal("Hello".capitalizeFirstLetter(), "Hello");
  assert.equal("hello".capitalizeFirstLetter(), "Hello");
  assert.equal("hELLO".capitalizeFirstLetter(), "HELLO");
  assert.equal("HELLO".capitalizeFirstLetter(), "HELLO");
  assert.equal("".capitalizeFirstLetter(), "");
  assert.equal("z".capitalizeFirstLetter(), "Z");
  assert.equal("Z".capitalizeFirstLetter(), "Z");
});

//---------- General helper function tests ----------\\

QUnit.test( "Test 'getTop' function", function( assert ) {
  assert.deepEqual(getTop(["a", "b", "c", "d"]), "a");
  assert.deepEqual(getTop([["a1", "a2"], "b", "c", "d"]), "a1\ta2");
});

QUnit.test("Test 'getAll' function", function(assert){
  // TODO: Handle different styles when implemented

  assert.deepEqual(getAll("Title", [["a", "b", "c"],["d", "e", "f"],["g", "h", "i"]]), "[[b;red;#000]Title:]\na\tb\tc\nd\te\tf\ng\th\ti");
  assert.deepEqual(getAll("Title", [["a", "b", "c"]]), "[[b;red;#000]Title:]\na\tb\tc");
  assert.deepEqual(getAll("Title", []), "");
  assert.deepEqual(getAll("", [["a", "b", "c"]]), "a\tb\tc");
});

QUnit.test("Test 'setFormat' function", function(assert){

  assert.equal(setFormat("something"), "[[#000]something]");

  assert.equal(setFormat("something", "white"), "[[;white;#000]something]");

  assert.equal(setFormat("something", "white", true), "[[b;white;#000]something]");

  assert.equal(setFormat("something", "white", true, true), "[[bi;white;#000]something]");

  assert.equal(setFormat("something", "white", false, true), "[[i;white;#000]something]");

  assert.equal(setFormat("something", "white", false, false, "green"), "[[;white;green]something]");

  var multiLine = ""
    + "something\n"
    + "more";

  assert.equal(setFormat(multiLine, "white", false, false, "green"), "[[;white;green]" + multiLine + "]");
});

QUnit.test("Test 'setTitle' function", function(assert){
  // TODO: Handle different styles when implemented

  assert.equal(setTitle("something"), "[[b;red;#000]something]");
  
  var multiLine = ""
    + "something\n"
    + "more";
  assert.equal(setTitle(multiLine), "[[b;red;#000]" + multiLine + "]");
});

QUnit.test("Test 'setCommand' function", function(assert){
  // TODO: Handle different styles when implemented

  assert.equal(setCommand("something"), "[[i;white;#000]something]");
  
  var multiLine = ""
    + "something\n"
    + "more";
  assert.equal(setCommand(multiLine), "[[i;white;#000]" + multiLine + "]");
});

QUnit.test("Test 'setName' function", function(assert){
  // TODO: Handle different styles when implemented

  assert.equal(setName("something"), "[[b;green;#000]something]");
  
  var multiLine = ""
    + "something\n"
    + "more";
  assert.equal(setName(multiLine), "[[b;green;#000]" + multiLine + "]");
});

QUnit.test("Test 'setPGP' function", function(assert){
  // TODO: Handle different styles when implemented

  assert.equal(setPGP("something"), "[[i;white;#000]something]");
  
  var multiLine = ""
    + "something\n"
    + "more";
  assert.equal(setPGP(multiLine), "[[i;white;#000]" + multiLine + "]");
});

QUnit.test("Test 'getSkills' function", function(assert){
  assert.deepEqual(getSkills([["Proficient", "Something"]]), ["Something"]);
  assert.deepEqual(getSkills([]), []);
  assert.deepEqual(getSkills([["Proficient", "Something"],["Experienced", "Something else"],["Familiar", "More something else"]]), ["Something", "Something else", "More something else"]);
});


QUnit.test("Test 'isNotEmptyArray' function", function(assert){
  assert.notOk(isNotEmptyArray([]));
  assert.notOk(isNotEmptyArray(null));
  assert.notOk(isNotEmptyArray(undefined));
  assert.ok(isNotEmptyArray([[]]));
  assert.ok(isNotEmptyArray(["Element"]));
});


QUnit.test("Test 'isNotEmpty' function", function(assert){
  assert.notOk(isNotEmpty(""));
  assert.notOk(isNotEmpty(null));
  assert.notOk(isNotEmpty(undefined));
  assert.ok(isNotEmpty(" "));
  assert.ok(isNotEmpty("something"));
});


