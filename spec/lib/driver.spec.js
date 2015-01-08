"use strict";

var M2X = source("driver");

describe("Cylon.Drivers.M2X", function() {
  var driver = new M2X({
    connection: {}
  });

  it("needs tests", function() {
    expect(driver).to.be.an.instanceOf(M2X);
  });
});
