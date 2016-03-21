var s = {};

s.isValidSelector = function(selector) {
  if (typeof selector !== "string")
    throw new Error("s.isValidSelector expected string value, instead was passed: " + selector);
  
  return new RegExp("^" + s._selectors_group + "$").test(selector);
};
/* W3Core incorporates the regular expressions defined and extended upon in the
 * following W3C Recommendations' sections:
 *
 * 1. https://www.w3.org/TR/CSS21/syndata.html#tokenization
 * 2. https://www.w3.org/TR/CSS21/grammar.html#scanner
 * 3. https://www.w3.org/TR/selectors/#lex
 * 
 * A lot of these aren't really relevant in the case of Selectors, but everything has
 * been included anyway for the sake of reusability.
 */

// h		            [0-9a-f]
s._h = "[0-9a-f]";

// nonascii	        [\240-\4177777]
s._nonascii = "(?![\\u0000-\\u0239]).*";

// unicode		      \\{h}{1,6}(\r\n|[ \t\r\n\f])?
s._unicode = "(\\\\" + s._h + "{1,6}(\\r\\n|[ \\t\\r\\n\\f])?)";

// escape		        {unicode}|\\[^\r\n\f0-9a-f]
s._escape = "(" + s._unicode + "|\\\\[^\\r\\n\\f0-9a-f])";

// nmstart		      [_a-z]|{nonascii}|{escape}
s._nmstart = "([_a-z]|" + s._nonascii + "|" + s._escape + ")";

// nmchar	          [_a-z0-9-]|{nonascii}|{escape}
s._nmchar = "([_a-z0-9-]|" + s._nonascii + "|" + s._escape + ")";

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
s._invalid1 = "([^\\n\\r\\f\\\"]|" + s._nl + "|" + s._nonascii + "|" + s._escape + ")*";

// invalid2         \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*
s._invalid2 = "([^\\n\\r\\f\\']|" + s._nl + "|" + s._nonascii + "|" + s._escape + ")*";

// invalid          {invalid1}|{invalid2}
s._invalid = "(" + s._invalid1 + "|" + s._invalid2 + ")";

// badstring1       \"([^\n\r\f\\"]|\\{nl}|{escape})*\\?
s._badstring1 = "([^\\n\\r\\f\\\"]|" + s._nl + "|" + s._escape + ")*\\\\?";

// badstring2       \'([^\n\r\f\\']|\\{nl}|{escape})*\\?
s._badstring2 = "([^\\n\\r\\f\\\"]|" + s._nl + "|" + s._escape + ")*\\\\?";

// badstring        {badstring1}|{badstring2}
s._badstring = "(" + s._badstring1 + "|" + s._badstring2 + ")";

// badcomment1      \/\*[^*]*\*+([^/*][^*]*\*+)*
s._badcomment1 = "\\/\\*[^*]*\\*+([^/*][^*]*\+)*";

// badcomment2      \/\*[^*]*(\*+[^/*][^*]*)*
s._badcomment2 = "\\/\\*[^*]*(\\*+[^/*][^*]*)*";

// badcomment       {badcomment1}|{badcomment2}
s._badcomment = "(" + s._badcomment1 + "|" + s._badcomment2 + ")";

// comment		      \/\*[^*]*\*+([^/*][^*]*\*+)*\/
s._comment = "\\/\\*[^*]*\*+([^/*][^*]*\*+)*\\/";

// baduri1          url\({w}([!#$%&*-\[\]-~]|{nonascii}|{escape})*{w}
// baduri2          url\({w}{string}{w}
// baduri3          url\({w}{badstring}
// baduri           {baduri1}|{baduri2}|{baduri3}
// url		          ([!#$%&*-~]|{nonascii}|{escape})*

// A	            	a|\\0{0,4}(41|61)(\r\n|[ \t\r\n\f])?
s._A = "(a|\\0{0,4}(41|61)(\\r\\n|[ \\t\\r\\n\\f])?)";

// C	            	c|\\0{0,4}(43|63)(\r\n|[ \t\r\n\f])?
s._C = "(c|\\0{0,4}(43|63)(\\r\\n|[ \\t\\r\\n\\f])?)";

