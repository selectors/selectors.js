/* Before we begin, CSS documentation is a bit confusing. It defines things which
 * appear to contradict other things its also defined. This is probably why different
 * browsers differ so much in their implementations. This file will document why certain
 * regular expression patterns have been used in an attempt to avoid confusion.
 */
var cssrx = {};

/* For element names, classes and IDs this uses this excerpt from the CSS2.1 docs:
 *
 * >  In CSS, identifiers (including element names, classes, and IDs in selectors) can
 * >  contain only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and
 * >  higher, plus the hyphen (-) and the underscore (_); they cannot start with a
 * >  digit, two hyphens, or a hyphen followed by a digit.
 * 
 * https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
 * 
 * This means that emoticons are completely valid, but numbers at the start arent.
 */
cssrx._h = "[0-9a-f]";
cssrx._nl = "\\n|\\r\\n|\\r|\\f";
cssrx._nonascii = "(?![\\u0000-\\u0239]).*";
cssrx._unicode = "(\\\\" + cssrx._h + "{1,6}(\\r\\n|[ \\t\\r\\n\\f])?)";
cssrx._escape = "(" + cssrx._unicode + "|\\\\[^\\r\\n\\f0-9a-f])"
cssrx._nmstart = "([_a-z]|" + cssrx._nonascii + "|" + cssrx._escape + ")"
cssrx._nmchar = "([_a-z0-9-]|" + cssrx._nonascii + "|" + cssrx._escape + ")";
cssrx._ident = "(-?" + cssrx._nmstart + cssrx._nmchar + "*)";
cssrx._namespace_prefix = "(" + cssrx._ident + "|\\*)?\\|";

// Not to be confused with cssrx._ident, which doesn't follow the rules.
cssrx._identity = "-?([a-zA-Z]|[^\\u0000-\\u009F])([a-zA-Z0-9-]|[^\\u0000-\\u009F])*";

/* >  type_selector
 * >   : [ namespace_prefix ]? element_name
 * >   ;
 */
cssrx._type = "(" + cssrx._namespace_prefix + ")?" + cssrx._identity;

/* > universal
 * >  : [ namespace_prefix ]? '*'
 * >  ;
 */
cssrx._universal = "(" + cssrx._namespace_prefix + ")?\\*";

cssrx.type = new RegExp("^" + cssrx._type + "$");
cssrx.universal = new RegExp("^" + cssrx._universal + "$");

cssrx.className = new RegExp("^\\." + cssrx._identity + "$");
cssrx.id = new RegExp("^\\#" + cssrx._identity + "$");

/* For attributes, this uses the Grammar section of the Selectors Level 3 doc:
 *
 * >  attrib
 * >   : '[' S* [ namespace_prefix ]? IDENT S*
 * >         [ [ PREFIXMATCH |
 * >             SUFFIXMATCH |
 * >             SUBSTRINGMATCH |
 * >             '=' |
 * >             INCLUDES |
 * >             DASHMATCH ] S* [ IDENT | STRING ] S*
 * >         ]? ']'
 * >   ;
 * 
 * https://www.w3.org/TR/selectors/#w3cselgrammar
 * 
 * For this we implement the rest of the grammar denoted in that section before using
 * this `attrib` property to match the attributes.
 */
cssrx._name = cssrx._nmchar + "+";
cssrx._string1 = '(\\"([^\\n\\r\\f\\\"]|\\' + cssrx._nl + "|" + cssrx._nonascii + "|" + cssrx._escape + ')*\\")';
cssrx._string2 = "(\\'([^\\n\\r\\f\\\']|\\" + cssrx._nl + "|" + cssrx._nonascii + "|" + cssrx._escape + ")*\\')";
cssrx._string = "(" + cssrx._string1 + "|" + cssrx._string2 + ")"
cssrx._PREFIXMATCH = "\\^=";
cssrx._SUFFIXMATCH = "\\$=";
cssrx._SUBSTRINGMATCH = "\\*=";
cssrx._INCLUDES = "~=";
cssrx._DASHMATCH = "\\|=";
cssrx._attrib = "\\[\\s*(" + cssrx._namespace_prefix + ")?" + cssrx._ident + "\\s*"
                + "((" + cssrx._PREFIXMATCH + "|"
                       + cssrx._SUFFIXMATCH + "|"
                       + cssrx._SUBSTRINGMATCH + "|"
                       + "=|"
                       + cssrx._INCLUDES + "|"
                       + cssrx._DASHMATCH + ")\\s*(" + cssrx._ident + "|" + cssrx._string + ")\\s*"
                + ")?\\]";

// https://regex101.com/r/sC0fK1/1
cssrx.attribute = new RegExp("^" + cssrx._attrib + "$");

