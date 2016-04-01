#[Selectors.js](https://css.selectors.io)
[![Build Status](https://travis-ci.org/selectors/selectors.js.svg?branch=master)](https://travis-ci.org/selectors/selectors.js)
[![Dependency Status](https://david-dm.org/selectors/selectors.js.svg)](https://david-dm.org/selectors/selectors.js)
[![devDependency Status](https://david-dm.org/selectors/selectors.js/dev-status.svg)](https://david-dm.org/selectors/selectors.js#info=devDependencies)

Selectors.js is a CSS Selector parser and validator initially created for use by [Selectors.io](https://selectors.io).

###In This Readme

1. **[Download Links](#download-links)**
2. **[Documentation](#documentation)**
3. **[Building, Compiling and Testing](#build-and-test)**

##Download Links
You only need one of the below files. For production it's recommended that you use a minified (`.min.js`) version.

| File | Description
| --- | --- |
| **[selectors.js](https://raw.githubusercontent.com/selectors/selectors.js/master/dist/selectors.js)** | the commented and uncompressed version |
| **[selectors.min.js](https://raw.githubusercontent.com/selectors/selectors.js/master/dist/selectors,min.js)** | the uncommented and compressed version of selectors.js |
| **[selectors-html.js](https://raw.githubusercontent.com/selectors/selectors.js/master/dist/selectors-html.js)** | the commented and uncompressed version with _htmlStrict_ <sup>&#8224;</sup> |
| **[selectors-html.min.js](https://raw.githubusercontent.com/selectors/selectors.js/master/dist/selectors-html,min.js)** | the uncommented and compressed version of selectors.html.js |

<sup>&#8224;</sup> The _htmlStrict_ version offers extra validation methods on HTML5, SVG1.1 and MathML3 Element and Attribute names. WAI-ARIA attribute names are also included in this.

## Documentation
### s.isValidSelectorsGroup( selectorsGroup )
This function takes a selector sequence (like `"foo.bar"`) or a selectors group (like "`foo, .bar"`) `selectorsGroup` and returns `true` or `false` depending on whether the entire input is valid.

```JavaScript
s.isValidSelectorsGroup('a[href^="https://example.com"]::before')    // true
s.isValidSelectorsGroup('.foo, #bar, [baz]')                         // true
s.isValidSelectorsGroup('.foo, #bar:jazzhands')                      // false
s.isValidSelectorsGroup('var example = "foo";')                      // false
```

###s.isValidSelector( selector [, htmlStrict ] )
This function takes an individual `selector` (like `.bar`) and validates it. This is more accurate than `s.isValidSelectorsGroup` for pseudo-classes and pseudo-elements as the selector name is validated against the various specifications.

```JavaScript
s.isValidSelector('div')                      // true
s.isValidSelector('foobar|*')                 // true
s.isValidSelector(':nth-child( 2n + 1 )')     // true
s.isValidSelector(':nth-of-type(even)')       // true
s.isValidSelector(':lang(fr-be)')             // true
s.isValidSelector('::first-letter')           // true
s.isValidSelector(':-vendor-specific')        // true
s.isValidSelector(':_alt-vendor-specific')    // true
s.isValidSelector(':potato')                  // false
```

If using `selectors.html.js` with the *htmlStrict* addon included, this function also accepts an optional `htmlStrict` Boolean value (which defaults to `false`). When `true`, it validates element types and attributes against the [HTML5](https://www.w3.org/TR/html5), [SVG1.1](http://www.w3.org/TR/SVG) and [MathML3](https://www.w3.org/TR/MathML) specifications. [WAI-ARIA](https://www.w3.org/TR/wai-aria/) attributes are also included. This flag has no special meaning when applied to anything other than type and attribute selectors.

```JavaScript
s.isValidSelector('div', true)              // true - valid HTML5 element
s.isValidSelector('polygon', true)          // true - valid SVG1.1 element
s.isValidSelector('munderover', true)       // true - valid MathML3 element
s.isValidSelector('water', true)            // false - water is a compound ;)

s.isValidSelector('[checked]', true)        // true - valid HTML5 attribute
s.isValidSelector('[clip-rule]', true)      // true - valid SVG1.1 attribute
s.isValidSelector('[mathvariant]', true)    // true - valid MathML3 attribute
s.isValidSelector('[aria-role]', true)      // true - valid WAI-ARIA attribute
s.isValidSelector('[potato]', true)         // false
```

Note that this does not validate attribute values, only the attribute names themselves.

### s.quickValidation ( selectors )
This function takes a selector sequence (like `"foo.bar"`), a selectors group (like "`foo, .bar"`) or an individual selector (like `[bar=baz]`) `selectors` and performs fast validation by wrapping JavaScript's in-built `document.querySelector`.

```JavaScript
s.quickValidation('foo')          // true
s.quickValidation('[att=val]')    // true
```

It's recommended **not** to use this if you're needing accurate results. Due to it wrapping `document.querySelector`, the results given by this differ between each browser. Most browser implementations falsly invalidate namespaces (like `ns|div`) and even their own vendor-prefixed pseudo-classes (like `:-webkit-marquee`, etc...). Some also give false positives on invalid identifier names (like `#--`).

###s.getSequences( selectorsGroup )
This function takes a `selectorsGroup` (like `"foo, .bar"`) and returns an array of selector sequences.

```JavaScript
s.getSequences("foo.bar")            // [ "foo.bar" ]
s.getSequences("foo.bar, #baz")      // [ "foo.bar", "#baz" ]
s.getSequences("foo, .bar, #baz")    // [ "foo", ".bar", "#baz" ]
```

###s.getSelectors( selectorSequence )
This function takes a `selectorSequence` (like `"foo > .bar:hover"`) and returns an array of individual selectors.

```JavaScript
s.getSelectors("foo")                 // [ "foo" ]
s.getSelectors("foo > .bar")          // [ "foo", ">", ".bar" ]
s.getSelectors("foo > .bar:hover")    // [ "foo", ">", ".bar", ":hover" ]
```

###s.getElements( selectorSequence )
This function takes a `selectorSequence` (like `"foo > .bar:hover"`) and returns an array of arrays of individual selectors which make up individual elements (separated by combinators).

```JavaScript
s.getElements("foo")                 // [ [ "foo" ] ]
s.getElements("foo > .bar")          // [ [ "foo" ], [ ">", "bar" ] ]
s.getElements("foo > .bar:hover")    // [ [ "foo" ], [ ">", "bar", ":hover" ] ]
```

###s.getType( selector )
This function takes an individual `selector` (like `"foo"` or `".bar"`) and returns what type of selector it is.

```JavaScript
s.getType('+')             // "combinator"
s.getType('*')             // "universal"
s.getType('div')           // "type"
s.getType('.bar')          // "class"
s.getType('#baz')          // "id"
s.getType('[att]')         // "attribute"
s.getType(':foo')          // "pseudo-class"
s.getType('::foo')         // "pseudo-element"
s.getType(':foo(n)')       // "pseudo-class"
s.getType(':not(.bar)')    // "negation"
```

###s.getAttributeProperties( attributeSelector )
This function takes an individual `attributeSelector` (like `"[att=val]"` or `"[ns|att*="val"]`) and returns an object containing its `namespace`, `name`, `symbol` and `value`.

```JavaScript
s.getAttributeProperties('[att="5"]')    // { namespace: null, name: 'att', symbol: '=', value: '5' }

s.getAttributeProperties('[ns|foo^="bar"]').namespace    // 'ns'
s.getAttributeProperties('[ns|foo^="bar"]').name         // 'foo'
s.getAttributeProperties('[ns|foo^="bar"]').symbol       // '^='
s.getAttributeProperties('[ns|foo^="bar"]').value        // 'bar'
```

###s.getPseudoProperties( pseudoSelector )
This function takes an individual pseudo-class or pseudo-element selector (like `:hover`, `:nth-child(9n-9)` or `::before`) `pseudoSelector` and returns an object containing its `vendor`, `name` and `args`.

If CSS2.1 pseudo-elements `::first-line`, `::first-letter`, `::before` or `::after` are passed in, an additional `colons` property is included in the response. This is to allow implementations to warn users that the `:…` single-colon syntax is deprecated (if `colons` is equal to `1` instead of `2`).

```JavaScript
s.getPseudoProperties(':hover')                 // { vendor: null, name: 'hover', args: null }
s.getPseudoProperties(':nth-child(2n + 1 )')    // { vendor: null, name: 'nth-child', args: '2n + 1 ' }
s.getPseudoProperties('::before')               // { vendor: null, name: 'before', args: null, colons: 2 }
s.getPseudoProperties('::-webkit-scrollbar')    // { vendor: '-webkit-', name: 'scrollbar', args: null }
```

###s.getNegationInnerSelectorProperties( negationSelector )
This function takes an individual `negationSelector` (like `:not(.bar)`) and returns an object containing the selector `selector` and `type` of the inner selector.

```JavaScript
s.getNegationInnerSelectorProperties(':not(.bar)')          // { selector: '.bar', type: 'class' }
s.getNegationInnerSelectorProperties(':not([att*=val])')    // { selector: '[att*=val]', type: 'attribute' }
```

Note that this will throw an error if another negation selector or a pseudo-element is the selector contained inside (like `:not(:not(.bar))`) as these aren't valid.

###s.stripNoise ( selectorsGroup )
This function takes a selector sequence (like `"foo.bar"`) or a selectors group (like "`foo, .bar"`) `selectorsGroup` and returns the same string but with comments and style declarations stripped out.

```JavaScript
s.stripNoise('foo .bar #baz')                    // "foo .bar #baz"
s.stripNoise('foo /* .bar */ #baz')              // "foo #baz"
s.stripNoise('foo, bar { background: red; }')    // "foo, bar"
```

##Build and Test
This uses [Grunt](http://gruntjs.com) for minifying, concatenating and testing ([Jasmine](http://jasmine.github.io/)). These are configured through [Node.js](https://nodejs.org/en/), so you'll also need to install that, then run the following command to install the packages:

```JavaScript
npm install
```

To compile the dist files and run the testing, install Grunt's command line interface (`npm install -g grunt-cli`), then run:

```JavaScript
grunt
```
