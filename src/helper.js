/* https://github.com/selectors/selectors.js
 * This file defines non-selector-specific helper functions to reduce repetition within
 * the selectors.js file.
 */
s._r = {};

/* This internal function attempts to exactly match a given test case with a given
 * pattern by wrapping it with ^ and $.
 * ------
 * @{pattern} - A regular expression pattern (STRING or REGEXP).
 * @{testCase} - The STRING to test.
 */
s._isExactMatch = function(pattern, testCase) {
  // If it's already a regular expression, extract the source and use that instead.
  if (pattern instanceof RegExp)
    pattern = pattern.source;
    
  if (!s._r[pattern])
    s._r[pattern] = new RegExp("^" + pattern + "$");
  
  return s._r[pattern].test(testCase);
}