/* https://github.com/JamesDonnelly/Selectors.js
 * This file defines non-selector-specific helper functions to reduce repetition within
 * the selectors.js file.
 */

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
    
  return new RegExp("^" + pattern + "$").test(testCase);
}