describe("Combinators", function() {
  it("Detects ` ` as valid", function() {
    expect(s.combinator.test(" ")).toEqual(true);
  });
  
  it("Detects `+` as valid", function() {
    expect(s.combinator.test("+")).toEqual(true);
  });
  
  it("Detects `>` as valid", function() {
    expect(s.combinator.test(">")).toEqual(true);
  });
  
  it("Detects `~` as valid", function() {
    expect(s.combinator.test("~")).toEqual(true);
  });
  
  it("Detects `  ` as valid", function() {
    expect(s.combinator.test("  ")).toEqual(true);
  });
  
  it("Detects `> ` as valid", function() {
    expect(s.combinator.test("> ")).toEqual(true);
  });
  
  it("Detects ` +` as valid", function() {
    expect(s.combinator.test(" +")).toEqual(true);
  });
  
  it("Detects `  ~  ` as valid", function() {
    expect(s.combinator.test("  ~  ")).toEqual(true);
  });
  
  it("Detects `~+` as invalid", function() {
    expect(s.combinator.test("+~")).toEqual(false);
  });
})