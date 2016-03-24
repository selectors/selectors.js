describe("s.getSequences( selectorsGroup )", function() {
  describe("Valid patterns", function() {
    it("Returns `[ \".foo\" ]` from `.foo`", function() {
      var r = s.getSequences(".foo");
      expect(r[0]).toEqual('.foo');
      expect(r.length).toEqual(1);
    }); 
    
    it("Returns `[ \".foo\", \"#bar\" ]` from `.foo, #bar`", function() {
      var r = s.getSequences(".foo, #bar");
      expect(r[0]).toEqual('.foo');
      expect(r[1]).toEqual('#bar');
      expect(r.length).toEqual(2);
    });
    
    it("Returns `[ \".foo:nth-child(2n) > p\", \"#bar\" ]` from `.foo:nth-child(2n) > p, #bar`", function() {
      var r = s.getSequences(".foo:nth-child(2n) > p");
      expect(r[0]).toEqual('.foo:nth-child(2n) > p');
      expect(r.length).toEqual(1);
    });
  });
});