/* This file defines the main object (`s`) and the core selectors.js functionality.
 * `s` is the main object used throughout selectors.js. Everything is called using
 * `s.*`. Internal properties (which shouldn't really be used directly) are prefixed
 * with an '_' (underscore) character (like `s._*`), whereas properties which are
 * designed to be called upon directly aren't.
 */
var s = {};

/* This function takes a string of selectors and returns either true or false depending
 * on whether it's valid.
 * ------
 * @{selector}: A string of CSS selectors (e.g. foo.bar) or selector groups (foo, .bar).
 */
s.isValidSelector = function(selector) {
  if (typeof selector !== "string")
    throw new Error("s.isValidSelector expected string value, instead was passed: " + selector);
    
  if (selector === "")
    return false;
  
  return new RegExp("^" + s._selectors_group + "$").test(selector);
}