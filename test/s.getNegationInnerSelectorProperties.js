describe("s.getNegationInnerSelectorProperties( negationSelector )", function() {
  describe("Valid negation selectors", function() {
    it("Knows `:not(foo)` has an inner selector of `foo`", function() {
      expect(s.getNegationInnerSelectorProperties(':not(foo)').selector).toEqual('foo');
    });
    
    it("Knows `:not([bar=baz])` has an inner selector of `[bar=baz]`", function() {
      expect(s.getNegationInnerSelectorProperties(':not([bar=baz])').selector).toEqual('[bar=baz]');
    });
    
    it("Knows `:not([bar=baz])` has an inner selector type of `attribute`", function() {
      expect(s.getNegationInnerSelectorProperties(':not([bar=baz])').type).toEqual('attribute');
    });
  });
  
  describe("Invalid negation selectors", function() {
    it("Returns false on non-string input `1`", function() {
      expect(s.getNegationInnerSelectorProperties(1)).toEqual(false);
    });
    
    it("Errors on non-negation selector input `.foo`", function() {
      expect(function() { s.getNegationInnerSelectorProperties('.foo') }).toThrow();
    });
    
    it("Errors on mis-formed negation selector input `:not(foo`", function() {
      expect(function() { s.getNegationInnerSelectorProperties(':not(foo') }).toThrow();
    });
    
    it("Errors on invalid negation selector input `:not(:not(foo))`", function() {
      expect(function() { s.getNegationInnerSelectorProperties(':not(:not(foo))') }).toThrow();
    });
    
    it("Errors on invalid negation selector input `:not(::before)`", function() {
      expect(function() { s.getNegationInnerSelectorProperties(':not(::before)') }).toThrow();
    });
  });
});