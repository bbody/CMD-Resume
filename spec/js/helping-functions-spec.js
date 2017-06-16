describe('Page title', function(){
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  it('Title changed with name', function(){
    updateTitle("John Doe");
    expect(document.title).toBe('John Doe\'s Résumé');
  });

  it('Title changed without a name', function(){
    updateTitle();
    expect(document.title).toBe('Command Line Résumé');
  });

  it('Title changed with a blank name', function(){
    updateTitle("");
    expect(document.title).toBe('Command Line Résumé');
  });

  it('Title changed with a null name', function(){
    updateTitle(null);
    expect(document.title).toBe('Command Line Résumé');
  });

  it('Title changed with an undefined name', function(){
    updateTitle(undefined);
    expect(document.title).toBe('Command Line Résumé');
  });
});

describe('Tester for undefined and null values', function(){
  it('Empty string', function(){
    expect(isUndefinedOrNull("")).toBeFalsy();
  });

  it('Empty array', function(){
    expect(isUndefinedOrNull([])).toBeFalsy();
  });

  it('Empty object', function(){
    expect(isUndefinedOrNull({})).toBeFalsy();
  });

  it('Empty object', function(){
    expect(isUndefinedOrNull(null)).toBeTruthy();
  });

  it('Empty object', function(){
    expect(isUndefinedOrNull(undefined)).toBeTruthy();
  });
});

describe('StyleEnum produces the correct text', function(){
  it('Standard style', function(){
    expect(StyleEnum.toString(StyleEnum.STANDARD)).toBe('standard');
  });

  it('Title style', function(){
    expect(StyleEnum.toString(StyleEnum.TITLE)).toBe('title');
  });

  it('Command style', function(){
    expect(StyleEnum.toString(StyleEnum.COMMAND)).toBe('command');
  });

  it('Name style', function(){
    expect(StyleEnum.toString(StyleEnum.NAME)).toBe('name');
  });

  it('PGP style', function(){
    expect(StyleEnum.toString(StyleEnum.PGP)).toBe('pgp');
  });

  it('Invalid style name', function(){
    expect(StyleEnum.toString(-100)).toBe('');
  });
});

describe('Color validator', function(){
  it('Hex code (3 digits)', function(){
    expect(isValidColor("#FFF")).toBeTruthy();
  });

  it('Hex code (6 digits)', function(){
    expect(isValidColor("#C0FFEE")).toBeTruthy();
  });

  it('Color name', function(){
    expect(isValidColor('white')).toBeTruthy();
  });

  it('Invalid color name', function(){
    expect(isValidColor('test')).toBeFalsy();
  });

  it('Empty string', function(){
    expect(isValidColor('')).toBeFalsy();
  });

  it('Empty string', function(){
    expect(isValidColor(null)).toBeFalsy();
  });

  it('Empty string', function(){
    expect(isValidColor()).toBeFalsy();
  });
});

describe('Social Network URL builder', function(){
  it('Twitter', function(){
    expect(buildUrl('TWITTER', 'test')).toBe('https://www.twitter.com/test');
  });

  it('Facebook', function(){
    expect(buildUrl('Facebook', 'test')).toBe('https://www.facebook.com/test');
  });

  it('Github', function(){
    expect(buildUrl('github', 'test')).toBe('https://www.github.com/test');
  });

  it('LinkedIn', function(){
    expect(buildUrl('linkedin', 'test')).toBe('https://www.linkedin.com/in/test');
  });

  it('Reddit', function(){
    expect(buildUrl('reddit', 'test')).toBe('https://www.reddit.com/user/test');
  });

  it('Hacker News', function(){
    expect(buildUrl('hackernews', 'test')).toBe('https://news.ycombinator.com/user?id=test');
  });

  it('MySpace', function(){
    expect(buildUrl('myspace', 'test')).toBe('');
  });

  it('Empty string', function(){
    expect(buildUrl('', 'test')).toBe('');
  });

  it('No username', function(){
    expect(buildUrl('Twitter', '')).toBe('');
  });

  it('Null social media', function(){
    expect(buildUrl(null, 'test')).toBe('');
  });

  it('Null username', function(){
    expect(buildUrl('twitter', null)).toBe('');
  });

  it('Undefined social media', function(){
    expect(buildUrl(undefined, 'test')).toBe('');
  });

  it('Undefined username', function(){
    expect(buildUrl('twitter', undefined)).toBe('');
  });
});

