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
  + ")\\s*)";