"use strict";

var m2x = lib("cylon-m2x");

var Adaptor = lib("adaptor"),
    Driver = lib("driver");

describe("Cylon.M2x", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(m2x.adaptors).to.be.eql(["m2x"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      expect(m2x.drivers).to.be.eql(["m2x"]);
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      expect(m2x.driver({})).to.be.instanceOf(Driver);
    });
  });

  describe("#adaptor", function() {
    it("returns an instance of the Adaptor", function() {
      expect(m2x.adaptor()).to.be.instanceOf(Adaptor);
    });
  });
});
