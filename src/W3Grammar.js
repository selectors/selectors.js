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