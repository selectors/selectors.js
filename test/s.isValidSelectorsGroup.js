describe("s.isValidSelectorsGroup( selector )", function() {
  describe("Valid matches", function() {
    it("Validates `*`", function() {
      expect(s.isValidSelectorsGroup('*')).toEqual(true);
    });
    
    it("Validates `foo`", function() {
      expect(s.isValidSelectorsGroup('foo')).toEqual(true);
    });
    
    it("Validates `FOO`", function() {
      expect(s.isValidSelectorsGroup('FOO')).toEqual(true);
    });
    
    it("Validates `.bar`", function() {
      expect(s.isValidSelectorsGroup('.bar')).toEqual(true);
    });
    
    it("Validates `.BAR`", function() {
      expect(s.isValidSelectorsGroup('.BAR')).toEqual(true);
    });
    
    it("Validates `.-bar`", function() {
      expect(s.isValidSelectorsGroup('.bar')).toEqual(true);
    });
    
    it("Validates `.-b1ar`", function() {
      expect(s.isValidSelectorsGroup('.bar')).toEqual(true);
    });
    
    it("Validates `._bar`", function() {
      expect(s.isValidSelectorsGroup('.bar')).toEqual(true);
    });
    
    it("Validates `.-b-ar---`", function() {
      expect(s.isValidSelectorsGroup('.bar')).toEqual(true);
    });
    
    it("Validates `#baz`", function() {
      expect(s.isValidSelectorsGroup('#baz')).toEqual(true);
    });
    
    it("Validates `[att]`", function() {
      expect(s.isValidSelectorsGroup('[att]')).toEqual(true);
    });
    
    it("Validates `[att=val]`", function() {
      expect(s.isValidSelectorsGroup('[att=val]')).toEqual(true);
    });
    
    it("Validates `[ATT=VAL]`", function() {
      expect(s.isValidSelectorsGroup('[ATT=VAL]')).toEqual(true);
    });
    
    it("Validates `[att='val']`", function() {
      expect(s.isValidSelectorsGroup('[att=\'val\']')).toEqual(true);
    });
    
    it("Validates `[att=\\\"val\"]`", function() {
      expect(s.isValidSelectorsGroup('[att="val"]')).toEqual(true);
    });
    
    it("Validates `[att='v\\\'al']`", function() {
      expect(s.isValidSelectorsGroup('[att=\'v\\\'al\']')).toEqual(true);
    });
    
    it("Validates `[att='v\\\"al']`", function() {
      expect(s.isValidSelectorsGroup('[att=\'v\\\"al\']')).toEqual(true);
    });
    
    it("Validates `[att~=val]`", function() {
      expect(s.isValidSelectorsGroup('[att~=val]')).toEqual(true);
    });
    
    it("Validates `[att|=val]`", function() {
      expect(s.isValidSelectorsGroup('[att|=val]')).toEqual(true);
    });
    
    it("Validates `[att^=val]`", function() {
      expect(s.isValidSelectorsGroup('[att^=val]')).toEqual(true);
    });
    
    it("Validates `[att$=val]`", function() {
      expect(s.isValidSelectorsGroup('[att$=val]')).toEqual(true);
    });
    
    it("Validates `[att*=val]`", function() {
      expect(s.isValidSelectorsGroup('[att*=val]')).toEqual(true);
    });
    
    it("Validates `[att=-val]`", function() {
      expect(s.isValidSelectorsGroup('[att=-val]')).toEqual(true);
    });
    
    it("Validates `:foobar`", function() {
      expect(s.isValidSelectorsGroup(':foobar')).toEqual(true);
    });
    
    it("Validates `:foobar(odd)`", function() {
      expect(s.isValidSelectorsGroup(':foobar(odd)')).toEqual(true);
    });
    
    it("Validates `:FOOBAR(ODD)`", function() {
      expect(s.isValidSelectorsGroup(':FOOBAR(ODD)')).toEqual(true);
    });
    
    it("Validates `::foobar`", function() {
      expect(s.isValidSelectorsGroup('::foobar')).toEqual(true);
    });
    
    it("Validates `::FOOBAR`", function() {
      expect(s.isValidSelectorsGroup('::FOOBAR')).toEqual(true);
    });
  });
  
  describe("Invalid matches", function() {
    it("Errors on non-string input `1`", function() {
      expect(function() { s.isValidSelectorsGroup(1) }).toThrow();
    })
    
    it("Invalidates ``", function() {
      expect(s.isValidSelectorsGroup('')).toEqual(false);
    });
    
    it("Invalidates `foo*`", function() {
      expect(s.isValidSelectorsGroup('foo*')).toEqual(false);
    });
    
    it("Invalidates `[att]*`", function() {
      expect(s.isValidSelectorsGroup('[att]*')).toEqual(false);
    });
    
    it("Invalidates `.--`", function() {
      expect(s.isValidSelectorsGroup('.--')).toEqual(false);
    });
    
    it("Invalidates `.-1`", function() {
      expect(s.isValidSelectorsGroup('.-1')).toEqual(false);
    });
    
    it("Invalidates `.1`", function() {
      expect(s.isValidSelectorsGroup('.1')).toEqual(false);
    });
  });
});