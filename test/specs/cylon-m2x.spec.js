"use strict";

var module = source("cylon-m2x");

var Adaptor = source('adaptor'),
    Driver = source('driver');

describe("Cylon.M2x", function() {
  describe("#register", function() {
    it("should be a function", function() {
      expect(module.register).to.be.a('function');
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { device: { connection: {} } };
      expect(module.driver(args)).to.be.instanceOf(Driver);
    });
  });

  describe("#adaptor", function() {
    it("returns an instance of the Adaptor", function() {
      expect(module.adaptor()).to.be.instanceOf(Adaptor);
    });
  });
});