describe('Wrap formatting', function(){
  beforeEach(function(){
    this.text = 'text';
    this.style = 'style';
  });

  it('Takes both arguments', function(){
    expect(wrappedFormatting(this.style, this.text)).toBe('[[style]text]');
  });

  it('Wrap text without formatting', function(){
    expect(wrappedFormatting('', this.text)).toBe('[[]text]');
  });

  it('Wraps formatting without text', function(){
    expect(wrappedFormatting(this.style, '')).toBe('');
  });

  it('Wraps formatting with no text', function(){
    expect(wrappedFormatting(this.style, ''), '');
  });

  it('Wraps formatting with null style', function(){
    expect(wrappedFormatting(null, this.text)).toBe('[[]text]');
  });

  it('Wraps formatting with null text', function(){
    expect(wrappedFormatting(this.style, null)).toBe('');
  });

  it('Wrap formatting with null style and text', function(){
    expect(wrappedFormatting()).toBe('');
  });
});

describe('Set format', function(){
  beforeEach(function(){
    this.exampleText = 'Hello World';
  });

  it('Title format', function(){
    expect(this.exampleText.setFormat(StyleEnum.TITLE)).toBe('[[b;red;#000]Hello World]');
    expect(this.exampleText.setTitle()).toBe('[[b;red;#000]Hello World]');
  });

  it('Command format', function(){
    expect(this.exampleText.setFormat(StyleEnum.COMMAND)).toBe('[[i;white;#000]Hello World]');
    expect(this.exampleText.setCommand()).toBe('[[i;white;#000]Hello World]');
  });

  it('Name format', function(){
    expect(this.exampleText.setFormat(StyleEnum.NAME)).toBe('[[b;green;#000]Hello World]');
    expect(this.exampleText.setName()).toBe('[[b;green;#000]Hello World]');
  });

  it('PGP format', function(){
    expect(this.exampleText.setFormat(StyleEnum.PGP)).toBe('[[i;white;#000]Hello World]');
    expect(this.exampleText.setPGP()).toBe('[[i;white;#000]Hello World]');
  });

  it('Accepts empty string', function(){
    expect(this.exampleText.setFormat('')).toBe('[[;white;#000]Hello World]');
  });

  it('Accepts null format', function(){
    expect(this.exampleText.setFormat(null)).toBe('[[;white;#000]Hello World]');
  });

  it('Accepts empty style and text', function(){
    expect(''.setFormat('')).toBe('');
  });
});

describe('Date formatting', function(){
  it('To and from dates', function(){
    expect(getDate('19/10/2014', '20/02/2016')).toBe('19/10/2014 - 20/02/2016');
  });

  it('To present date', function(){
    expect(getDate('19/10/2014')).toBe('19/10/2014 - Present');
  });

  it('Has no date', function(){
    expect(getDate()).toBe('');
  });
});

describe('Degree name formatting', function(){
  it('Formats full degree name', function(){
    expect(getFullDegree("Bachelor", "Engineering")).toBe('Bachelor of Engineering');
  });

  it('Formats degree without type', function(){
    expect(getFullDegree("Engineering")).toBe('Engineering');
  });

  it('Has no variables', function(){
    expect(getFullDegree()).toBe('');
  });
});

describe('Basic command handler', function(){
  it('Returns base case', function(){
    var command = {
      data: "Test"
    };

    expect(basicHandlerFunction(command)).toBe('\nTest');
  });

  it('Handles null input', function(){
    expect(basicHandlerFunction(null)).toBe('\n');
  });

  it('Handles no command', function(){
    expect(basicHandlerFunction({})).toBe('\n');
  });
});

describe('System command handler', function(){
  it('Handles valid input', function(){
    var command = {
      data: "Test",
      handler: function(data){
        return data;
      }
    };

    expect(systemHandlerFunction(command)).toBe('Test');
  });

  it('Handles null input', function(){
    expect(systemHandlerFunction(null)).toBe('');
  });

  it('Handles no handle but data', function(){
    expect(systemHandlerFunction({data: "Test"})).toBe('Test');
  });

  it('Handles no handle and no data', function(){
    expect(systemHandlerFunction({})).toBe('');
  });
});

describe('Calculated command handler', function(){
  it('Handles valid input', function(){
    var command = {
      data: "Test",
      handler: function(data){
        return data;
      }
    };

    expect(calculatedHandlerFunction(command)).toBe('\nTest');
  });

  it('Handles a null command', function(){
    expect(calculatedHandlerFunction(null)).toBe('\n');
  });

  it('Handles no handle but data', function(){
    expect(calculatedHandlerFunction({data: 'Test'})).toBe('\nTest');
  });

  it('Handles undefined handler and no data', function(){
    expect(calculatedHandlerFunction({})).toBe('\n');
  });
});

