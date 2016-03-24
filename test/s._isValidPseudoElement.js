describe("s._isValidCssPseudoElement( pseudoClass )", function() {
  describe("Valid pseudo-elements", function() {
    it("Validates `::before`", function() {
      expect(s._isValidCssPseudoElement('::before')).toEqual(true);
    });
    
    it("Validates `:after`", function() {
      expect(s._isValidCssPseudoElement(':after')).toEqual(true);
    });
    
    it("Validates `::FIRST-LETTER`", function() {
      expect(s._isValidCssPseudoElement('::FIRST-LETTER')).toEqual(true);
    });
    
    it("Validates `:L-o-foo`", function() {
      expect(s._isValidCssPseudoElement(':-o-foo')).toEqual(true);
    });
    
    it("Validates `::_custom-foo`", function() {
      expect(s._isValidCssPseudoElement(':-o-foo')).toEqual(true);
    });
  });
  
  describe("Invalid pseudo-elements", function() {
    it("Invalidates `:hover`", function() {
      expect(s._isValidCssPseudoElement(':hover')).toEqual(false);
    });
    
    it("Invalidates `:::before`", function() {
      expect(s._isValidCssPseudoElement(':::before')).toEqual(false);
    });
  });
});