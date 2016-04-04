describe("s.getType( selector )", function() {
  describe("Valid patterns", function() {
    it("Returns `type` from `foo`", function() {
      expect(s.getType('foo').type).toEqual('type');
    });
    
    it("Returns namespace of `ns` from `ns|foo`", function() {
      expect(s.getType('ns|foo').namespace).toEqual('ns');
    });
    
    it("Returns namespace of `*` from `*|*`", function() {
      expect(s.getType('*|*').namespace).toEqual('*');
    });
    
    it("Returns namespace of `` from `|*`", function() {
      expect(s.getType('|*').namespace).toEqual('');
    });
    
    it("Returns `type` from `FOO`", function() {
      expect(s.getType('FOO').type).toEqual('type');
    });
    
    it("Returns `type` from `ns|foo`", function() {
      expect(s.getType('ns|foo').type).toEqual('type');
    });
    
    it("Returns `type` from `*|foo`", function() {
      expect(s.getType('*|foo').type).toEqual('type');
    });
    
    it("Returns `type` from `|foo`", function() {
      expect(s.getType('|foo').type).toEqual('type');
    });
    
    it("Returns `universal` from `*`", function() {
      expect(s.getType('*').type).toEqual('universal');
    });
    
    it("Returns `universal` from `ns|*`", function() {
      expect(s.getType('ns|*').type).toEqual('universal');
    });
    
    it("Returns `universal` from `*|*`", function() {
      expect(s.getType('*|*').type).toEqual('universal');
    });
    
    it("Returns `universal` from `|*`", function() {
      expect(s.getType('|*').type).toEqual('universal');
    });
    
    it("Returns `class` from `.bar`", function() {
      expect(s.getType('.bar').type).toEqual('class');
    });
    
    it("Returns `id` from `#baz`", function() {
      expect(s.getType('#baz').type).toEqual('id');
    });
    
    it("Returns `attribute` from `[att]`", function() {
      expect(s.getType('[att]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att\\:foo]`", function() {
      expect(s.getType('[att\\:foo]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att=val]`", function() {
      expect(s.getType('[att=val]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att='val']`", function() {
      expect(s.getType('[att=\'val\']').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att=\\\"val\"]`", function() {
      expect(s.getType('[att="val"]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att='v\\\'al']`", function() {
      expect(s.getType('[att=\'v\\\'al\']').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att='v\\\"al']`", function() {
      expect(s.getType('[att=\'v\\\"al\']').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att~=val]`", function() {
      expect(s.getType('[att~=val]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att|=val]`", function() {
      expect(s.getType('[att|=val]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att^=val]`", function() {
      expect(s.getType('[att^=val]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att$=val]`", function() {
      expect(s.getType('[att$=val]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att*=val]`", function() {
      expect(s.getType('[att*=val]').type).toEqual('attribute');
    });
    
    it("Returns `attribute` from `[att=-val]`", function() {
      expect(s.getType('[att=-val]').type).toEqual('attribute');
    });
    
    it("Returns `pseudo-class` from `:foobar`", function() {
      expect(s.getType(':foobar').type).toEqual('pseudo-class');
    });
    
    it("Returns `pseudo-class` from `:foobar(odd)`", function() {
      expect(s.getType(':foobar(odd)').type).toEqual('pseudo-class');
    });
    
    it("Returns `pseudo-element` from `::foobar`", function() {
      expect(s.getType('::foobar').type).toEqual('pseudo-element');
    });
    
    it("Returns `negation` from `:not(.bar)`", function() {
      expect(s.getType(':not(.bar)').type).toEqual('negation');
    });
    
    it("Returns `attribute` from `:not([att='v\\\"al'])`", function() {
      expect(s.getType(':not([att=\'v\\\"al\'])').type).toEqual('negation');
    });
    
    it("Returns `combinator` from `>`", function() {
      expect(s.getType('>').type).toEqual('combinator');
    });
    
    it("Returns `combinator` from ` `", function() {
      expect(s.getType(' ').type).toEqual('combinator');
    });
    
    it("Returns `combinator` from `+`", function() {
      expect(s.getType('+').type).toEqual('combinator');
    });
  });
});