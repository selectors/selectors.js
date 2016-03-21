describe("The Pseudo-Class Selector", function() {
  it("Detects `:` as invalid", function() {
    expect(s.pseudoClass.test(":")).toEqual(false);
  });
  
  it("Detects `:foo` as invalid", function() {
    expect(s.pseudoClass.test(":foo")).toEqual(false);
  });
  
  it("Detects `:-foo` as invalid", function() {
    expect(s.pseudoClass.test(":-foo")).toEqual(false);
  });
  
  describe("Non-functional", function() {
    it("Detects `:hover` as valid", function() {
      expect(s.pseudoClass.test(":hover")).toEqual(true);
    });
    
    it("Detects `:last-of-type` as valid", function() {
      expect(s.pseudoClass.test(":last-of-type")).toEqual(true);
    });
    
    it("Detects `::hover` as invalid", function() {
      expect(s.pseudoClass.test("::hover")).toEqual(false);
    });
  });
  
  describe("Functional `nth-*`", function() {
    it("Detects `:nth-child` as invalid", function() {
      expect(s.pseudoClass.test(":nth-child")).toEqual(false);
    });
    
    it("Detects `:nth-child(odd)` as valid", function() {
      expect(s.pseudoClass.test(":nth-child(odd)")).toEqual(true);
    });
    
    it("Detects `:nth-of-type(even)` as valid", function() {
      expect(s.pseudoClass.test(":nth-child(even)")).toEqual(true);
    });
    
    it("Detects `:nth-last-child(1n+0)` as valid", function() {
      expect(s.pseudoClass.test(":nth-child(1n+0)")).toEqual(true);
    });
    
    it("Detects `:nth-last-of-type(n+0)` as valid", function() {
      expect(s.pseudoClass.test(":nth-child(n+0)")).toEqual(true);
    });
    
    it("Detects `:nth-child(n)` as valid", function() {
      expect(s.pseudoClass.test(":nth-child(n)")).toEqual(true);
    });
    
    it("Detects `:nth-child( 3n + 1 )` as valid", function() {
      expect(s.pseudoClass.test(":nth-child( 3n + 1 )")).toEqual(true);
    });
    
    it("Detects `:nth-child( +3n - 2 )` as valid", function() {
      expect(s.pseudoClass.test(":nth-child( +3n - 2 )")).toEqual(true);
    });
    
    it("Detects `:nth-child( -n+ 6)` as valid", function() {
      expect(s.pseudoClass.test(":nth-child( -n+ 6)")).toEqual(true);
    });
    
    it("Detects `:nth-child( +6 )` as valid", function() {
      expect(s.pseudoClass.test(":nth-child( +6 )")).toEqual(true);
    });
    
    it("Detects `:nth-child(10n+-1)` as invalid", function() {
      expect(s.pseudoClass.test(":nth-child(10n+-1)")).toEqual(false);
    });
    
    it("Detects `:nth-child(3 n)` as invalid", function() {
      expect(s.pseudoClass.test(":nth-child(3 n)")).toEqual(false);
    });
    
    it("Detects `:nth-child(+ 2n)` as invalid", function() {
      expect(s.pseudoClass.test(":nth-child(+ 2n)")).toEqual(false);
    });
    
    it("Detects `:nth-child(+ 2)` as invalid", function() {
      expect(s.pseudoClass.test(":nth-child(+ 2)")).toEqual(false);
    });
  });
  
  describe(":lang(*)", function() {
    it("Detects `:lang(en)` as valid", function() {
      expect(s.pseudoClass.test(":lang(en)")).toEqual(true);
    });
    
    it("Detects `:lang()` as invalid", function() {
      expect(s.pseudoClass.test(":lang()")).toEqual(false);
    });
  });
  
  describe("Known vendor prefixes", function() {
    it("Detects `:-moz-foo` as valid", function() {
      expect(s.pseudoClass.test(":-moz-foo")).toEqual(true);
    });
    
    it("Detects `:-webkit-bar` as valid", function() {
      expect(s.pseudoClass.test(":-webkit-bar")).toEqual(true);
    });
    
    it("Detects `:-o-` as invalid", function() {
      expect(s.pseudoClass.test(":-o-")).toEqual(false);
    });
    
    it("Detects `:ms-baz` as invalid", function() {
      expect(s.pseudoClass.test(":ms-baz")).toEqual(false);
    });
  });
  
  describe("Unknown vendor prefixes", function() {
    it("Detects `:-kung-foo` as valid", function() {
      expect(s.pseudoClass.test(":-kung-foo")).toEqual(true);
    });
    
    it("Detects `:_snack-bar` as valid", function() {
      expect(s.pseudoClass.test(":_snack-bar")).toEqual(true);
    });
    
    it("Detects `:--baz` as invalid", function() {
      expect(s.pseudoClass.test(":--baz")).toEqual(false);
    });
    
    it("Detects `:_-baz` as invalid", function() {
      expect(s.pseudoClass.test(":_-baz")).toEqual(false);
    });
  });
});