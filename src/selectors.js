/* https://github.com/JamesDonnelly/Selectors.js
 * This file defines the main object (`s`) and the core selectors.js functionality.
 * `s` is the main object used throughout selectors.js. Everything is called using
 * `s.*`. Internal properties (which shouldn't really be used directly) are prefixed
 * with an '_' (underscore) character (like `s._*`), whereas properties which are
 * designed to be called upon directly aren't.
 */
var
  s = {}
;

/* This function takes a string of selectors and returns either true or false depending
 * on whether it's valid.
 * 
 * It's worth noting that this is somewhat loose validation in that it doesn't validate
 * pseudo-classes or pseudo-elements. It instead lumps them into one pseudo category,
 * with no name checking performed meaning ::hover(2n+1) is counted as valid with this.
 * ------
 * @{selectors}: A STRING of CSS selectors (e.g. foo.bar) or selectors group (foo, bar).
 */
s.isValidSelectorsGroup = function(selectorsGroup) {
  if (typeof selectorsGroup !== "string")
    throw new Error("s.isValidSelectorsGroup expected string value, instead was passed: " + selectorsGroup);
    
  if (selectorsGroup === "")
    return false;
  
  return s._isExactMatch(s._selectors_group, selectorsGroup);
}

/* This function takes an individual selector and returns either true or false depending
 * on whether it's valid.
 * 
 * This is more accurate than s.isValidSelectorsGroup as it compares pseudo-classes and
 * pseudo-elements with the various CSS specifications rather than just assuming
 * anything prefixed with ':' or '::' is valid.
 * ------
 * @{selector}: An individual CSS selector STRING (e.g. foo or .bar).
 * @{htmlStrict}: A BOOLEAN which compares types and attributes with HTML specs.
 */
s.isValidSelector = function(selector, htmlStrict) {
  if (typeof selector !== "string")
    throw new Error("s.isValidSelector expected string value as its first argument, instead was passed: " + selectorsGroup);
  
  var htmlStrict = htmlStrict || false;
  
  if (typeof htmlStrict !== "boolean")
    throw new Error("s.isValidSelector expected boolean value as its second argument, instead was passed: " + selectorsGroup);
  
  /* Validate the selector based on its type.
   * This is wrapped in a try..catch return a friendly false in place of an invalid
   * selector exception.
   */
  try {
    switch (s.getType(selector)) {
      case "type":
        if (htmlStrict) {
          break;
        }
      case "universal":
      case "class":
      case "id":
      case "attribute":
      case "negation":
        return true;
      case "pseudo-class":
        return s._isValidCssPseudoClass(selector);
      case "pseudo-element":
        return s._isValidCssPseudoElement(selector);
    }
  }
  catch (e) {
    return false;
  }
}

/* This function wraps `document.querySelector` to perform faster validation. There are
 * some pitfalls with this though in that it's implemented in different ways in
 * different browsers and for most it doesn't recognise certain valid selector patterns:
 * 
 * 1. Namespaced types and universal (ns|div) returns false.
 * 2. Vendor-prefixed pseudo-classes (:-webkit-... and :_custom-...) return false.
 * 
 * Some browsers also fire off some false positives:
 * 
 * 1. Two hyphens at the start of an identifier (#--) returns true.
 * 
 * Furthermore different browsers have different levels of support for certain
 * selectors. Some browsers have already implemented some of the new Working Draft
 * Level 4 selectors which aren't set in stone yet.
 * ------
 * @{selectors}: A STRING of CSS selectors (e.g. foo.bar) or selectors group (foo, bar).
 */
s.quickValidation = function(selectors) {
  if (!document.querySelector)
    throw new Error("This browser does not support `document.querySelector` which is used by `s.quickValidation`.")
  
  // Wrapped in a try..catch to return a friendly false if necessary.
  try {
    document.querySelector(selectors);
    return true;
  }
  catch (e) {
    return false;
  }
}

/* This function takes an individual selector and returns what it is (e.g. an input of
 * ".foo" would return "class").
 * ------
 * @(selector): An individual CSS selector STRING (e.g. foo or .bar).
 */
s.getType = function(selector) {
  if (s._isExactMatch(s._type_selector, selector))
    return "type";
  else if (s._isExactMatch(s._universal, selector))
    return "universal";
  else if (s._isExactMatch(s._class, selector))
    return "class";
  else if (s._isExactMatch(s._HASH, selector))
    return "id";
  else if (s._isExactMatch(s._attrib, selector))
    return "attribute";
  else if (s._isExactMatch(s._negation, selector))
    return "negation";
  else if (s._isExactMatch(s._pseudo, selector)) {
    if (selector.charAt(1) !== ":"
      && selector !== ":first-line"
      && selector !== ":first-letter"
      && selector !== ":before"
      && selector !== ":after")
      return "pseudo-class";
    else
      return "pseudo-element";
  }
  else
    // If none of the above match, invalid or multiple selectors have been passed in.
    throw new Error("s.getType should be passed 1 valid selector, instead was passed: " + selector);
}