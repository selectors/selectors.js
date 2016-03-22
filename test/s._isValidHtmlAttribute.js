describe("s._isValidHtmlAttribute( selector )", function() {
  describe("Valid HTML attributes", function() {
    it("Validates `[style='color: red;']`", function() {
      expect(s._isValidHtmlAttribute("[style='color: red;']")).toEqual(true);
    });
    
    it("Validates `[CLASS]`", function() {
      expect(s._isValidHtmlAttribute('[CLASS]')).toEqual(true);
    });
    
    it("Validates `[ColSpan|=foo]`", function() {
      expect(s._isValidHtmlAttribute('[ColSpan|=foo]')).toEqual(true);
    });
  });
  
  describe("Valid SVG attributes", function() {
    it("Validates `underline-position`", function() {
      expect(s._isValidHtmlAttribute('[underline-position^=foo]')).toEqual(true);
    });
    
    it("Validates `[xlink\\:title]`", function() {
      expect(s._isValidHtmlAttribute('[xlink\\:title]')).toEqual(true);
    });
    
    it("Validates `[specularConstant]`", function() {
      expect(s._isValidHtmlAttribute('[specularConstant]')).toEqual(true);
    });
  });
  
  describe("Valid MathML attributes", function() {
    it("Validates `[accentunder]`", function() {
      expect(s._isValidHtmlAttribute('[accentunder]')).toEqual(true);
    });
    
    it("Validates `[xlink\\:href*=bar]`", function() {
      expect(s._isValidHtmlAttribute('[xlink\\:href*=bar]')).toEqual(true);
    });
    
    it("Validates `[SCRIPTMINSIZE]`", function() {
      expect(s._isValidHtmlAttribute('[SCRIPTMINSIZE]')).toEqual(true);
    });
  });
  
  describe("Invalid attributes", function() {
    it("Invalidates `[foo]`", function() {
      expect(s._isValidHtmlAttribute('[foo]')).toEqual(false);
    });
    
    it("Invalidates `[xlink:href]`", function() {
      expect(s._isValidHtmlAttribute('[xlink:href]')).toEqual(false);
    });
  });
});