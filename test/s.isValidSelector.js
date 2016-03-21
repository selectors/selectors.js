describe("s.isValidSelector( selector )", function() {
  describe("Valid matches", function() {
    it("Validates `foo`", function() {
      expect(s.isValidSelector('foo')).toEqual(true);
    });
  });
});