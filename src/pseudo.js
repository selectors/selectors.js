/* https://github.com/selectors/selectors.js
 * This file provides helper functions and expressions related to pseudo-classes and
 * pseudo-elements.
 */

/* This function takes a pseudo class and validates it according to the various CSS
 * documentation, specifically:
 * 
 * 1. https://www.w3.org/TR/selectors/#pseudo-classes
 * 2. https://www.w3.org/TR/CSS21/syndata.html#vendor-keywords
 * ------
 * @{pseudoClass}: An individual pseudo-class selector STRING (e.g. :hover).
 */
s._isValidCssPseudoClass = function(pseudoClass) {
  if (!pseudoClass || typeof pseudoClass !== "string")
    return false;
  
  var
    simple = [
      ':root', ':first-child', ':last-child', ':first-of-type', ':last-of-type',
      ':only-child', ':only-of-type', ':empty', ':link', ':visited', ':active',
      ':hover', ':focus', ':target', ':enabled', ':disabled', ':checked'
    ],
    nth = [
      ':nth-child', ':nth-last-child', ':nth-of-type', ':nth-last-of-type'
    ],
    brackets = /\(.*\)$/,
    noBrackets,
    hasBrackets = false
  ;
  
  // If it's one of the simple pseudo-classes it's valid right away.
  if (simple.indexOf(pseudoClass.toLowerCase()) > -1)
    return true;
    
  // Strip any brackets for the next few checks.
  noBrackets = pseudoClass.replace(brackets, function() {
    hasBrackets = true;
    return '';
  });  
  
  // If it has brackets, check and validate functions.
  if (hasBrackets) {
    // If it's the lang attribute, ensure it has a value.
    if (noBrackets === ":lang")
      return s._isExactMatch(s._lang, pseudoClass);
    
    // If it's an nth-* pseudo-class, validate its function.
    if (nth.indexOf(noBrackets) > -1) {
      // Grab the brackets.
      var bracketValue = pseudoClass.match(brackets, '');
      
      // Ensure they exist, otherwise it's invalid.
      if (!bracketValue || !bracketValue.length || !bracketValue[0])
        return false;
      
      // Validate it with the s._nth expression.
      return s._isExactMatch(s._nth, bracketValue[0].replace(/\(|\)/g, ''));
    }
  }
  
  // If it gets this far it's a vendor-prefixed pseudo-class.
  return s._isExactMatch(s._vendor_prefixed_pseudo, pseudoClass);
}

/* This function takes a pseudo element and validates it according to section 7 (Pseudo-
 * elements) within the Selectors Level 3 recommendation:
 * 
 * > A pseudo-element is made of two colons (::) followed by the name of the pseudo
 * > element.
 *
 * > This :: notation is introduced by the current document in order to establish a
 * > discrimination between pseudo-classes and pseudo-elements. For compatibility with
 * > existing style sheets, user agents must also accept the previous one-colon notation
 * > for pseudo-elements introduced in CSS levels 1 and 2 (namely, :first-line,
 * > :first-letter, :before and :after). This compatibility is not allowed for the new
 * > pseudo-elements introduced in this specification.
 * 
 * https://www.w3.org/TR/selectors/#pseudo-elements
 * 
 * Note: The last sentence there is an artifact from when the Level 3 document
 *       implemented a new ::selection pseudo-element. This has since been removed. 
 * ------
 * @{pseudoElement}: An individual pseudo-element selector STRING (e.g. ::first-line).
 */
s._isValidCssPseudoElement = function(pseudoElement) {
  if (!pseudoElement || typeof pseudoElement !== "string")
    return false;
  
  switch (pseudoElement.toLowerCase()) {
    case ":first-line":
    case ":first-letter":
    case ":before":
    case ":after":
    case "::first-line":
    case "::first-letter":
    case "::before":
    case "::after":
      return true;
    default:
      return false;
  }
}