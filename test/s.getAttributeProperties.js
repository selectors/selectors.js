describe("s.getAttributeProperties( attributeSelector )", function() {
  describe("Valid attribute selectors", function() {
    it("Knows `[att=val]` has no namespace'", function() {
      expect(s.getAttributeProperties('[att=val]').namespace).toEqual(null);
    });
    
    it("Knows `[att=val]` has name 'att'", function() {
      expect(s.getAttributeProperties('[att=val]').name).toEqual('att');
    });
    
    it("Knows `[att=val]` has symbol '='", function() {
      expect(s.getAttributeProperties('[att=val]').symbol).toEqual('=');
    });
    
    it("Knows `[att|=val]` has symbol '|='", function() {
      expect(s.getAttributeProperties('[att|=val]').symbol).toEqual('|=');
    });
    
    it("Knows `[att~=val]` has symbol '~='", function() {
      expect(s.getAttributeProperties('[att~=val]').symbol).toEqual('~=');
    });
    
    it("Knows `[att^=val]` has symbol '^='", function() {
      expect(s.getAttributeProperties('[att^=val]').symbol).toEqual('^=');
    });
    
    it("Knows `[att$=val]` has symbol '$='", function() {
      expect(s.getAttributeProperties('[att$=val]').symbol).toEqual('$=');
    });
    
    it("Knows `[att*=val]` has symbol '*='", function() {
      expect(s.getAttributeProperties('[att*=val]').symbol).toEqual('*=');
    });
    
    it("Knows `[att=val]` has value 'val'", function() {
      expect(s.getAttributeProperties('[att=val]').value).toEqual('val');
    });
    
    it("Knows `[ns|foo*=\"bar\"]` has namespace 'ns'", function() {
      expect(s.getAttributeProperties('[ns|foo*="bar"]').namespace).toEqual('ns');
    });
    
    it("Knows `[ns|foo*=\"bar\"]` has value 'bar'", function() {
      expect(s.getAttributeProperties('[ns|foo*="bar"]').value).toEqual('bar');
    });
    
    it("Knows `[ns|foo*='bar']` has value 'bar'", function() {
      expect(s.getAttributeProperties('[ns|foo*=\'bar\']').value).toEqual('bar');
    });
    
    it("Knows `[ns\\|foo|att=val]` has namespace 'ns\\|foo'", function() {
      expect(s.getAttributeProperties('[ns\\|foo|att=val]').namespace).toEqual('ns\\|foo');
    });
    
    it("Knows `[ns\\|foo|att=val]` has name 'att'", function() {
      expect(s.getAttributeProperties('[ns\\|foo|att=val]').name).toEqual('att');
    });
    
    it("Knows `[ns|att\\|bar=val]` has namespace 'ns'", function() {
      expect(s.getAttributeProperties('[ns|att\\|bar=val]').namespace).toEqual('ns');
    });
    
    it("Knows `[ns|att\\|bar=val]` has name 'att\\|bar'", function() {
      expect(s.getAttributeProperties('[ns|att\\|bar=val]').name).toEqual('att\\|bar');
    });
    
    it("Knows `[ns\\|foo|att\\|bar|=\"|\"]` has name 'ns\\|foo'", function() {
      expect(s.getAttributeProperties('[ns\\|foo|att\\|bar|="|"]').namespace).toEqual('ns\\|foo');
    });
    
    it("Knows `[ns\\|foo|att\\|bar|=\"|\"]` has symbol '|='", function() {
      expect(s.getAttributeProperties('[ns\\|foo|att\\|bar|="|"]').symbol).toEqual('|=');
    });
  });
  
  describe("Invalid attribute selectors", function() {
    it("Returns false on non-string input `1`", function() {
      expect(s.getAttributeProperties(1)).toEqual(false);
    });
    
    it("Errors on non-attribute selector input `.foo`", function() {
      expect(function() { s.getAttributeProperties('.foo') }).toThrow();
    });
    
    it("Errors on mis-formed attribute selector input `[att=]`", function() {
      expect(function() { s.getAttributeProperties('[att=]') }).toThrow();
    });
  });
});