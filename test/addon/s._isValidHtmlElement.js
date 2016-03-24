describe("s._isValidHtmlElement( selector )", function() {
  describe("Valid HTML elements", function() {
    it("Validates `div`", function() {
      expect(s._isValidHtmlElement('div')).toEqual(true);
    });
    
    it("Validates `BLOCKQUOTE`", function() {
      expect(s._isValidHtmlElement('BLOCKQUOTE')).toEqual(true);
    });
    
    it("Validates `ColGroup`", function() {
      expect(s._isValidHtmlElement('ColGroup')).toEqual(true);
    });
  });
  
  describe("Valid SVG elements", function() {
    it("Validates `rect`", function() {
      expect(s._isValidHtmlElement('rect')).toEqual(true);
    });
    
    it("Validates `TSPAN`", function() {
      expect(s._isValidHtmlElement('TSPAN')).toEqual(true);
    });
    
    it("Validates `feSpecularLighting`", function() {
      expect(s._isValidHtmlElement('feSpecularLighting')).toEqual(true);
    });
  });
  
  describe("Valid MathML elements", function() {
    it("Validates `annotation-xml`", function() {
      expect(s._isValidHtmlElement('rect')).toEqual(true);
    });
    
    it("Validates `MROOT`", function() {
      expect(s._isValidHtmlElement('MROOT')).toEqual(true);
    });
    
    it("Validates `mRow`", function() {
      expect(s._isValidHtmlElement('mRow')).toEqual(true);
    });
  });
  
  describe("Valid Custom elements", function() {
    it("Validates `foo-bar`", function() {
      expect(s._isValidHtmlElement('foo-bar')).toEqual(true);
    });
    
    it("Validates `foo-bar-baz`", function() {
      expect(s._isValidHtmlElement('foo-bar-baz')).toEqual(true);
    });
  });
  
  describe("Invalid elements", function() {
    it("Invalidates `foo`", function() {
      expect(s._isValidHtmlElement('foo')).toEqual(false);
    });
    
    it("Invalidates `.p`", function() {
      expect(s._isValidHtmlElement('.p')).toEqual(false);
    });
    
    it("Invalidates `marquee`", function() {
      expect(s._isValidHtmlElement('marquee')).toEqual(false);
    });
    
    it("Invalidates `foo-bar-`", function() {
      expect(s._isValidHtmlElement('foo-bar-')).toEqual(false);
    });
    
    it("Invalidates `FOO-BAR`", function() {
      expect(s._isValidHtmlElement('FOO-BAR')).toEqual(false);
    });
    
    it("Invalidates `foo-Bar-baz`", function() {
      expect(s._isValidHtmlElement('foo-Bar-baz')).toEqual(false);
    });
  });
});