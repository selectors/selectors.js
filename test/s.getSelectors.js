describe("s.getSelectors( selectorSequence )", function() {
  describe("Valid patterns", function() {
    it("Returns `[ \".foo\" ]` from `.foo`", function() {
      var r = s.getSelectors(".foo");
      expect(r[0]).toEqual('.foo');
      expect(r.length).toEqual(1);
    }); 
    
    it("Returns `[ \".foo\", \"#bar\" ]` from `.foo#bar`", function() {
      var r = s.getSelectors(".foo#bar");
      expect(r[0]).toEqual('.foo');
      expect(r[1]).toEqual('#bar');
      expect(r.length).toEqual(2);
    });
    
    it("Returns `[ \".foo\", \":nth-child(2n)\", \">\", \"p\", \"#bar\" ]` from `.foo:nth-child(2n) > p#bar`", function() {
      var r = s.getSelectors(".foo:nth-child(2n) > p#bar");
      expect(r[0]).toEqual('.foo');
      expect(r[1]).toEqual(':nth-child(2n)');
      expect(r[2]).toEqual('>');
      expect(r[3]).toEqual('p');
      expect(r[4]).toEqual('#bar');
      expect(r.length).toEqual(5);
    });
  });
});