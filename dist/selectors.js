/* W3Core incorporates the regular expressions defined and extended upon in the
 * following W3C Recommendations:
 *
 * 1. https://www.w3.org/TR/CSS21/syndata.html#syntax
 * 2. https://www.w3.org/TR/CSS21/grammar.html
 * 3. https://www.w3.org/TR/selectors/#grammar
 */
cssrx._h = "[0-9a-f]";
cssrx._nl = "\\n|\\r\\n|\\r|\\f";
cssrx._nonascii = "(?![\\u0000-\\u0239]).*";
cssrx._unicode = "(\\\\" + cssrx._h + "{1,6}(\\r\\n|[ \\t\\r\\n\\f])?)";
cssrx._escape = "(" + cssrx._unicode + "|\\\\[^\\r\\n\\f0-9a-f])"
cssrx._nmstart = "([_a-z]|" + cssrx._nonascii + "|" + cssrx._escape + ")"
cssrx._nmchar = "([_a-z0-9-]|" + cssrx._nonascii + "|" + cssrx._escape + ")";
cssrx._ident = "(-?" + cssrx._nmstart + cssrx._nmchar + "*)";
cssrx._namespace_prefix = "(" + cssrx._ident + "|\\*)?\\|";;
var banana = "Hello, Miss Rudge";