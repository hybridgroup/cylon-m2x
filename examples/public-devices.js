/*jslint node: true */
"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    m2x: { adaptor: "m2x", masterKey: "8cb18e481b4f4a9c728cc724fdb01919" }
  },

  devices: {
    m2x: { driver: "m2x" }
  },

  work: function(my) {
    my.m2x.catalog(function(err, data) {
      console.log("Err: ", err);
      console.log("Private devices: ", data.devices);
    });
  }
}).start();
