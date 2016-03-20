s._identity = "-?([a-zA-Z]|[^\\u0000-\\u009F])([a-zA-Z0-9-]|[^\\u0000-\\u009F])*";
s._INTEGER = "[0-9]+";
s._nth = "\\s*("
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