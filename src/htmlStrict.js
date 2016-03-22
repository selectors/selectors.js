/* https://github.com/selectors/selectors.js
 * This file offers HTML5 validation, primarily on element names and attribute names and
 * their values.
 */

/* This is the main function in this file. It determines which function to return based
 * on the specified type input.
 * ------
 * @{type}: The STRING type of selector (e.g. "type" or "attribute").
 * @{selector}: An individual CSS selector STRING (e.g. foo or .bar).
 */
s._isValidHtml = function(type, selector) {  
  if (type === "type")
    return s._isValidHtmlElement(selector);
  if (type === "attribute")
    return s.isValidHtmlAttribute(selector);
}

/* This function validates a CSS type selector to ensure it has a corresponding element
 * within the HTML5 specification. This includes everything which isn't part of the
 * document's Obsolete Features section (https://www.w3.org/TR/html5/obsolete.html).
 * 
 * It also includes SVG elements defined in the Scalable Vector Graphics (SVG) 1.1
 * (Second Edition) (https://www.w3.org/TR/SVG11) and the MathML elements defined in the
 * Mathematical Markup Language (MathML) Version 3.0 2nd Edition
 * (https://www.w3.org/TR/MathML).
 * 
 * It also allows custom elements in the format defined by the Custom Elements Working 
 * Draft (https://www.w3.org/TR/custom-elements).
 */
s._isValidHtmlElement = function(selector) {
  if (!selector || typeof selector !== "string")
    return false;
  
  var
    htmlElements = [
      'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi',
      'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code',
      'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del',
      'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'element', 'em', 'embed',
      'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5',
      'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input',
      'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark',
      'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup',
      'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt',
      'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small',
      'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody',
      'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr',
      'track', 'u', 'ul', 'var', 'video', 'wbr'
    ],
    svgElements = [
      "a", "altglyph", "altglyphdef", "altglyphitem", "animate", "animatecolor",
      "animatemotion", "animatetransform", "circle", "clippath", "color-profile",
      "cursor", "defs", "desc", "ellipse", "feblend", "fecolormatrix",
      "fecomponenttransfer", "fecomposite", "feconvolvematrix", "fediffuselighting",
      "fedisplacementmap", "fedistantlight", "feflood", "fefunca", "fefuncb", "fefuncg",
      "fefuncr", "fegaussianblur", "feimage", "femerge", "femergenode", "femorphology",
      "feoffset", "fepointlight", "fespecularlighting", "fespotlight", "fetile",
      "feturbulence", "filter", "font", "font-face", "font-face-format",
      "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "g", "glyph",
      "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask",
      "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline",
      "radialgradient", "rect", "script", "set", "stop", "style", "svg", "switch",
      "symbol", "text", "textpath", "title", "tref", "tspan", "use", "view", "vkern"
    ],
    mathMlElements = [
      'annotation', 'annotation-xml', 'maction', 'math', 'menclose', 'merror',
      'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo',
      'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt',
      'mstyle', 'msub', 'msubsup', 'msup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder',
      'munderover', 'semantics'
    ]
  ;
  
  // If the selector is contained within any of the above arrays, it's valid.
  if (htmlElements.indexOf(selector.toLowerCase()) > -1
    || svgElements.indexOf(selector.toLowerCase()) > -1
    || mathMlElements.indexOf(selector.toLowerCase()) > -1)
    return true;
    
  /* If it's not contained in the array above, it might be a custom element.
   *
   * > The custom element type identifies a custom element interface and is a sequence
   * > of characters that must match the NCName production, must contain a U+002D
   * > HYPHEN-MINUS character, and must not contain any uppercase ASCII letters.
   * > The custom element type must not be one of the following values:
   * > 
   * > - annotation-xml
   * > - color-profile
   * > - font-face
   * > - font-face-src
   * > - font-face-uri
   * > - font-face-format
   * > - font-face-name
   * > - missing-glyph
   * 
   * https://www.w3.org/TR/custom-elements/#h-concepts
   * 
   * Note: The above values are all caught in the above element checks.
   */
  return new RegExp("^([a-z]+-)+[a-z]+$").test(selector);
}

s._isValidHtmlAttribute = function(selector) {
  return true;
}