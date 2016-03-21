describe("s._isValidCssPseudoClass( pseudoClass )", function() {
  describe("Valid pseudo-classes", function() {
    it("Validates `:hover`", function() {
      expect(s._isValidCssPseudoClass(':hover')).toEqual(true);
    });
    
    it("Validates `:nth-child(+2n)`", function() {
      expect(s._isValidCssPseudoClass(':nth-child(+2n)')).toEqual(true);
    });
    
    it("Validates `:nth-of-type(odd)`", function() {
      expect(s._isValidCssPseudoClass(':nth-of-type(odd)')).toEqual(true);
    });
    
    it("Validates `:nth-last-child( even )`", function() {
      expect(s._isValidCssPseudoClass(':nth-last-child(even)')).toEqual(true);
    });
    
    it("Validates `:lang(en)`", function() {
      expect(s._isValidCssPseudoClass(':lang(en)')).toEqual(true);
    });
    
    it("Validates `:-webkit-foo`", function() {
      expect(s._isValidCssPseudoClass(':-webkit-foo')).toEqual(true);
    });
    
    it("Validates `:-moz-bar-baz`", function() {
      expect(s._isValidCssPseudoClass(':-moz-bar-baz')).toEqual(true);
    });
    
    it("Validates `:_custom-foo`", function() {
      expect(s._isValidCssPseudoClass(':_custom-foo')).toEqual(true);
    });
  });
  
  describe("Invalid pseudo-classes", function() {
    it("Invalidates `:--foo-bar`", function() {
      expect(s._isValidCssPseudoClass(':--foo-bar')).toEqual(false);
    });
    
    it("Invalidates `:-1foo-bar`", function() {
      expect(s._isValidCssPseudoClass(':-1foo-bar')).toEqual(false);
    });
    
    it("Invalidates `:_custom_foo`", function() {
      expect(s._isValidCssPseudoClass(':_custom_foo')).toEqual(false);
    });
    
    it("Invalidates `::hover`", function() {
      expect(s._isValidCssPseudoClass('::hover')).toEqual(false);
    });
    
    it("Invalidates `:nth-child`", function() {
      expect(s._isValidCssPseudoClass(':nth-child')).toEqual(false);
    });
    
    it("Invalidates `:hover(odd)`", function() {
      expect(s._isValidCssPseudoClass(':hover(odd)')).toEqual(false);
    });
    
    it("Invalidates `:nth-child(+ 2n)`", function() {
      expect(s._isValidCssPseudoClass(':nth-child(+ 2n)')).toEqual(false);
    });
    
    it("Invalidates `:first-line`", function() {
      expect(s._isValidCssPseudoClass(':first-line')).toEqual(false);
    });
    
    it("Invalidates `::after`", function() {
      expect(s._isValidCssPseudoClass('::after')).toEqual(false);
    });
    
    it("Invalidates `:lang()`", function() {
      expect(s._isValidCssPseudoClass(':lang()')).toEqual(false);
    });
  });
});