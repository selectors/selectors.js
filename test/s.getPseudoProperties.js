describe("s.getPseudoProperties( pseudoSelector )", function() {
  describe("Valid pseudo-class selectors", function() {
    it("Knows `:hover` has no vendor-prefix", function() {
      expect(s.getPseudoProperties(':hover').vendor).toEqual(null);
    });
    
    it("Knows `:hover` has a name of 'hover'", function() {
      expect(s.getPseudoProperties(':hover').name).toEqual("hover");
    });
    
    it("Knows `:hover` has no arguments", function() {
      expect(s.getPseudoProperties(':hover').args).toEqual(null);
    });
    
    it("Knows `:hover` has no colons attribute", function() {
      expect(s.getPseudoProperties(':hover').colons).toEqual(undefined);
    });
    
    it("Knows `:-custom-foo` has a vendor-prefix of '-custom-'", function() {
      expect(s.getPseudoProperties(':-custom-foo').vendor).toEqual("-custom-");
    });
    
    it("Knows `:_potato-bar-baz` has a vendor-prefix of '_potato-'", function() {
      expect(s.getPseudoProperties(':_potato-bar-baz').vendor).toEqual("_potato-");
    });
    
    it("Knows `:nth-of-type(even)` has a name of 'nth-of-type'", function() {
      expect(s.getPseudoProperties(':nth-of-type(even)').name).toEqual("nth-of-type");
    });
    
    it("Knows `:nth-child( 2n + 1 )` has the argument ' 2n + 1 '", function() {
      expect(s.getPseudoProperties(':nth-child( 2n + 1 )').args).toEqual(" 2n + 1 ");
    });
  });
  
  describe("Valid pseudo-element selectors", function() {
    it("Knows `::before` has a name of 'before'", function() {
      expect(s.getPseudoProperties('::before').name).toEqual("before");
    });
    
    it("Knows `::first-letter` has no vendor-prefix", function() {
      expect(s.getPseudoProperties('::first-letter').vendor).toEqual(null);
    });
    
    it("Knows `::-webkit-scrollbar` has the vendor-prefix '-webkit-'", function() {
      expect(s.getPseudoProperties('::-webkit-scrollbar').vendor).toEqual('-webkit-');
    });
    
    it("Knows `::_potato-foo` has the vendor-prefix '_potato-'", function() {
      expect(s.getPseudoProperties('::_potato-foo').vendor).toEqual('_potato-');
    });
    
    it("Knows `::first-line` has no args", function() {
      expect(s.getPseudoProperties('::first-line').args).toEqual(null);
    });
    
    it("Knows `::after` has 2 colons", function() {
      expect(s.getPseudoProperties('::after').colons).toEqual(2);
    });
    
    it("Knows `:after` has 1 colon", function() {
      expect(s.getPseudoProperties(':after').colons).toEqual(1);
    });
    
    it("Knows `::-custom-foo` has no colons attribute", function() {
      expect(s.getPseudoProperties('::-custom-foo').colons).toEqual(undefined);
    });
    
    it("Knows `::_potato-foo-bar` has no colons attribute", function() {
      expect(s.getPseudoProperties('::_potato-foo-bar').colons).toEqual(undefined);
    });
  });
  
  describe("Invalid pseudo-class and pseudo-element selectors", function() {
    it("Returns false on non-string input `1`", function() {
      expect(s.getPseudoProperties(1)).toEqual(false);
    });
    
    it("Errors on non-pseudo selector input `.foo`", function() {
      expect(function() { s.getPseudoProperties('.foo') }).toThrow();
    });
    
    it("Errors on mis-formed pseudo-class selector input `:nth-child(2n`", function() {
      expect(function() { s.getPseudoProperties(':nth-child(2n') }).toThrow();
    });
  });
});