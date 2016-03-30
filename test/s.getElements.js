describe("s.getSelectors( selectorSequence )", function() {
  describe("Valid patterns", function() {
    it("Returns `[ \".foo\" ]` from `.foo`", function() {
      var r = s.getElements(".foo");
      expect(r[0][0]).toEqual('.foo');
      expect(r.length).toEqual(1);
      expect(r[0].length).toEqual(1);
    }); 
    
    it("Returns `[ [ \".foo\" ], [ \" \", \"#bar\" ] ]` from `.foo #bar`", function() {
      var r = s.getElements(".foo #bar");
      expect(r[0][0]).toEqual('.foo');
      expect(r[1][0]).toEqual(' ');
      expect(r[1][1]).toEqual('#bar');
      expect(r.length).toEqual(2);
      expect(r[0].length).toEqual(1);
      expect(r[1].length).toEqual(2);
    });
  });
});