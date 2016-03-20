describe("Combinators", function() {
  it("Detects ` ` as valid", function() {
    expect(cssrx.combinator.test(" ")).toEqual(true);
  });
  
  it("Detects `+` as valid", function() {
    expect(cssrx.combinator.test("+")).toEqual(true);
  });
  
  it("Detects `>` as valid", function() {
    expect(cssrx.combinator.test(">")).toEqual(true);
  });
  
  it("Detects `~` as valid", function() {
    expect(cssrx.combinator.test("~")).toEqual(true);
  });
  
  it("Detects `  ` as valid", function() {
    expect(cssrx.combinator.test("  ")).toEqual(true);
  });
  
  it("Detects `> ` as valid", function() {
    expect(cssrx.combinator.test("> ")).toEqual(true);
  });
  
  it("Detects ` +` as valid", function() {
    expect(cssrx.combinator.test(" +")).toEqual(true);
  });
  
  it("Detects `  ~  ` as valid", function() {
    expect(cssrx.combinator.test("  ~  ")).toEqual(true);
  });
  
  it("Detects `~+` as invalid", function() {
    expect(cssrx.combinator.test("+~")).toEqual(false);
  });
})