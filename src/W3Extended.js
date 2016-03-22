/* https://github.com/selectors/selectors.js
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
s._vendor_prefixed_pseudo = ":[-_]" + s._nmstart + s._nmchar + "*-" + s._nmstart + s._nmchar + "*";