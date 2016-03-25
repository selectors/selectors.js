/*!
 * Selectors.js - https://github.com/selectors/selectors.js

 * Released under the MIT license
 * https://github.com/selectors/selectors.js/blob/master/LICENSE.md

 * Last built: Friday, 25th March 2016; 11:56:40 PM
 */

"use strict";
/* Source: src/selectors.js
 * -------------------------------------------------------------------------------------
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
 * @{selectorsGroup}: A selector sequence (e.g. foo.bar) or selectors group (foo, bar)
 *                    STRING.
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
  
  var htmlStrict = typeof s._isValidHtml === "function" && htmlStrict || false;
  
  if (typeof htmlStrict !== "boolean")
    throw new Error("s.isValidSelector expected boolean value as its second argument, instead was passed: " + selectorsGroup);
  
  /* Validate the selector based on its type.
   * This is wrapped in a try..catch return a friendly false in place of an invalid
   * selector exception.
   */
  try {
    switch (s.getType(selector)) {
      case "type":
        if (htmlStrict)
          return s._isValidHtml("type", selector);
      case "attribute":
        if (htmlStrict)
          return s._isValidHtml("attribute", selector);
      case "universal":
      case "class":
      case "id":
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
  if (!selector || typeof selector !== "string")
    throw new Error("s.getType should be passed a non-empty string value, instead was passed " + selector);
  
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

/* This function takes a selectors group and returns an array of the selector sequences
 * contained within it.
 * ------
 * @{selectorsGroup}: A selector sequence (e.g. foo.bar) or selectors group (foo, bar)
 *                    STRING.
 */
s.getSequences = function(selectorsGroup) {
  if (!selectorsGroup || typeof selectorsGroup !== "string")
    return [];
    
  var
    r = [],
    matches = selectorsGroup.split(",")
  ;
  
  matches.forEach(function(selectorSequence) {
    r.push(selectorSequence.trim())
  })
  
  return r;
}

/* This function takes a selector sequence and returns an array of the individual
 * selectors contained within it.
 * ------
 * @{selectorSequence}: A selector sequence (e.g. foo.bar) STRING.
 */
s.getSelectors = function(selectorSequence) {
  if (!selectorSequence || typeof selectorSequence !== "string")
    return [];
    
  var
    r = [],
    matches = selectorSequence.replace(
      new RegExp(
          s._type_selector
        + "|" + s._universal
        + "|" + s._HASH
        + "|" + s._class
        + "|" + s._attrib
        + "|::?(" + s._functional_pseudo + "|" + s._indent + ")"
        + "|" + s._negation
        + "|" + s._combinator, "g"
      ), function(match) {
        if (match)
          r.push(match.trim());
        return '';
      }
    )
  ;
  
  return r;
}

/* This function takes an individual attribute selector and returns an object containing
 * relevant information about it.
 * 
 *   [ns|att*="val"]
 * 
 *   -> {
 *     namespace: "ns",
 *     name: "att",
 *     symbol: "*=",
 *     value: "val"
 *   }
 * 
 * ------
 * @(attributeSelector): An individual CSS attribute selector STRING (e.g. [att|=val]).
 */
s.getAttributeProperties = function(attributeSelector) {
  if (!attributeSelector || typeof attributeSelector !== "string")
    return false;
    
  if (s.getType(attributeSelector) !== "attribute")
    throw new Error("s.getAttributeProperties should be passed 1 valid attribute selector, instead was passed " + attributeSelector);
    
  var
    namespaceAndName,
    r = {
      namespace: null,
      name: null,
      symbol: null,
      value: null
    }
  ;
  
  // Extract the namespace and name.
  namespaceAndName = s._getNamespaceAndNameFromAttributeSelector(attributeSelector);
  
  // If there is a namespace, split the properties.
  if (namespaceAndName.indexOf("|") > -1) {
    var o = s._splitNamespaceAndName(namespaceAndName);
    r.namespace = o.namespace;
    r.name = o.name;
  }
  // Otherwise the name is this value.
  else
    r.name = namespaceAndName;
    
  // Extract the symbol.
  r.symbol = s._getSymbolFromAttributeSelector(attributeSelector);
  
  // Extract the value.
  r.value = s._getValueFromAttributeSelector(attributeSelector);
  
  return r;
}

/* This function takes an individual attribute selector and returns an object containing
 * relevant information about it.
 * 
 *   :-custom-foo(bar)
 * 
 *   -> {
 *     vendor: "-custom-",
 *     name: "foo",
 *     value: "bar"
 *   }
 * 
 * If the ::first-line, ::first-letter, ::before or ::after selectors are pased in, an
 * extra `colons` property is also returned which is a record of how many colons (1 or
 * 2) the pseudo-element was prefixed with. This is to allow implementations to warn
 * users against the deprecated single-colon syntax.
 * 
 * ------
 * @{pseudoSelector}: An individual pseudo-class or pseudo-element selector STRING (e.g.
 *                    :nth-child(2n) or ::before).
 */
s.getPseudoProperties = function(pseudoSelector) {
  if (!pseudoSelector || typeof pseudoSelector !== "string")
    return false;
  
  var selectorType = s.getType(pseudoSelector);
  if (selectorType !== "pseudo-class"
    && selectorType !== "pseudo-element")
    throw new Error("s.getPseudoProperties should be passed 1 valid pseudo-class or pseudo-element selector, instead was passed " + pseudoSelector);
    
  var     
    // Extract the properties into the resulting r object.
    r = {
      vendor: s._getVendorPrefixFromPseudoSelector(pseudoSelector),
      name: s._getNameFromPseudoSelector(pseudoSelector),
      args: s._getArgsFromPseudoClass(pseudoSelector)
    }
  ;
  
  // If it's a CSS2.1 pseudo-element, count the number of colons.
  if (pseudoSelector === ":first-line"
    || pseudoSelector === ":first-letter"
    || pseudoSelector === ":before"
    || pseudoSelector === ":after")
    r.colons = 1;
  else if (pseudoSelector === "::first-line"
    || pseudoSelector === "::first-letter"
    || pseudoSelector === "::before"
    || pseudoSelector === "::after")
    r.colons = 2;
      
  return r;
};

/* Source: src/helper.js
 * -------------------------------------------------------------------------------------
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
};

/* Source: src/W3Core.js
 * -------------------------------------------------------------------------------------
 * W3Core incorporates the regular expressions defined and extended upon in the
 * following W3C Recommendations' sections:
 *
 * 1. https://www.w3.org/TR/CSS21/syndata.html#tokenization
 * 2. https://www.w3.org/TR/CSS21/grammar.html#scanner
 * 3. https://www.w3.org/TR/selectors/#lex
 * 
 * A lot of these aren't really relevant in the case of Selectors, but everything has
 * been included anyway for the sake of reusability.
 * 
 * Finally the selector implementations are case-insensitive:
 * 
 * > All Selectors syntax is case-insensitive within the ASCII range (i.e. [a-z] and
 * > [A-Z] are equivalent), except for parts that are not under the control of
 * > Selectors. The case sensitivity of document language element names, attribute
 * > names, and attribute values in selectors depends on the document language. For
 * > example, in HTML, element names are case-insensitive, but in XML, they are case-
 * > sensitive.
 * 
 * https://www.w3.org/TR/selectors/#casesens
 */

// h		            [0-9a-f]
s._h = "[0-9a-fA-F]";

// nonascii	        [\240-\4177777]
s._nonascii = "(?![\\u0000-\\u0239]).*";

// unicode		      \\{h}{1,6}(\r\n|[ \t\r\n\f])?
s._unicode = "(\\\\" + s._h + "{1,6}(\\r\\n|[ \\t\\r\\n\\f])?)";

// escape		        {unicode}|\\[^\r\n\f0-9a-f]
s._escape = "(" + s._unicode + "|\\\\[^\\r\\n\\f0-9a-f])";

// nmstart		      [_a-z]|{nonascii}|{escape}
s._nmstart = "([_a-zA-Z]|" + s._nonascii + "|" + s._escape + ")";

// nmchar	          [_a-z0-9-]|{nonascii}|{escape}
s._nmchar = "([_a-zA-Z0-9-]|" + s._nonascii + "|" + s._escape + ")";

// ident		        -?{nmstart}{nmchar}*
s._ident = "(-?" + s._nmstart + s._nmchar + "*)";

// name		          {nmchar}+
s._name = s._nmchar + "+";

// num		          [0-9]+|[0-9]*"."[0-9]+
s._num = "([0-9]+|[0-9]*\\.[0-9]+)";

// s		            [ \t\r\n\f]+
s._s = "[ \\t\\r\\n\\f]+";

// w		            {s}?
s._w = "[ \\t\\r\\n\\f]*";

// nl		            \n|\r\n|\r|\f
s._nl = "\\n|\\r\\n|\\r|\\f";

// string1		      \"([^\n\r\f\\"]|\\{nl}|{escape})*\"
s._string1 = '(\\"([^\\n\\r\\f\\\"]|\\' + s._nl + "|" + s._nonascii + "|" + s._escape + ')*\\")';

// string2		      \'([^\n\r\f\\']|\\{nl}|{escape})*\'
s._string2 = "(\\'([^\\n\\r\\f\\\']|\\" + s._nl + "|" + s._nonascii + "|" + s._escape + ")*\\')";

// string		        {string1}|{string2}
s._string = "(" + s._string1 + "|" + s._string2 + ")"

// invalid1         \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*
//s._invalid1 = "([^\\n\\r\\f\\\"]|" + s._nl + "|" + s._nonascii + "|" + s._escape + ")*";

// invalid2         \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*
//s._invalid2 = "([^\\n\\r\\f\\']|" + s._nl + "|" + s._nonascii + "|" + s._escape + ")*";

// invalid          {invalid1}|{invalid2}
//s._invalid = "(" + s._invalid1 + "|" + s._invalid2 + ")";

// badstring1       \"([^\n\r\f\\"]|\\{nl}|{escape})*\\?
//s._badstring1 = "([^\\n\\r\\f\\\"]|" + s._nl + "|" + s._escape + ")*\\\\?";

// badstring2       \'([^\n\r\f\\']|\\{nl}|{escape})*\\?
//s._badstring2 = "([^\\n\\r\\f\\\"]|" + s._nl + "|" + s._escape + ")*\\\\?";

// badstring        {badstring1}|{badstring2}
//s._badstring = "(" + s._badstring1 + "|" + s._badstring2 + ")";

// badcomment1      \/\*[^*]*\*+([^/*][^*]*\*+)*
//s._badcomment1 = "\\/\\*[^*]*\\*+([^/*][^*]*\+)*";

// badcomment2      \/\*[^*]*(\*+[^/*][^*]*)*
//s._badcomment2 = "\\/\\*[^*]*(\\*+[^/*][^*]*)*";

// badcomment       {badcomment1}|{badcomment2}
//s._badcomment = "(" + s._badcomment1 + "|" + s._badcomment2 + ")";

// comment		      \/\*[^*]*\*+([^/*][^*]*\*+)*\/
//s._comment = "\\/\\*[^*]*\*+([^/*][^*]*\*+)*\\/";

// baduri1          url\({w}([!#$%&*-\[\]-~]|{nonascii}|{escape})*{w}
// baduri2          url\({w}{string}{w}
// baduri3          url\({w}{badstring}
// baduri           {baduri1}|{baduri2}|{baduri3}
// url		          ([!#$%&*-~]|{nonascii}|{escape})*

// A	            	a|\\0{0,4}(41|61)(\r\n|[ \t\r\n\f])?
//s._A = "([aA]|\\0{0,4}(41|61)(\\r\\n|[ \\t\\r\\n\\f])?)";

// C	            	c|\\0{0,4}(43|63)(\r\n|[ \t\r\n\f])?
//s._C = "([cC]|\\0{0,4}(43|63)(\\r\\n|[ \\t\\r\\n\\f])?)";

// D	            	d|\\0{0,4}(44|64)(\r\n|[ \t\r\n\f])?
s._D = "([dD]|\\0{0,4}(44|64)(\\r\\n|[ \\t\\r\\n\\f])?)";

// E	            	e|\\0{0,4}(45|65)(\r\n|[ \t\r\n\f])?
s._E = "([eE]|\\0{0,4}(45|65)(\\r\\n|[ \\t\\r\\n\\f])?)";

// G	            	g|\\0{0,4}(47|67)(\r\n|[ \t\r\n\f])?|\\g
//s._G = "([gG]|\\0{0,4}(47|67)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[gG])";

// H	            	h|\\0{0,4}(48|68)(\r\n|[ \t\r\n\f])?|\\h
//s._H = "([hH]|\\0{0,4}(48|68)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[hH])";

// I	            	i|\\0{0,4}(49|69)(\r\n|[ \t\r\n\f])?|\\i
//s._I = "([iI]|\\0{0,4}(49|69)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[iI])";

// K	            	k|\\0{0,4}(4b|6b)(\r\n|[ \t\r\n\f])?|\\k
//s._K = "([kK]|\\0{0,4}(4b|6b)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[kK])";

// L                l|\\0{0,4}(4c|6c)(\r\n|[ \t\r\n\f])?|\\l
//s._L = "([lL]|\\0{0,4}(4c|6c)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[lL])";

// M	            	m|\\0{0,4}(4d|6d)(\r\n|[ \t\r\n\f])?|\\m
//s._M = "([mM]|\\0{0,4}(4d|6d)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[mM])";

// N	            	n|\\0{0,4}(4e|6e)(\r\n|[ \t\r\n\f])?|\\n
s._N = "([nN]|\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[nN])";

// O	            	o|\\0{0,4}(4f|6f)(\r\n|[ \t\r\n\f])?|\\o
s._O = "([oO]|\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[oO])";

// P	            	p|\\0{0,4}(50|70)(\r\n|[ \t\r\n\f])?|\\p
//s._P = "([pP]|\\0{0,4}(50|70)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[pP])";

// R	            	r|\\0{0,4}(52|72)(\r\n|[ \t\r\n\f])?|\\r
//s._R = "([rR]|\\0{0,4}(52|72)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[rR])";

// S	            	s|\\0{0,4}(53|73)(\r\n|[ \t\r\n\f])?|\\s
//s._S = "([sS]|\\0{0,4}(53|73)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[sS])";

// T	            	t|\\0{0,4}(54|74)(\r\n|[ \t\r\n\f])?|\\t
s._T = "([tT]|\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[tT])";

// U		            u|\\0{0,4}(55|75)(\r\n|[ \t\r\n\f])?|\\u
//s._U = "([uU]|\\0{0,4}(55|75)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[uU])";

// V		            v|\\0{0,4}(58|78)(\r\n|[ \t\r\n\f])?|\\v
s._V = "([vV]|\\0{0,4}(58|78)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[vV])";

// X		            x|\\0{0,4}(58|78)(\r\n|[ \t\r\n\f])?|\\x
//s._X = "([xX]|\\0{0,4}(58|78)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[xX])";

// Z		            z|\\0{0,4}(5a|7a)(\r\n|[ \t\r\n\f])?|\\z
//s._Z = "([zZ]|\\0{0,4}(5a|7a)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\[zZ])";

// "~="             return INCLUDES;
s._INCLUDES = "~=";

// "|="             return DASHMATCH;
s._DASHMATCH = "\\|=";

// "^="             return PREFIXMATCH;
s._PREFIXMATCH = "\\^=";

// "$="             return SUFFIXMATCH;
s._SUFFIXMATCH = "\\$=";

// "*="             return SUBSTRINGMATCH;
s._SUBSTRINGMATCH = "\\*=";

// {ident}"("       return FUNCTION;
s._FUNCTION = s._ident + "\\(";

// "#"{name}        return HASH;
s._HASH = "#" + s._name;

// {w}"+"           return PLUS;
s._PLUS = s._w + "\\+";

// {w}">"           return GREATER;
s._GREATER = s._w + ">";

// {w}","           return COMMA;
s._COMMA = s._w + ",";

// {w}"~"           return TILDE;
s._TILDE = s._w + "~";

// ":"{N}{O}{T}"("  return NOT;
s._NOT = ":" + s._N + s._O + s._T + "\\(";

// @{ident}         return ATKEYWORD;
//s._ATKEYWORD = "@" + s._ident;

// {num}%           return PERCENTAGE;
//s._PERCENTAGE = s._num + "%";

// {num}{ident}     return DIMENSION;
//s._DIMENSION = s._num + s._ident;

// "<!--"           return CDO;
//s._CDO = "<!--";

// "-->"            return CDC;
//s._CDC = "-->";;

/* Source: src/W3Extended.js
 * -------------------------------------------------------------------------------------
 * W3Extended incorporates the regular expressions implied and defined elsewhere in the
 * documentation linked in W3Core.js. For each of these, a link to the source has been
 * provided for ease.
 */

/* INTEGER    [0-9]+
 * https://www.w3.org/TR/selectors/#nth-child-pseudo
 */
s._INTEGER = "[0-9]+";

/* nth
 *  : S* [ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]? |
 *        ['-'|'+']? INTEGER | {O}{D}{D} | {E}{V}{E}{N} ] S*
 *  ;
 * https://www.w3.org/TR/selectors/#nth-child-pseudo
 */
s._nth = "\\s*("
  + "("
    + "[-+]?(" + s._INTEGER + ")?" + s._N
      + "(\\s*[-+]?\\s*" + s._INTEGER + ")?"
  + "|"
    + "[-+]?" + s._INTEGER
  + "|"
    + s._O + s._D + s._D
  + "|"
    + s._E + s._V + s._E + s._N
  + ")\\s*)";

/* :lang(C) ... C must be a valid CSS identifier and must not be empty. (Otherwise, the
 * selector is invalid.
 * 
 * https://www.w3.org/TR/selectors/#lang-pseudo
 */
s._lang = ":lang\\(" + s._ident + "\\)";

/* > In CSS, identifiers may begin with '-' (dash) or '_' (underscore). Keywords and
 * property names beginning with -' or '_' are reserved for vendor-specific extensions.
 * Such vendor-specific extensions should have one of the following formats:
 * 
 *   '-' + vendor identifier + '-' + meaningful name
 *   '_' + vendor identifier + '-' + meaningful name
 * 
 * https://www.w3.org/TR/CSS21/syndata.html#vendor-keywords
 */
s._vendor_prefixed_pseudo = "::?[-_]" + s._nmstart + s._nmchar + "*-" + s._nmstart + s._nmchar + "*";;

/* Source: src/W3Grammar.js
 * -------------------------------------------------------------------------------------
 * W3Grammar incorporates the 'Syntax of Selectors' defined and extended upon in the
 * following W3C Recommendations' sections:
 *
 * 1. https://www.w3.org/TR/CSS21/syndata.html#tokenization
 * 2. https://www.w3.org/TR/CSS21/grammar.html#grammar
 * 3. https://www.w3.org/TR/selectors/#grammar
 * 
 * A lot of these aren't really relevant in the case of Selectors, but everything has
 * been included anyway for the sake of reusability.
 */

/* combinator
 *  // combinators can be surrounded by whitespace
 *  : PLUS S* | GREATER S* | TILDE S* | S+
 *  ;
 */
s._combinator = "((" + s._PLUS + "|" + s._GREATER + "|" + s._TILDE + ")\\s*|\\s+" + ")";

/* namespace_prefix
 *  : [ IDENT | '*' ]? '|'
 *  ;
 */
s._namespace_prefix = "(" + s._ident + "|\\*)?\\|";

/* type_selector
 *  : [ namespace_prefix ]? element_name
 *  ;
 */
s._type_selector = "(" + s._namespace_prefix + ")?" + s._ident;

/* universal
  * : [ namespace_prefix ]? '*'
  * ;
  */
s._universal = "(" + s._namespace_prefix + ")?\\*";

/* class
 *  : '.' IDENT
 *  ;
 */
s._class = "\\." + s._ident;

/* attrib
 *  : '[' S* [ namespace_prefix ]? IDENT S*
 *        [ [ PREFIXMATCH |
 *            SUFFIXMATCH |
 *            SUBSTRINGMATCH |
 *            '=' |
 *            INCLUDES |
 *            DASHMATCH ] S* [ IDENT | STRING ] S*
 *        ]? ']'
 *  ;
 */
s._attrib = "\\[\\s*(" + s._namespace_prefix + ")?" + s._ident + "\\s*"
  + "((" + s._PREFIXMATCH + "|"
    + s._SUFFIXMATCH + "|"
    + s._SUBSTRINGMATCH + "|"
    + "=|"
    + s._INCLUDES + "|"
    + s._DASHMATCH + ")\\s*(" + s._ident + "|" + s._string + ")\\s*"
  + ")?\\]";
  
/* expression
 *  // In CSS3, the expressions are identifiers, strings,
 *  // or of the form "an+b"
 *  : [ [ PLUS | '-' | DIMENSION | NUMBER | STRING | IDENT ] S* ]+
 *  ;
 */
s._expression = "(("
                       + s._PLUS
                       + "|-"
                       + "|" + s._DIMENSION
                       + "|" + s._num
                       + "|" + s._string
                       + "|" + s._ident
                + ")\\s*)+";
                
/* functional_pseudo
 *  : FUNCTION S* expression ')'
 *  ;
 */
s._functional_pseudo = s._FUNCTION + "\\s*" + s._expression + "\\)";

/* pseudo
 *  // '::' starts a pseudo-element, ':' a pseudo-class
 *  // Exceptions: :first-line, :first-letter, :before and :after.
 *  // Note that pseudo-elements are restricted to one per selector and
 *  // occur only in the last simple_selector_sequence.
 *  : ':' ':'? [ IDENT | functional_pseudo ]
 *  ;
 */
s._pseudo = "::?(" + s._ident + "|" + s._functional_pseudo + ")";

/* negation_arg
 *  : type_selector | universal | HASH | class | attrib | pseudo
 *  ;
 */
s._negation_arg = "(" + s._type_selector + "|" + s._universal + "|" + s._HASH + "|" + s._class + "|" + s._attrib + "|" + s._pseudo + ")";

/* negation
 *  : NOT S* negation_arg S* ')'
 *  ;
 */
s._negation = "(" + s._NOT + "\\s*" + s._negation_arg + "\\s*\\)" + ")";

/* simple_selector_sequence
 *  : [ type_selector | universal ]
 *    [ HASH | class | attrib | pseudo | negation ]*
 *  | [ HASH | class | attrib | pseudo | negation ]+
 *  ;
 */
s._simple_selector_sequence = "("
    + "(" + s._type_selector + "|" + s._universal + ")"
    + "(" + s._HASH + "|" + s._class + "|" + s._attrib + "|" + s._pseudo + "|" + s._negation + ")*"
  + "|"
    + "(" + s._HASH + "|" + s._class + "|" + s._attrib + "|" + s._pseudo + "|" + s._negation + ")+"
  + ")";
  
/* selector
 *  : simple_selector_sequence [ combinator simple_selector_sequence ]*
 *  ;
 */
s._selector = s._simple_selector_sequence + "(" + s._combinator + s._simple_selector_sequence + ")*";

/* selectors_group
 *  : selector [ COMMA S* selector ]*
 *  ;
 */
s._selectors_group = s._selector + "(" + s._COMMA + "\\s*" + s._selector + ")*";;

/* Source: src/namespaces.js
 * -------------------------------------------------------------------------------------/* This file offers helper functions for parsing namespaces in the type, universal and
 * attribute selectors.
 */

/* This function splits the namespace and name from e.g. "foo|bar" into an object.
 * ------
 * @{namespaceAndName}: A STRING containing a namespace and name.
 */
s._splitNamespaceAndName = function(namespaceAndName) {  
  if (!namespaceAndName || typeof namespaceAndName !== "string")
    return false;
    
  var r = {
    namespace: null,
    name: null
  };
  
  r.name = namespaceAndName.replace(
    new RegExp("^" + s._namespace_prefix), function(match) {
      r.namespace = match.substr(0, match.length - 1);
      return '';
    }
  );
  
  return r;
};

/* Source: src/attributes.js
 * -------------------------------------------------------------------------------------/* This file offers helper functions for parsing attribute selectors, allowing for
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
};

/* Source: src/pseudo.js
 * -------------------------------------------------------------------------------------
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
  }
  
  // If it's not one of the above, it may be vendor-prefixed.
  return s._isExactMatch(s._vendor_prefixed_pseudo, pseudoElement);
}

/* The below functions extract the various properties from pseudo-class and pseudo-
 * element selectors, allowing for differentiation between the vendor-prefix (1), the
 * name (2) and the arguments (3).
 * 
 *   :-foo-bar(baz)
 *     (1) (2) (3)
 */

/* This function gets the vendor-prefix (1) from the pseudo-class or pseudo-element
 * selector by replacing all of the irrelevant data.
 * ------
 * @{pseudoSelector}: An individual pseudo-class or pseudo-element selector STRING (e.g.
 *                    :nth-child(2n) or ::before).
 */
s._getVendorPrefixFromPseudoSelector = function(pseudoSelector) {
  if (!pseudoSelector || typeof pseudoSelector !== "string")
    return false;
  
  // Return null if it has no vendor-prefix.
  if (!s._isExactMatch(s._vendor_prefixed_pseudo, pseudoSelector))
    return null;
    
  // Split the selector on any nmchar followed by a hyphen.
  var split = pseudoSelector.split(new RegExp(s._nmchar + '-'));
  
  return split[0].substr((pseudoSelector.charAt(1) === ":" ? 2 : 1), split[0].length) + split[1] + '-';
}

/* This function gets the name (2) from the pseudo-class or pseudo-element selector by 
 * replacing all of the irrelevant data.
 * ------
 * @{pseudoSelector}: An individual pseudo-class or pseudo-element selector STRING (e.g.
 *                    :nth-child(2n) or ::before).
 */
s._getNameFromPseudoSelector = function(pseudoSelector) {
  if (!pseudoSelector || typeof pseudoSelector !== "string")
    return false;
    
  return pseudoSelector.replace(
    new RegExp(
        "^::?[-_]" + s._nmstart + s._nmchar + "*-"
      + "|^::?|\\(.*\\)$", "g"
    ), ''
  )
}

/* This function gets the arguments (3) from the pseudo-class selector by replacing all
 * of the irrelevant data.
 * ------
 * @{pseudoClass}: An individual pseudo-class selector STRING (e.g. :nth-child(2n)).
 */
s._getArgsFromPseudoClass = function(pseudoClass) {
  if (!pseudoClass || typeof pseudoClass !== "string")
    return false;
  
  // Return null if it's a pseudo-element or it has no brackets.
  if (s._isValidCssPseudoElement(pseudoClass)
    || !/\)$/.test(pseudoClass))
    return null;
    
  return pseudoClass.replace(/^:.*\(|\)$/g, '');
}