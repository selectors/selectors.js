/* https://github.com/selectors/selectors.js
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
    switch (s.getType(selector).type) {
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

/* This function takes an individual selector and returns an object containing what the
 * selector is and what its namespace is  (e.g. an input of ".foo" would return
 * { namespace: null, type: "class" }).
 * ------
 * @(selector): An individual CSS selector STRING (e.g. foo or .bar).
 */
s.getType = function(selector) {
  if (!selector || typeof selector !== "string")
    throw new Error("s.getType should be passed a non-empty string value, instead was passed " + selector);
    
  var
    parts,
    type
  ;
  
  if (s._isExactMatch(s._combinator, selector))
    type = "combinator";
  else if (s._isExactMatch(s._type_selector, selector)) {
    parts = s._splitNamespaceAndName(selector);
    type = "type";
  }
  else if (s._isExactMatch(s._universal, selector)) {
    parts = s._splitNamespaceAndName(selector);
    type = "universal";
  }
  else if (s._isExactMatch(s._class, selector))
    type = "class";
  else if (s._isExactMatch(s._HASH, selector))
    type = "id";
  else if (s._isExactMatch(s._attrib, selector))
    type = "attribute";
  else if (s._isExactMatch(s._negation, selector))
    type = "negation";
  else if (s._isExactMatch(s._pseudo, selector)) {
    if (selector.charAt(1) !== ":"
      && selector !== ":first-line"
      && selector !== ":first-letter"
      && selector !== ":before"
      && selector !== ":after")
      type = "pseudo-class";
    else
      type = "pseudo-element";
  }
  else
    // If none of the above match, invalid or multiple selectors have been passed in.
    throw new Error("s.getType should be passed 1 valid selector, instead was passed: " + selector);
    
  if (parts)
    return { namespace: parts.namespace, type: type };
  
  return { type: type };
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
    
  if (!s._r.getSelectors)
    s._r.getSelectors = new RegExp(
        s._negation
        + "|"
          + "("
            + s._namespace_prefix
            + "?"
            + "("
              + s._type_selector
              + "|" + s._universal
            + ")"
          + ")"
        + "|" + s._HASH
        + "|" + s._class
        + "|" + s._attrib
        + "|::?(" + s._functional_pseudo + "|" + s._ident + ")"
        + "|" + s._combinator, "g"
      );
  
  var
    r = [],
    matches = selectorSequence.replace(
      s._r.getSelectors, function(match) {
        if (match) {
          var trimmed = match.trim();
          r.push(trimmed == "" && match.length > 0 ? " " : trimmed);
        }
        return '';
      }
    )
  ;
  
  return r;
}

/* This function takes a selector sequence and returns an array of arrays of individual
 * elements (separated by a combinator). This function wraps the above getSelectors and
 * getType functions.
 * ------
 * @{selectorSequence}: A selector sequence (e.g. foo.bar) STRING.
 */
s.getElements = function(selectorSequence) {
  if (!selectorSequence || typeof selectorSequence !== "string")
    return [];
    
  var
    r = [],
    elementIndex = -1;
  ;
  
  s.getSelectors(selectorSequence).forEach(function(selector, index) {
    if (index === 0 || s.getType(selector).type === "combinator")
      elementIndex = r.push([]) - 1;
      
    r[elementIndex].push(selector);
  })
  
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
    
  if (s.getType(attributeSelector).type !== "attribute")
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

/* This function takes an individual pseudo-class or pseudo-element selector and returns
 * an object containing relevant information about it.
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
  
  var selectorType = s.getType(pseudoSelector).type;
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
}

/* This function takes an individual negation selector and returns an object containing
 * relevant information about the selector it contains.
 * 
 *   :not(.bar)
 * 
 *   -> {
 *     selector: ".bar",
 *     type: "class"
 *   }
 * 
 * ------
 * @{negationSelector}: An individual negation selector STRING (e.g. :not(foo)).
 */
s.getNegationInnerSelectorProperties = function(negationSelector) {
  if (!negationSelector || typeof negationSelector !== "string")
    return false;
  
  var selectorType = s.getType(negationSelector).type;
  if (selectorType !== "negation")
    throw new Error("s.getNegationInnerSelectorProperties should be passed 1 valid negation selector, instead was passed " + pseudoSelector);
    
  var 
    innerSelector = s._getArgsFromPseudoClass(negationSelector),
    r = {
      selector: innerSelector,
      type: s.getType(innerSelector).type
    }
  ;
  
  if (r.type === "negation" || r.type === "pseudo-element")
    throw new Error("s.getNegationInnerSelectorProperties was passed a negation selector containing a " + r.type + " selector. Negation selectors are not allowed to contain other negation selectors or pseudo-element selectors.")
  
  return r;
}

/* This function takes a selectors group and returns a string without any noise, that is
 * to say, any comments and style declarations.
 * ------
 * @{selectorsGroup}: A selector sequence (e.g. foo.bar) or selectors group (foo, bar)
 *                    STRING.
 */
s.stripNoise = function(selectorsGroup) {
  if (!selectorsGroup || typeof selectorsGroup !== "string")
    return [];
  
  if (!s._r.stipNoise)
    s._r.stripNoise = new RegExp(
      "\\s*"
      + "("
        + "{.*$"
      + "|"
        + s._comment
      + "|"
        + s._badcomment
      + ")"
      , "gm"
    );
    
  if (!s._r.newLines)
    s._r.newLines = new RegExp(s._nl, "gm");
    
  return selectorsGroup.replace(s._r.newLines, '').replace(s._r.stripNoise, function(match) {
    return '';
  })
}