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
 * ------
 * @{selector}: An individual CSS selector STRING (e.g. foo or .bar).
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
   * Note: The above values are all caught in the previous element checks.
   */
  return /^([a-z]+-)+[a-z]+$/.test(selector);
}

s._isValidHtmlAttribute = function(selector) {
  if (!selector || typeof selector !== "string")
    return false;
  
  var
    properties,
    name,
    htmlAttributes = [
      'accept', 'accept-charset', 'accesskey', 'action', 'align', 'alt', 'async',
      'autocomplete', 'autofocus', 'autoplay', 'autosave', 'bgcolor', 'border',
      'buffered', 'challenge', 'charset', 'checked', 'cite', 'class', 'code',
      'codebase', 'color', 'cols', 'colspan', 'content', 'contenteditable',
      'contextmenu', 'controls', 'coords', 'data', 'datetime', 'default', 'defer',
      'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype',
      'for', 'form', 'formaction', 'headers', 'height', 'hidden', 'high', 'href',
      'hreflang', 'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind',
      'label', 'lang', 'language', 'list', 'loop', 'low', 'manifest', 'max',
      'maxlength', 'media', 'method', 'min', 'multiple', 'muted', 'name', 'novalidate',
      'open', 'optimum', 'pattern', 'ping', 'placeholder', 'poster', 'preload',
      'radiogroup', 'readonly', 'rel', 'required', 'reversed', 'role', 'rows',
      'rowspan', 'sandbox', 'scope', 'scoped', 'seamless', 'selected', 'shape', 'size',
      'sizes', 'span', 'spellcheck', 'src', 'srcdoc', 'srclang', 'srcset', 'start',
      'step', 'style', 'summary', 'tabindex', 'target', 'title', 'type', 'usemap',
      'value', 'width', 'wrap'
    ],
    svgAttributes = [
      'accent-height', 'accumulate', 'additive', 'alignment-baseline', 'allowreorder',
      'alphabetic', 'amplitude', 'arabic-form', 'ascent', 'attributename',
      'attributetype', 'autoreverse', 'azimuth', 'basefrequency', 'baseline-shift',
      'baseprofile', 'bbox', 'begin', 'bias', 'by', 'calcmode', 'cap-height', 'class',
      'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation',
      'color-interpolation-filters', 'color-profile', 'color-rendering',
      'contentscripttype', 'contentstyletype', 'cursor', 'cx', 'cy', 'd', 'decelerate',
      'descent', 'diffuseconstant','direction', 'display', 'divisor',
      'dominant-baseline', 'dur', 'dx', 'dy', 'edgemode', 'elevation',
      'enable-background', 'end', 'exponent', 'externalresourcesrequired', 'fill',
      'fill-opacity', 'fill-rule', 'filter', 'filterres', 'filterunits', 'flood-color',
      'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch',
      'font-style', 'font-variant', 'font-weight', 'format', 'from', 'fx', 'fy', 'g1',
      'g2', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical',
      'glyphref', 'gradienttransform', 'gradientunits', 'hanging', 'height',
      'horiz-adv-x', 'horiz-origin-x', 'id', 'ideographic', 'image-rendering', 'in',
      'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kernelmatrix',
      'kernelunitlength', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang',
      'lengthadjust', 'letter-spacing', 'lighting-color', 'limitingconeangle', 'local',
      'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits',
      'markerwidth', 'mask', 'maskcontentunits', 'maskunits', 'mathematical', 'max',
      'media', 'method', 'min', 'mode', 'name', 'numoctaves', 'offset', 'onabort',
      'onactivate', 'onbegin', 'onclick', 'onend', 'onerror', 'onfocusin', 'onfocusout',
      'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup',
      'onrepeat', 'onresize', 'onscroll', 'onunload', 'onzoom', 'opacity', 'operator',
      'order', 'orient', 'orientation', 'origin', 'overflow', 'overline-position',
      'overline-thickness', 'panose-1', 'paint-order', 'pathlength',
      'patterncontentunits', 'patterntransform', 'patternunits', 'pointer-events',
      'points', 'pointsatx', 'pointsaty', 'pointsatz', 'preservealpha',
      'preserveaspectratio', 'primitiveunits', 'r', 'radius', 'refx', 'refy',
      'rendering-intent', 'repeatcount', 'repeatdur', 'requiredextensions',
      'requiredfeatures', 'restart', 'result', 'rotate', 'rx', 'ry', 'scale', 'seed',
      'shape-rendering', 'slope', 'spacing', 'specularconstant', 'specularexponent',
      'speed', 'spreadmethod', 'startoffset', 'stddeviation', 'stemh', 'stemv',
      'stitchtiles', 'stop-color', 'stop-opacity', 'strikethrough-position',
      'strikethrough-thickness', 'string', 'stroke', 'stroke-dasharray',
      'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
      'stroke-opacity', 'stroke-width', 'style', 'surfacescale', 'systemlanguage',
      'tablevalues', 'target', 'targetx', 'targety', 'text-anchor', 'text-decoration',
      'text-rendering', 'textlength', 'to', 'transform', 'type', 'u1', 'u2',
      'underline-position', 'underline-thickness', 'unicode', 'unicode-bidi',
      'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic',
      'v-mathematical', 'values', 'version', 'vert-adv-y', 'vert-origin-x',
      'vert-origin-y', 'viewbox', 'viewtarget', 'visibility', 'width', 'widths',
      'word-spacing', 'writing-mode', 'x', 'x-height', 'x1', 'x2', 'xchannelselector',
      'xlink\\:actuate', 'xlink\\:arcrole', 'xlink\\:href', 'xlink\\:role', 'xlink\\:show',
      'xlink\\:title', 'xlink\\:type', 'xml\:base', 'xml\:lang', 'xml\:space', 'y', 'y1', 'y2',
      'ychannelselector', 'z', 'zoomandpan'
    ],
    mathMlAttributes = [
      'accent', 'accentunder', 'actiontype', 'align', 'alignmentscope', 'altimg',
      'altimg-width', 'altimg-height', 'altimg-valign', 'alttext', 'bevelled',
      'charalign', 'close', 'columnalign', 'columnlines', 'columnspacing', 'columnspan',
      'columnwidth', 'crossout', 'decimalpoint', 'denomalign', 'depth', 'dir',
      'display', 'displaystyle', 'edge', 'equalcolumns', 'equalrows', 'fence', 'form',
      'frame', 'framespacing', 'groupalign', 'height', 'href', 'id', 'indentalign',
      'indentalignfirst', 'indentalignlast', 'indentshift', 'indentshiftfirst',
      'indentshiftlast', 'indenttarget', 'infixlinebreakstyle', 'largeop', 'length',
      'linebreak', 'linebreakmultchar', 'linebreakstyle', 'lineleading',
      'linethickness', 'location', 'longdivstyle', 'lspace', 'lquote', 'mathbackground',
      'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minlabelspacing', 'minsize',
      'movablelimits', 'notation', 'numalign', 'open', 'overflow', 'position',
      'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote',
      'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator',
      'separators', 'shift', 'side', 'src', 'stackalign', 'stretchy', 'subscriptshift',
      'supscriptshift', 'symmetric', 'voffset', 'width', 'xlink\\:href', 'xmlns'
    ],
    waiAriaAttributes = [
      'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy',
      'aria-checked', 'aria-controls', 'aria-describedby', 'aria-disabled',
      'aria-dropeffect', 'aria-expanded', 'aria-flowto', 'aria-grabbed',
      'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-label', 'aria-labelledby',
      'aria-level', 'aria-live', 'aria-multiline', 'aria-multiselect',
      'aria-orientation', 'aria-owns', 'aria-posinset', 'aria-pressed', 'aria-readonly',
      'aria-relevant', 'aria-required', 'aria-selected', 'aria-setsize', 'aria-sort',
      'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext'
    ]
  ;
  
  // Wrapped in a try..catch to return a friendly false.
  try {
    var properties = s.getAttributeProperties(selector);
  }
  catch (e) {
    return false;
  }
  
  if (!properties)
    return false;
    
  name = properties.name;
  
  // If the attribute is contained within any of the above arrays, it's valid.
  if (htmlAttributes.indexOf(name.toLowerCase()) > -1
    || svgAttributes.indexOf(name.toLowerCase()) > -1
    || mathMlAttributes.indexOf(name.toLowerCase()) > -1
    || waiAriaAttributes.indexOf(name.toLowerCase()) > -1)
    return true;
    
  // The only exception is HTML's data-* attribute.
  return name.length > 5 && name.toLowerCase().substr(0,5) === "data-";
}