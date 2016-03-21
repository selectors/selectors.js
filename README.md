#Selectors.js
Selectors.js is a CSS Selector matcher and validator initially created for use by [Selectors.io](https://selectors.io).

This uses [Grunt](http://gruntjs.com) for minifying, concatenating and testing ([Jasmine](http://jasmine.github.io/)). These are configured through [Node.js](https://nodejs.org/en/), so you'll also need to install that, then run the following command to install the packages:

```JavaScript
npm install
```

To compile the distribution files and run the testing, install Grunt's command line interface (`npm install -g grunt-cli`), then run:

```JavaScript
grunt
```

## Documentation
### s.isValidSelectorsGroup( selectorsGroup )
This function takes a string of CSS selectors (e.g. `"foo.bar"`) or selectors group (e.g. "`foo, .bar"`) `selectorsGroup` and returns `true` or `false` depending on whether the entire input is valid.

```JavaScript
s.isValidSelectorsGroup('a[href^="https://example.com"]::before');    /* true */
s.isValidSelectorsGroup('.foo, #bar, [baz]');                         /* true */
s.isValidSelectorsGroup('var example = "foo";');                      /* false */
```

###s.isValidSelector( selector )
This function takes an individual `selector` and validates it. This is a more accurate than `s.isValidSelectorsGroup` for pseudo-classes and pseudo-elements as the selector name is validated against the various specifications.

```JavaScript
s.isValidSelector('div');                      /* true */
s.isValidSelector('foobar|*');                 /* true */
s.isValidSelector(':nth-child( 2n + 1 )');     /* true */
s.isValidSelector(':nth-of-type(even)');       /* true */
s.isValidSelector(':lang(fr-be)');             /* true */
s.isValidSelector('::first-letter');           /* true */
s.isValidSelector(':-vendor-specific');        /* true */
s.isValidSelector(':_alt-vendor-specific');    /* true */
s.isValidSelector('::hover');                  /* false */
```

###s.getType( selector )
This function takes an individual `selector` (e.g. `"foo"` or `".bar"`) and returns what type of selector it is.

```JavaScript
s.getType('div');           /* "type" */
s.getType('.bar');          /* "class" */
s.getType('#baz');          /* "id" */
s.getType('[att]');         /* "attribute" */
s.getType(':foo');          /* "pseudo-class" */
s.getType('::foo');         /* "pseudo-element" */
s.getType(':foo(n)');       /* "pseudo-class" */
s.getType(':not(.bar)');    /* "negation" */
```