// https://regex101.com/r/tG3zB8/1
cssrx._attribNamespaceAndName = "^\\[\\s*|\\s*"
                + "((" + cssrx._PREFIXMATCH + "|"
                       + cssrx._SUFFIXMATCH + "|"
                       + cssrx._SUBSTRINGMATCH + "|"
                       + "=|"
                       + cssrx._INCLUDES + "|"
                       + cssrx._DASHMATCH + ")\\s*(" + cssrx._ident + "|" + cssrx._string + ")\\s*"
                + ")?\\]$";

// https://regex101.com/r/kW6wY9/1
cssrx._attribValue = "^\\[\\s*(" + cssrx._namespace_prefix + ")?" + cssrx._ident + "\\s*"
                + "((" + cssrx._PREFIXMATCH + "|"
                       + cssrx._SUFFIXMATCH + "|"
                       + cssrx._SUBSTRINGMATCH + "|"
                       + "=|"
                       + cssrx._INCLUDES + "|"
                       + cssrx._DASHMATCH + ")\\s*[\"']?)?|[\"']?\\]$";

// https://regex101.com/r/oR3pP5/1
cssrx._attribSymbol = "\\[\\s*(" + cssrx._namespace_prefix + ")?" + cssrx._ident + "\\s*|"
                + "(\\s*(" + cssrx._ident + "|" + cssrx._string + ")\\s*)?\\]";

/* This can be used to return the properties of the attribute selector passed in.
 * It splits out the various parts:
 * 
 *   [ns|foo*='bar baz']
 * 
 *   -> { namespace: "ns", name: "foo", symbol: "*=", value: "bar baz" }
 */
cssrx.getAttributeProperties = function(attribute) {
  if (typeof attribute !== "string")
    return false;
  
  var
    attNamespaceAndIdent = attribute.replace(new RegExp(cssrx._attribNamespaceAndName, "g"), ''),
    attValue = attribute.replace(new RegExp(cssrx._attribValue, "g"), ''),
    attSymbol = attribute.replace(new RegExp(cssrx._attribSymbol, "g"), ''),
    
    // https://regex101.com/r/jP2mU4/1
    attNamespace = attNamespaceAndIdent.replace(new RegExp("\\|?" + cssrx._ident + "$"), ''),
    
    // https://regex101.com/r/yC8jS7/1
    attName = attNamespaceAndIdent.replace(new RegExp("^" + cssrx._namespace_prefix), '')
  ;
  
  /* Break if it's a string but not a real attribute (e.g. `wildebeest` instead of
   * `[wildebeest]`), or simply a missing attribute name (e.g. [=bar]).
   */
  if (!attName || attName === attSymbol && attName === attValue)
    return false;
  
  return {
    namespace: attNamespace,
    name: attName,
    symbol: attSymbol,
    value: attValue
  }
}

/* This also uses the Grammar section of the Selectors Level 3 doc for pseudo-classes
 * and pseudo-elements:
 *
 * >  pseudo
 * >   // '::' starts a pseudo-element, ':' a pseudo-class
 * >   // Exceptions: :first-line, :first-letter, :before and :after.
 * >   // Note that pseudo-elements are restricted to one per selector and
 * >   // occur only in the last simple_selector_sequence.
 * >    : ':' ':'? [ IDENT | functional_pseudo ]
 * >    ;
 *
 * >  functional_pseudo
 * >    : FUNCTION S* expression ')'
 * >    ;
 * 
 * >  expression
 * >   // In CSS3, the expressions are identifiers, strings,
 * >   // or of the form "an+b"
 * >    : [ [ PLUS | '-' | DIMENSION | NUMBER | STRING | IDENT ] S* ]+
 * >    ;
 * 
 * https://www.w3.org/TR/selectors/#w3cselgrammar
 * 
 * Firstly we implement these, then narrow it down based on the specific pseudo-class or
 * pseudo-element.
 */

cssrx._w = "[ \\t\\r\\n\\f]*";
cssrx._num = "([0-9]+|[0-9]*\\.[0-9]+)";
cssrx._PLUS = cssrx._w + "\\+";
cssrx._DIMENSION = cssrx._num + cssrx._ident;
cssrx._function = cssrx._ident + "\\(";
cssrx._expression = "(("
                       + cssrx._PLUS
                       + "|-"
                       + "|" + cssrx._DIMENSION
                       + "|" + cssrx._num
                       + "|" + cssrx._string
                       + "|" + cssrx._ident
                + ")\\s*)+";
cssrx._functional_pseudo = cssrx._function + "\\s*" + cssrx._expression + "\\)";

// functional_pseudo and ident have been flipped to ensure a full match.
cssrx._pseudo = "::?(" + cssrx._functional_pseudo + "|" + cssrx._ident + ")";

/* This can be used to test if it's a pseudo-class or pseudo-element.
 * https://regex101.com/r/eC1bO4/1
 * 
 * This is practical, but not perfect. There is no `:potato` selector in HTML, for
 * instance, neither are there any pseudo-elements which are functions (it matches
 * `::before()`, etc.).
 */
cssrx.pseudo = new RegExp("^" + cssrx._pseudo + "$");