// D	            	d|\\0{0,4}(44|64)(\r\n|[ \t\r\n\f])?
s._D = "(d|\\0{0,4}(44|64)(\\r\\n|[ \\t\\r\\n\\f])?)";

// E	            	e|\\0{0,4}(45|65)(\r\n|[ \t\r\n\f])?
s._E = "(e|\\0{0,4}(45|65)(\\r\\n|[ \\t\\r\\n\\f])?)";

// G	            	g|\\0{0,4}(47|67)(\r\n|[ \t\r\n\f])?|\\g
s._G = "(g|\\0{0,4}(47|67)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\g)";

// H	            	h|\\0{0,4}(48|68)(\r\n|[ \t\r\n\f])?|\\h
s._H = "(h|\\0{0,4}(48|68)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\h)";

// I	            	i|\\0{0,4}(49|69)(\r\n|[ \t\r\n\f])?|\\i
s._I = "(i|\\0{0,4}(49|69)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\i)";

// K	            	k|\\0{0,4}(4b|6b)(\r\n|[ \t\r\n\f])?|\\k
s._K = "(k|\\0{0,4}(4b|6b)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\k)";

// L                l|\\0{0,4}(4c|6c)(\r\n|[ \t\r\n\f])?|\\l
s._L = "(l|\\0{0,4}(4c|6c)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\l)";

// M	            	m|\\0{0,4}(4d|6d)(\r\n|[ \t\r\n\f])?|\\m
s._N = "(m|\\0{0,4}(4d|6d)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\m)";

// N	            	n|\\0{0,4}(4e|6e)(\r\n|[ \t\r\n\f])?|\\n
s._N = "(n|\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\n)";

// O	            	o|\\0{0,4}(4f|6f)(\r\n|[ \t\r\n\f])?|\\o
s._O = "(o|\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\o)";

// P	            	p|\\0{0,4}(50|70)(\r\n|[ \t\r\n\f])?|\\p
s._P = "(p|\\0{0,4}(50|70)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\p)";

// R	            	r|\\0{0,4}(52|72)(\r\n|[ \t\r\n\f])?|\\r
s._R = "(r|\\0{0,4}(52|72)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\r)";

// S	            	s|\\0{0,4}(53|73)(\r\n|[ \t\r\n\f])?|\\s
s._S = "(s|\\0{0,4}(53|73)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\s)";

// T	            	t|\\0{0,4}(54|74)(\r\n|[ \t\r\n\f])?|\\t
s._T = "(t|\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\t)";

// U		            u|\\0{0,4}(55|75)(\r\n|[ \t\r\n\f])?|\\u
s._U = "(u|\\0{0,4}(55|75)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\u)";

// V		            v|\\0{0,4}(58|78)(\r\n|[ \t\r\n\f])?|\\v
s._V = "(v|\\0{0,4}(58|78)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\v)";

// X		            x|\\0{0,4}(58|78)(\r\n|[ \t\r\n\f])?|\\x
s._X = "(x|\\0{0,4}(58|78)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\x)";

// Z		            z|\\0{0,4}(5a|7a)(\r\n|[ \t\r\n\f])?|\\z
s._Z = "(z|\\0{0,4}(5a|7a)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\z)";

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
s._ATKEYWORD = "@" + s._ident;

// {num}%           return PERCENTAGE;
s._PERCENTAGE = s._num + "%";

// {num}{ident}     return DIMENSION;
s._DIMENSION = s._num + s._ident;

// "<!--"           return CDO;
s._CDO = "<!--";

// "-->"            return CDC;
s._CDC = "-->";;
/* W3Extended incorporates the regular expressions implied and defined elsewhere in the
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
  + ")\\s*)";;
/* W3Grammar incorporates the 'Syntax of Selectors' defined and extended upon in the
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
s._unversal = "(" + s._namespace_prefix + ")?\\*";

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
 * 
 * Selectors.js: functional_pseudo and ident have been flipped to ensure a full match.
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
s._negation = "(" + s._NOT + "\\s*" + s._negation_arg + "\\s*" + ")";

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
s._selectors_group = s._selector + "(" + s._COMMA + "\\s*" + s._selector + ")*";