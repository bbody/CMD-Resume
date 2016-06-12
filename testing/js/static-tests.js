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
  assert.deepEqual(getTop([["a1", "a2"], "b", "c", "d"]), ["a1", "a2"]);
});

// QUnit.test("Test 'getAll' function", function(assert){
//   //assert.equal(getAll(), );
// });

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