describe('Calculated command handler', function(){
  beforeEach(function(){
    this.data = [
      {
        title: "Title 1",
        organisation: "Organisation 1",
        date: "Date 1"
      },
      {
        title: "Title 2",
        organisation: "Organisation 2",
        date: "Date 2"
      }
    ];
  });

  it('Returns back the sent data', function(){
    var command = {
      data: this.data,
      handlers:{
        organisation: function(value){
          return value.organisation;
        },
        title: function(value){
          return value.title
        },
        date: function(value){
          return value.date;
        }
      }
    };

    expect(arrayHandlerFunction(command, false)).toBe("\nOrganisation 1\tTitle 1\tDate 1\nOrganisation 2\tTitle 2\tDate 2");
  });

  it('Top returns back first row', function(){
    var command = {
      data: this.data,
      handlers:{
        organisation: function(value){
          return value.organisation;
        },
        title: function(value){
          return value.title
        },
        date: function(value){
          return value.date;
        }
      }
    };

    expect(arrayHandlerFunction(command, true)).toBe("Organisation 1\tTitle 1\tDate 1");
  });

  it('Returns nothing when there are no handlers', function(){
    var command = {
      data: this.data
    };

    expect(arrayHandlerFunction(command)).toBe('');
  });

  it('Returns nothing when there are no handlers', function(){
    var command = {
      data: this.data,
      handlers: {}
    };

    expect(arrayHandlerFunction(command)).toBe('');
  });

  it('Returns without any organisation', function(){
    var command = {
      data: this.data,
      handlers:{
        title: function(value){
          return value.title
        },
        date: function(value){
          return value.date;
        }
      }
    };

    expect(arrayHandlerFunction(command)).toBe('\nTitle 1\tDate 1\nTitle 2\tDate 2');
  });

  it('Returns without any organisation with top', function(){
    var command = {
      data: self.data,
      handlers:{
        title: function(value){
          return value.title
        },
        date: function(value){
          return value.date;
        }
      }
    };

    expect(arrayHandlerFunction(command, true)).toBe("Title 1\tDate 1");
  });

  it('Returns without any title', function(){
    var command = {
      data: self.data,
      handlers:{
        organisation: function(value){
          return value.organisation;
        },
        date: function(value){
          return value.date;
        }
      }
    };

    expect(arrayHandlerFunction(command)).toBe('\nOrganisation 1\tDate 1\nOrganisation 2\tDate 2')
  });

  it('Returns without any title with top', function(){
    var command = {
      data: self.data,
      handlers:{
        organisation: function(value){
          return value.organisation;
        },
        date: function(value){
          return value.date;
        }
      }
    };

    expect(arrayHandlerFunction(command, true)).toBe('Organisation 1\tDate 1');
  });

  it('Returns without any date', function(){
    var command = {
      data: self.data,
      handlers:{
        title: function(value){
          return value.title
        },
        organisation: function(value){
          return value.organisation;
        }
      }
    };

    expect(arrayHandlerFunction(command), '\nOrganisation 1\tTitle 1\nOrganisation 2\tTitle 2');
  });

  it('Returns without any date with top', function(){
    var command = {
      data: self.data,
      handlers:{
        organisation: function(value){
          return value.organisation;
        },
        title: function(value){
          return value.title
        }
      }
    };

    expect(arrayHandlerFunction(command, true)).toBe('Organisation 1\tTitle 1');
  });

  it('Returns with only date', function(){
    var command = {
      data: self.data,
      handlers:{
        date: function(value){
          return value.date;
        }
      }
    };

    expect(arrayHandlerFunction(command)).toBe('\nDate 1\nDate 2');
  });

  it('Returns with only date with top', function(){
    var command = {
      data: self.data,
      handlers:{
        date: function(value){
          return value.date;
        }
      }
    };

    expect(arrayHandlerFunction(command, true)).toBe('Date 1');
  });

  it('Returns with only organisation', function(){
    var command = {
      data: self.data,
      handlers:{
        organisation: function(value){
          return value.organisation;
        }
      }
    };

    expect(arrayHandlerFunction(command)).toBe('\nOrganisation 1\nOrganisation 2');
  });

  it('Returns with only organisation with top', function(){
    var command = {
      data: self.data,
      handlers:{
        organisation: function(value){
          return value.organisation;
        }
      }
    };

    expect(arrayHandlerFunction(command, true)).toBe('Organisation 1');
  });

  it('Returns with only title', function(){
    var command = {
      data: self.data,
      handlers:{
        title: function(value){
          return value.title;
        }
      }
    };

    expect(arrayHandlerFunction(command)).toBe('arrayHandlerFunction(command)');
  });

  it('Returns with only title with top', function(){
    var command = {
      data: self.data,
      handlers:{
        title: function(value){
          return value.title;
        }
      }
    };

    expect(arrayHandlerFunction(command, true)).toBe('Title 1');
  });
});
