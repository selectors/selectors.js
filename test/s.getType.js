describe("s.getType( selector )", function() {
  describe("Valid patterns", function() {
    it("Returns `type` from `foo`", function() {
      expect(s.getType('foo')).toEqual('type');
    });
    
    it("Returns `type` from `FOO`", function() {
      expect(s.getType('FOO')).toEqual('type');
    });
    
    it("Returns `type` from `ns|foo`", function() {
      expect(s.getType('ns|foo')).toEqual('type');
    });
    
    it("Returns `type` from `*|foo`", function() {
      expect(s.getType('*|foo')).toEqual('type');
    });
    
    it("Returns `type` from `|foo`", function() {
      expect(s.getType('|foo')).toEqual('type');
    });
    
    it("Returns `universal` from `*`", function() {
      expect(s.getType('*')).toEqual('universal');
    });
    
    it("Returns `universal` from `ns|*`", function() {
      expect(s.getType('ns|*')).toEqual('universal');
    });
    
    it("Returns `universal` from `*|*`", function() {
      expect(s.getType('*|*')).toEqual('universal');
    });
    
    it("Returns `universal` from `|*`", function() {
      expect(s.getType('|*')).toEqual('universal');
    });
    
    it("Returns `class` from `.bar`", function() {
      expect(s.getType('.bar')).toEqual('class');
    });
    
    it("Returns `id` from `#baz`", function() {
      expect(s.getType('#baz')).toEqual('id');
    });
    
    it("Returns `attribute` from `[att]`", function() {
      expect(s.getType('[att]')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att=val]`", function() {
      expect(s.getType('[att=val]')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att='val']`", function() {
      expect(s.getType('[att=\'val\']')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att=\\\"val\"]`", function() {
      expect(s.getType('[att="val"]')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att='v\\\'al']`", function() {
      expect(s.getType('[att=\'v\\\'al\']')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att='v\\\"al']`", function() {
      expect(s.getType('[att=\'v\\\"al\']')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att~=val]`", function() {
      expect(s.getType('[att~=val]')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att|=val]`", function() {
      expect(s.getType('[att|=val]')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att^=val]`", function() {
      expect(s.getType('[att^=val]')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att$=val]`", function() {
      expect(s.getType('[att$=val]')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att*=val]`", function() {
      expect(s.getType('[att*=val]')).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att=-val]`", function() {
      expect(s.getType('[att=-val]')).toEqual('attribute');
    });
    
    it("Returns `pseudo-class` from `:foobar`", function() {
      expect(s.getType(':foobar')).toEqual('pseudo-class');
    });
    
    it("Returns `pseudo-class` from `:foobar(odd)`", function() {
      expect(s.getType(':foobar(odd)')).toEqual('pseudo-class');
    });
    
    it("Returns `pseudo-element` from `::foobar`", function() {
      expect(s.getType('::foobar')).toEqual('pseudo-element');
    });
    
    it("Returns `negation` from `:not(.bar)`", function() {
      expect(s.getType(':not(.bar)')).toEqual('negation');
    });
    
    it("Returns `attribute` from `:not([att='v\\\"al'])`", function() {
      expect(s.getType(':not([att=\'v\\\"al\'])')).toEqual('negation');
    });
  });
});