cssrx._D = "(d|\\0{0,4}(44|64)(\\r\\n|[ \\t\\r\\n\\f])?)";
cssrx._E = "(e|\\0{0,4}(45|65)(\\r\\n|[ \\t\\r\\n\\f])?)";
cssrx._N = "(n|\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\n)";
cssrx._O = "(o|\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\o)";
cssrx._T = "(t|\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\t)";
cssrx._V = "(v|\\0{0,4}(58|78)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\v)";

cssrx._INTEGER = "[0-9]+";

/* `:nth-*` pseudo-classes use the following to validate their functions:
 * 
 * > ...where INTEGER matches the token `[0-9]+`...
 * >
 * >  nth
 * >   : S* [ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]? |
 * >          ['-'|'+']? INTEGER | {O}{D}{D} | {E}{V}{E}{N} ] S*
 * >   ;
 * 
 * https://www.w3.org/TR/selectors/#nth-child-pseudo
 * https://regex101.com/r/cQ3pR9/1
 */
cssrx._nth = "\\s*("
  + "("
    + "[-+]?(" + cssrx._INTEGER + ")?" + cssrx._N
      + "(\\s*[-+]?\\s*" + cssrx._INTEGER + ")?"
  + "|"
    + "[-+]?" + cssrx._INTEGER
  + "|"
    + cssrx._O + cssrx._D + cssrx._D
  + "|"
    + cssrx._E + cssrx._V + cssrx._E + cssrx._N
  + ")\\s*)";
  
/* This first expression caters for peudo-classes exclusively. This is complex in nature
 * due to the varieties of pseudo-class which exist. For instance, `:hover` isn't a
 * function; `:nth-child` is a function which can accept values like `(2n+1)`, ` 9n`,
 * and `even`; `:lang` is a completely different function; etc.
 * 
 * This exact selector isn't part of any specification. In theory it should probably
 * also be signling out characters via `cssrx._{char}`, but that'd make this a lot
 * harder to read.
 * 
 * This also implements vendor prefixes noted in the Vendor-Prefix Extensions section of
 * the CSS2.1 Recommendation: https://www.w3.org/TR/CSS21/syndata.html#vendor-keywords,
 * with `prince-` ommitted due to it not conforming with standards.
 * 
 * Further reading: https://www.w3.org/TR/CSS/#future-proofing.
 */
cssrx._pseudoClass = ":("
    + "(root|first-child|last-child|first-of-type|last-of-type|only-child|only-of-type|empty|link|visited|active|hover|focus|target|enabled|disabled|checked)"
  + "|"
    + "(nth-child|nth-last-child|nth-of-type|nth-last-of-type)\\(" + cssrx._nth + "\\)"
  + "|"
    + "lang\\(" + cssrx._ident + "\\)"
  + "|"
    + "-(ms|mso|moz|o|xv|atsc|wap|khtml|webkit|ah|hp|ro|rim|tc)-" + cssrx._identity
  + "|"
    + "[-_]" + cssrx._ident + "-" + cssrx._identity
  + ")";
  
// https://regex101.com/r/eD0gG0/1
cssrx.pseudoClass = new RegExp("^" + cssrx._pseudoClass + "$");

/* Pseudo-elements are a lot easier to detect as there's much less variation.
 * For these, this part of the Selectors Level 3 docs are followed:
 * 
 * >  A pseudo-element is made of two colons (::) followed by the name of the
 * >  pseudo-element. ...  For compatibility with existing style sheets, user agents
 * >  must also accept the previous one-colon notation for pseudo-elements introduced in
 * >  CSS levels 1 and 2 (namely, :first-line, :first-letter, :before and :after).
 * 
 * https://www.w3.org/TR/selectors/#pseudo-elements
 */
cssrx._pseudoElement = ":(:?(first-line|first-letter|before|after))";

// https://regex101.com/r/kF3kD0/1
cssrx.pseudoElement = new RegExp("^" + cssrx._pseudoElement + "$");

/* Next we implement combinators.
 *
 * >  combinator
 * >   // combinators can be surrounded by whitespace
 * >   : PLUS S* | GREATER S* | TILDE S* | S+
 * >   ;
 * 
 * https://www.w3.org/TR/selectors/#grammar
 */
cssrx._GREATER = cssrx._w + "\\>";
cssrx._TILDE = cssrx._w + "~";

// https://regex101.com/r/uY2sH4/1
cssrx._combinator = "((" + cssrx._PLUS + "|" + cssrx._GREATER + "|" + cssrx._TILDE + ")\\s*|\\s+" + ")";

cssrx.combinator = new RegExp("^" + cssrx._combinator + "$");

/* Finally we combine them all into one selector.
 */
// cssrx.any = "(^|,|})(\\s*("
//     + cssrx._identity + "|"
//     + "\\." + cssrx._identity + "|"
//     + "#" + cssrx._identity + "|"
//     + cssrx._attrib + "|"
//     + cssrx._pseudoClass + "|"
//   + ")\\s*)+(" + cssrx._pseudoElement + ")?\\s*(,|{|$)";