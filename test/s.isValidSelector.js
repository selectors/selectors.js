describe("s.isValidSelector( selector )", function() {
  describe("Valid matches", function() {
    it("Validates `*`", function() {
      expect(s.isValidSelector('*')).toEqual(true);
    });
    
    it("Validates `foo`", function() {
      expect(s.isValidSelector('foo')).toEqual(true);
    });
    
    it("Validates `.bar`", function() {
      expect(s.isValidSelector('.bar')).toEqual(true);
    });
    
    it("Validates `.-bar`", function() {
      expect(s.isValidSelector('.bar')).toEqual(true);
    });
    
    it("Validates `.-b1ar`", function() {
      expect(s.isValidSelector('.bar')).toEqual(true);
    });
    
    it("Validates `._bar`", function() {
      expect(s.isValidSelector('.bar')).toEqual(true);
    });
    
    it("Validates `.-b-ar---`", function() {
      expect(s.isValidSelector('.bar')).toEqual(true);
    });
    
    it("Validates `#baz`", function() {
      expect(s.isValidSelector('#baz')).toEqual(true);
    });
    
    it("Validates `[att]`", function() {
      expect(s.isValidSelector('[att]')).toEqual(true);
    });
    
    it("Validates `[att=val]`", function() {
      expect(s.isValidSelector('[att=val]')).toEqual(true);
    });
    
    it("Validates `[att='val']`", function() {
      expect(s.isValidSelector('[att=\'val\']')).toEqual(true);
    });
    
    it("Validates `[att=\\\"val\"]`", function() {
      expect(s.isValidSelector('[att="val"]')).toEqual(true);
    });
    
    it("Validates `[att='v\\\'al']`", function() {
      expect(s.isValidSelector('[att=\'v\\\'al\']')).toEqual(true);
    });
    
    it("Validates `[att='v\\\"al']`", function() {
      expect(s.isValidSelector('[att=\'v\\\"al\']')).toEqual(true);
    });
    
    it("Validates `[att~=val]`", function() {
      expect(s.isValidSelector('[att~=val]')).toEqual(true);
    });
    
    it("Validates `[att|=val]`", function() {
      expect(s.isValidSelector('[att|=val]')).toEqual(true);
    });
    
    it("Validates `[att^=val]`", function() {
      expect(s.isValidSelector('[att^=val]')).toEqual(true);
    });
    
    it("Validates `[att$=val]`", function() {
      expect(s.isValidSelector('[att$=val]')).toEqual(true);
    });
    
    it("Validates `[att*=val]`", function() {
      expect(s.isValidSelector('[att*=val]')).toEqual(true);
    });
    
    it("Validates `[att=-val]`", function() {
      expect(s.isValidSelector('[att=-val]')).toEqual(true);
    });
    
    it("Validates `:foobar`", function() {
      expect(s.isValidSelector(':foobar')).toEqual(true);
    });
    
    it("Validates `::foobar`", function() {
      expect(s.isValidSelector('::foobar')).toEqual(true);
    });
  });
  
  describe("Invalid matches", function() {
    it("Errors on non-string input `1`", function() {
      expect(function() { s.isValidSelector(1) }).toThrow();
    })
    
    it("Invalidates ``", function() {
      expect(s.isValidSelector('')).toEqual(false);
    });
    
    it("Invalidates `foo*`", function() {
      expect(s.isValidSelector('foo*')).toEqual(false);
    });
    
    it("Invalidates `[att]*`", function() {
      expect(s.isValidSelector('[att]*')).toEqual(false);
    });
    
    it("Invalidates `.--`", function() {
      expect(s.isValidSelector('.--')).toEqual(false);
    });
    
    it("Invalidates `.-1`", function() {
      expect(s.isValidSelector('.-1')).toEqual(false);
    });
    
    it("Invalidates `.1`", function() {
      expect(s.isValidSelector('.1')).toEqual(false);
    });
  });
});