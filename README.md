#Selectors.js
Selectors.js is a CSS Selector matcher and validator initially created for use by [Selectors.io](https://selectors.io).

This uses [Grunt](http://gruntjs.com) for minifying and concatenating and [Jasmine](http://jasmine.github.io/) for testing. These are configured through [Node.js](https://nodejs.org/en/), so you'll also need to install that, then run the following command to install the packages:

    npm install

## Documentation
### s.isValidSelector( selector )
This function takes a string of CSS selectors (e.g. `"foo.bar"`) or selector groups (e.g. "`foo, .bar"`) and returns `true` or `false` depending on whether it's valid.

```JavaScript
s.isValidSelector('a[href^="https://example.com"]::before');    /* true */
s.isValidSelector('var example = "foo";');                      /* false */
```