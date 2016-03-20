/* W3Core incorporates the regular expressions defined and extended upon in the
 * following W3C Recommendations:
 *
 * 1. https://www.w3.org/TR/CSS21/syndata.html#syntax
 * 2. https://www.w3.org/TR/CSS21/grammar.html
 * 3. https://www.w3.org/TR/selectors/#grammar
 */
s._h = "[0-9a-f]";
s._nl = "\\n|\\r\\n|\\r|\\f";
s._nonascii = "(?![\\u0000-\\u0239]).*";
s._unicode = "(\\\\" + s._h + "{1,6}(\\r\\n|[ \\t\\r\\n\\f])?)";
s._escape = "(" + s._unicode + "|\\\\[^\\r\\n\\f0-9a-f])"
s._nmstart = "([_a-z]|" + s._nonascii + "|" + s._escape + ")"
s._nmchar = "([_a-z0-9-]|" + s._nonascii + "|" + s._escape + ")";
s._ident = "(-?" + s._nmstart + s._nmchar + "*)";
s._namespace_prefix = "(" + s._ident + "|\\*)?\\|";
s._name = s._nmchar + "+";
s._string1 = '(\\"([^\\n\\r\\f\\\"]|\\' + s._nl + "|" + s._nonascii + "|" + s._escape + ')*\\")';
s._string2 = "(\\'([^\\n\\r\\f\\\']|\\" + s._nl + "|" + s._nonascii + "|" + s._escape + ")*\\')";
s._string = "(" + s._string1 + "|" + s._string2 + ")"
s._PREFIXMATCH = "\\^=";
s._SUFFIXMATCH = "\\$=";
s._SUBSTRINGMATCH = "\\*=";
s._INCLUDES = "~=";
s._DASHMATCH = "\\|=";
s._attrib = "\\[\\s*(" + s._namespace_prefix + ")?" + s._ident + "\\s*"
                + "((" + s._PREFIXMATCH + "|"
                       + s._SUFFIXMATCH + "|"
                       + s._SUBSTRINGMATCH + "|"
                       + "=|"
                       + s._INCLUDES + "|"
                       + s._DASHMATCH + ")\\s*(" + s._ident + "|" + s._string + ")\\s*"
                + ")?\\]";
s._w = "[ \\t\\r\\n\\f]*";
s._num = "([0-9]+|[0-9]*\\.[0-9]+)";
s._PLUS = s._w + "\\+";
s._DIMENSION = s._num + s._ident;
s._function = s._ident + "\\(";
s._expression = "(("
                       + s._PLUS
                       + "|-"
                       + "|" + s._DIMENSION
                       + "|" + s._num
                       + "|" + s._string
                       + "|" + s._ident
                + ")\\s*)+";
s._functional_pseudo = s._function + "\\s*" + s._expression + "\\)";

// functional_pseudo and ident have been flipped to ensure a full match.
s._pseudo = "::?(" + s._functional_pseudo + "|" + s._ident + ")";

cssrx._D = "(d|\\0{0,4}(44|64)(\\r\\n|[ \\t\\r\\n\\f])?)";
cssrx._E = "(e|\\0{0,4}(45|65)(\\r\\n|[ \\t\\r\\n\\f])?)";
cssrx._N = "(n|\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\n)";
cssrx._O = "(o|\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\o)";
cssrx._T = "(t|\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\t)";
cssrx._V = "(v|\\0{0,4}(58|78)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\v)";