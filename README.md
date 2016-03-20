#[Selectors.io](https://selectors.io)
Selectors.io is a web-based CSS Selector deconstructor designed to answer the increasingly-popular question of '*What does this CSS selector do?*

It not only deconstructs selectors; it also provides quick and easy-to-understand documentation on the same page with code examples to go alongside. It also attempts to generate HTML based on the given selectors to make it as obvious as possible what the selector is selecting.

##Examples
Load up https://selectors.io and paste any of the following Selectors into the selector input textarea:

| Selector | Selectors.io Deconstruction |
| :--- | :--- | :--- |
| `audio:not([controls])` ([Normalize.css]( https://github.com/necolas/normalize.css)) | todo
| `.list-group-item > .badge + .badge` ([Bootstrap](https://github.com/twbs/bootstrap)) | todo
| `a[href^="http:"]` ([A Stack Overflow question](http://stackoverflow.com/q/3859101/1317805)) | todo
| <code>ns&#124;*</code> ([Selectors Level 3 W3C Recommendation](https://www.w3.org/TR/css3-selectors/#univnmsp)) | todo
| `E[foo="bar" i]` ([Selectors Level 4 W3C Working Draft](https://www.w3.org/TR/selectors4/)) | todo

This will give you a breakdown of what each of the above selectors does and, if possible, generate a HTML example.