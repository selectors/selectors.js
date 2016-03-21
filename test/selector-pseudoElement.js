describe("The Pseudo-Element Selector", function() {
  it("Detects `:` as invalid", function() {
    expect(s.pseudoElement.test(":")).toEqual(false);
  });
  
  it("Detects `::` as invalid", function() {
    expect(s.pseudoElement.test("::")).toEqual(false);
  });
  
  it("Detects `:foo` as invalid", function() {
    expect(s.pseudoElement.test(":foo")).toEqual(false);
  });
  
  it("Detects `::foo` as invalid", function() {
    expect(s.pseudoElement.test("::foo")).toEqual(false);
  });
  
  it("Detects `::before` as valid", function() {
    expect(s.pseudoElement.test("::before")).toEqual(true);
  });
  
  it("Detects `:before` as valid", function() {
    expect(s.pseudoElement.test(":before")).toEqual(true);
  });
  
  it("Detects `::first-letter` as valid", function() {
    expect(s.pseudoElement.test("::first-letter")).toEqual(true);
  });
});