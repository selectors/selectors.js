/* This file offers helper functions for parsing attribute selectors, allowing for
 * differentiation between the namespace (1), name (2), symbol (3) and value (4):
 * 
 *   [ns|att = val]
 *    (1)(2)(3)(4)
 * 
 * Note: Attribute names can include namespaces, these can be extracted 
 */

/* This function gets the namespace (1) and name (2) from an attribute selector by
 * replacing all of the irrelevant data.
 * ------
 * @{attributeSelector}: An individual attribute selector STRING (e.g. [att=val]).
 */
s._getNamespaceAndNameFromAttributeSelector = function(attributeSelector) {
  if (!attributeSelector || typeof attributeSelector !== "string")
    return false;
    
  return attributeSelector.replace(
    new RegExp(
        "(^\\[\\s*|\\s*"
      + "((" + s._PREFIXMATCH + "|"
      + s._SUFFIXMATCH + "|"
      + s._SUBSTRINGMATCH + "|"
      + "=|"
      + s._INCLUDES + "|"
      + s._DASHMATCH + ")\\s*(" + s._ident + "|" + s._string + ")\\s*"
      + ")?\\]$)", "g"
    ), ''
  );
}

/* This function gets the symbol (3) from an attribute selector by replacing all of the
 * irrelevant data.
 * ------
 * @{attributeSelector}: An individual attribute selector STRING (e.g. [att=val]).
 */
s._getSymbolFromAttributeSelector = function(attributeSelector) {
  if (!attributeSelector || typeof attributeSelector !== "string")
    return false;
  
  return attributeSelector.replace(
    new RegExp(
        "(^\\[\\s*(" + s._namespace_prefix + ")?" + s._ident + "\\s*|"
      + "\\s*(" + s._ident + "|" + s._string + ")\\s*|"
      + "\\]$)", "g"
    ), ''
  );
}

/* This function gets the value (4) from an attribute selector by replacing all of the
 * irrelevant data.
 * ------
 * @{attributeSelector}: An individual attribute selector STRING (e.g. [att=val]).
 */
s._getValueFromAttributeSelector = function(attributeSelector) {
  if (!attributeSelector || typeof attributeSelector !== "string")
    return false;
    
  return attributeSelector.replace(
    new RegExp(
        "(^\\[\\s*(" + s._namespace_prefix + ")?" + s._ident + "\\s*"
      + "(" + s._PREFIXMATCH + "|"
      + s._SUFFIXMATCH + "|"
      + s._SUBSTRINGMATCH + "|"
      + "=|"
      + s._INCLUDES + "|"
      + s._DASHMATCH + ")\\s*[\"']?|"
      + "[\"']?\\s*\\]$)", "g"
    ), ''
  );
}