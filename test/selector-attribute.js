describe("Attribute Selectors", function() {
  describe("Non-string input", function() {
    it("Detects `1` as invalid", function() {
      expect(cssrx.attribute.test(1)).toEqual(false);
    });
    it("Returns false when trying to read the attributes of `1`", function() {
      expect(cssrx.getAttributeProperties(1)).toEqual(false);
    });
  });
  describe("Non-attribute input", function() {
    it("Detects `wildebeest` as invalid", function() {
      expect(cssrx.attribute.test("wildebeest")).toEqual(false);
    });
    it("Returns false when trying to read the attributes of `wildebeest`", function() {
      expect(cssrx.getAttributeProperties("wildebeest")).toEqual(false);
    });
  });
  describe("Nameless-attribute input", function() {
    it("Detects `[=var]` as invalid", function() {
      expect(cssrx.attribute.test("[=var]")).toEqual(false);
    });
    it("Returns false when trying to read the attributes of `wildebeest`", function() {
      expect(cssrx.getAttributeProperties("[=var]")).toEqual(false);
    });
  });
  describe("[att]", function() {
    it("Detects `[att]` as valid", function() {
      expect(cssrx.attribute.test("[att]")).toEqual(true);
    });
    it("Knows `[att]` has no namespace, a name of 'att', no symbol and no value", function() {
      var o = cssrx.getAttributeProperties("[att]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBeFalsy();
      expect(o.value).toBeFalsy();
    });
  });
  describe("[ns|att]", function() {
    it("Detects `[ns|att]` as valid", function() {
      expect(cssrx.attribute.test("[ns|att]")).toEqual(true);
    });
    it("Knows `[ns|att]` has a namespace of 'ns', a name of 'att', no symbol and no value", function() {
      var o = cssrx.getAttributeProperties("[ns|att]");
      expect(o.namespace).toBe('ns');
      expect(o.name).toBe("att");
      expect(o.symbol).toBeFalsy();
      expect(o.value).toBeFalsy();
    });
  });
  describe("[*|att]", function() {
    it("Detects `[*|att]` as valid", function() {
      expect(cssrx.attribute.test("[*|att]")).toEqual(true);
    });
    it("Knows `[*|att]` has a namespace of '*', a name of 'att', no symbol and no value", function() {
      var o = cssrx.getAttributeProperties("[*|att]");
      expect(o.namespace).toBe('*');
      expect(o.name).toBe("att");
      expect(o.symbol).toBeFalsy();
      expect(o.value).toBeFalsy();
    });
  });
  describe("[|att]", function() {
    it("Detects `[|att]` as valid", function() {
      expect(cssrx.attribute.test("[|att]")).toEqual(true);
    });
    it("Knows `[|att]` has a no namespace, a name of 'att', no symbol and no value", function() {
      var o = cssrx.getAttributeProperties("[|att]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBeFalsy();
      expect(o.value).toBeFalsy();
    });
  });
  describe("[att=val]", function() {
    it("Detects `[att=val]` as valid", function() {
      expect(cssrx.attribute.test("[att=val]")).toEqual(true);
    });
    it("Knows `[att=val]` has no namespace, a name of 'att', a symbol of '=' and a value of 'val'", function() {
      var o = cssrx.getAttributeProperties("[att=val]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBe("=");
      expect(o.value).toBe("val");
    });
  });
  describe("[att~=val]", function() {
    it("Detects `[att~=val]` as valid", function() {
      expect(cssrx.attribute.test("[att~=val]")).toEqual(true);
    });
    it("Knows `[att~=val]` has no namespace, a name of 'att', a symbol of '~=' and a value of 'val'", function() {
      var o = cssrx.getAttributeProperties("[att~=val]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBe("~=");
      expect(o.value).toBe("val");
    });
  });
  describe("[att|=val]", function() {
    it("Detects `[att|=val]` as valid", function() {
      expect(cssrx.attribute.test("[att|=val]")).toEqual(true);
    });
    it("Knows `[att|=val]` has no namespace, a name of 'att', a symbol of '|=' and a value of 'val'", function() {
      var o = cssrx.getAttributeProperties("[att|=val]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBe("|=");
      expect(o.value).toBe("val");
    });
  });
  describe("[att^=val]", function() {
    it("Detects `[att^=val]` as valid", function() {
      expect(cssrx.attribute.test("[att^=val]")).toEqual(true);
    });
    it("Knows `[att^=val]` has no namespace, a name of 'att', a symbol of '^=' and a value of 'val'", function() {
      var o = cssrx.getAttributeProperties("[att^=val]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBe("^=");
      expect(o.value).toBe("val");
    });
  });
  describe("[att$=val]", function() {
    it("Detects `[att$=val]` as valid", function() {
      expect(cssrx.attribute.test("[att$=val]")).toEqual(true);
    });
    it("Knows `[att$=val]` has no namespace, a name of 'att', a symbol of '$=' and a value of 'val'", function() {
      var o = cssrx.getAttributeProperties("[att$=val]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBe("$=");
      expect(o.value).toBe("val");
    });
  });
  describe("[att*=val]", function() {
    it("Detects `[att*=val]` as valid", function() {
      expect(cssrx.attribute.test("[att*=val]")).toEqual(true);
    });
    it("Knows `[att*=val]` has no namespace, a name of 'att', a symbol of '*=' and a value of 'val'", function() {
      var o = cssrx.getAttributeProperties("[att*=val]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBe("*=");
      expect(o.value).toBe("val");
    });
  });
  describe("[att=\"\"val\"]", function() {
    it("Detects `[att=\"\"val\"]` as valid", function() {
      expect(cssrx.attribute.test("[att=\"\\\"val\"]")).toEqual(true);
    });
    it("Knows `[att=\"\\\"val\"]` has no namespace, a name of 'att', a symbol of '=' and a value of '\\\"val'", function() {
      var o = cssrx.getAttributeProperties("[att=\"\\\"val\"]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBe("=");
      expect(o.value).toBe("\\\"val");
    });
  });
  describe("[att=\"'val'\"]", function() {
    it("Detects `[att=\"'val'\"]` as valid", function() {
      expect(cssrx.attribute.test("[att=\"'val'\"]")).toEqual(true);
    });
    it("Knows `[att=\"'val'\"]` has no namespace, a name of 'att', a symbol of '=' and a value of ''val''", function() {
      var o = cssrx.getAttributeProperties("[att=\"'val'\"]");
      expect(o.namespace).toBeFalsy();
      expect(o.name).toBe("att");
      expect(o.symbol).toBe("=");
      expect(o.value).toBe("'val'");
    });
  });
});