describe("The ID Selector", function() {
  it("Detects `#foo` as valid", function() {
    expect(cssrx.id.test("#foo")).toEqual(true);
  });
  
  describe("Hyphens", function() {
    it("Detects `#-foo` as valid", function() {
      expect(cssrx.id.test("#-foo")).toEqual(true);
    });
    
    it("Detects `#-foo-bar-baz` as valid", function() {
      expect(cssrx.id.test("#-foo-bar-baz")).toEqual(true);
    });
    
    it("Detects `#-foo--` as valid", function() {
      expect(cssrx.id.test("#-foo--")).toEqual(true);
    });
  
    it("Detects `#--foo` as invalid", function() {
      expect(cssrx.id.test("#--foo")).toEqual(false);
    });
  });
  
  describe("Numbers", function() {
    it("Detects `#-foo1` as valid", function() {
      expect(cssrx.id.test("#-foo1")).toEqual(true);
    });
    
    it("Detects `#-1foo` as invalid", function() {
      expect(cssrx.id.test("#-1foo")).toEqual(false);
    });
  });
  
  it("Detects `bar` as invalid", function() {
    expect(cssrx.id.test("bar")).toEqual(false);
  });
  
  it("Detects `.bar` as invalid", function() {
    expect(cssrx.id.test(".bar")).toEqual(false);
  });
});