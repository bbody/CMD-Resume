/* --- String Function Tests --- */

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