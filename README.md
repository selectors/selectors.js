#Selectors.js
[![Build Status](https://travis-ci.org/temp-selectors/selectors.js.svg?branch=master)](https://travis-ci.org/temp-selectors/selectors.js)
[![Coverage Status](https://coveralls.io/repos/github/JamesDonnelly/selectors.js/badge.svg?branch=master)](https://coveralls.io/github/JamesDonnelly/selectors.js?branch=master)
[![Dependency Status](https://david-dm.org/temp-selectors/selectors.js.svg)](https://david-dm.org/temp-selectors/selectors.js)
[![devDependency Status](https://david-dm.org/temp-selectors/selectors.js/dev-status.svg)](https://david-dm.org/temp-selectors/selectors.js#info=devDependencies)

Selectors.js is a CSS Selector matcher and validator initially created for use by [Selectors.io](https://selectors.io).

This uses [Grunt](http://gruntjs.com) for minifying, concatenating and testing ([Jasmine](http://jasmine.github.io/)). These are configured through [Node.js](https://nodejs.org/en/), so you'll also need to install that, then run the following command to install the packages:

```JavaScript
npm install
```

To compile the dist files and run the testing, install Grunt's command line interface (`npm install -g grunt-cli`), then run:

```JavaScript
grunt
```

## Documentation
### s.isValidSelectorsGroup( selectorsGroup )
This function takes a string of CSS selectors (e.g. `"foo.bar"`) or a selectors group (e.g. "`foo, .bar"`) `selectorsGroup` and returns `true` or `false` depending on whether the entire input is valid.

```JavaScript
s.isValidSelectorsGroup('a[href^="https://example.com"]::before');    // true
s.isValidSelectorsGroup('.foo, #bar, [baz]');                         // true
s.isValidSelectorsGroup('.foo, #bar:jazzhands');                      // false
s.isValidSelectorsGroup('var example = "foo";');                      // false
```

###s.isValidSelector( selector [, htmlStrict ] )
This function takes an individual `selector` and validates it. This is more accurate than `s.isValidSelectorsGroup` for pseudo-classes and pseudo-elements as the selector name is validated against the various specifications.

```JavaScript
s.isValidSelector('div');                      // true
s.isValidSelector('foobar|*');                 // true
s.isValidSelector(':nth-child( 2n + 1 )');     // true
s.isValidSelector(':nth-of-type(even)');       // true
s.isValidSelector(':lang(fr-be)');             // true
s.isValidSelector('::first-letter');           // true
s.isValidSelector(':-vendor-specific');        // true
s.isValidSelector(':_alt-vendor-specific');    // true
s.isValidSelector(':potato');                  // false
```

:heavy_exclamation_mark: [**Status: TODO**]
It also accepts an optional `htmlStrict` Boolean value (which defaults to `false`). When `true`, it validates element types and attributes against the HTML5 specification.


```JavaScript
s.isValidSelector('div', true);               // true
s.isValidSelector('potato', true);            // false - HTML5 has no `potato` element

s.isValidSelector('[checked]', true);         // true
s.isValidSelector('[aria-role]', true);       // true
s.isValidSelector('[example]', true);         // false - HTML5 has no `example` attribute
s.isValidSelector('[data-example]', true);    // true
```

### s.quickValidation ( selectors )
This function takes a string of CSS `selectors` (e.g. `"foo.bar"`, a selectors group (e.g. "`foo, .bar"`) or an individual selector (`[bar=baz]`) and performs fast validation by wrapping `document.querySelector`.

```JavaScript
s.quickValidation('foo');          // true
s.quickValidation('[att=val]');    // true
```

It's recommended **not** to use this if you're needing accurate results. Due to it wrapping `document.querySelector`, the results given by this differ between each browser. Most browser implementations falsly invalidate namespaces (like `ns|div`) and even their own vendor-prefixed pseudo-classes (like `:-webkit-marquee`, etc...). Some also give false positives on invalid identifier names (like `#--`).

###s.getType( selector )
This function takes an individual `selector` (e.g. `"foo"` or `".bar"`) and returns what type of selector it is.

```JavaScript
s.getType('div');           // "type"
s.getType('.bar');          // "class"
s.getType('#baz');          // "id"
s.getType('[att]');         // "attribute"
s.getType(':foo');          // "pseudo-class"
s.getType('::foo');         // "pseudo-element"
s.getType(':foo(n)');       // "pseudo-class"
s.getType(':not(.bar)');    // "negation"
```