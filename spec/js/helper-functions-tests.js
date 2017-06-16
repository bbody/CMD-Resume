

QUnit.module( "Helper function tests", {
  beforeEach: function() {
    // prepare something for all following tests


  },
  afterEach: function() {
    // clean up after each test
  }
});

QUnit.test("Github without forks", function(assert){
	var result = filterGithubFork(self.response, "test.github.com", false);
	assert.equal(result.length, 4);
});

QUnit.test("Github with forks", function(assert){
	var result = filterGithubFork(self.response, "test.github.com", true);
	assert.equal(result.length, 5);
});

QUnit.test("Github formatting", function(assert){
	assert.equal(formatGithub(self.response[0], true), "[[b;green;#000]HelloWorld] - Create hello world");
	assert.equal(formatGithub(self.response[0], false), "\n[[b;green;#000]HelloWorld] - Create hello world");
	assert.equal(formatGithub(self.response[0]), "\n[[b;green;#000]HelloWorld] - Create hello world");
	assert.equal(formatGithub("", true), "");
	assert.equal(formatGithub(null, true), "");
	assert.equal(formatGithub({}, true), "");
});

QUnit.module( "Helper function tests", {
  beforeEach: function() {
    self.xhr = sinon.useFakeXMLHttpRequest();
    self.requests = [];
    self.xhr.onCreate = function (req) { requests.push(req); };
  },
  afterEach: function() {
    self.xhr.restore();
  }
});

QUnit.test("URL is handed to XHR call", function(assert){

	getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, sinon.spy());


	assert.equal(self.requests.length, 1);
    assert.notEqual(self.requests[0].url.indexOf("http://localhost:8000/spec/responses/github_response.json"), -1);
});

QUnit.module( "Helper function tests", {
  beforeEach: function() {
    self.server = sinon.fakeServer.create();
  },
  afterEach: function() {
    self.server.restore();
  }
});

QUnit.test("XHR call handles correct return", function(assert){

	var callback = sinon.spy();

    // Reply with a github response
    self.server.respondWith("GET", "/somewhere",
                       [200, { "Content-Type": "application/json" },
                        JSON.stringify(self.response)]);
    getGithub("/somewhere", "test", false, callback);
    self.server.respond();

    assert.ok(callback.calledOnce);
});

QUnit.test("XHR call handles no return", function(assert){
	var callback = sinon.spy();

    getGithub("/somewhere", "test", false, callback);
    
    assert.equal(callback.callCount, 0);
});

QUnit.test("XHR call handles non-successful result", function(assert){
	var callback = sinon.spy();

    // Reply with an empty response
    self.server.respondWith("GET", "/somewhere",
                       [200, { "Content-Type": "application/json" },
                        JSON.stringify([])]);
    getGithub("/somewhere", "test", false, callback);
    self.server.respond();
    
    assert.equal(callback.callCount, 0);
});
