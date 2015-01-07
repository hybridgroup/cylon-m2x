"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    m2x: { adaptor: "m2x", masterKey: "<masterKey>" }
  },

  devices: {
    m2x: { driver: "m2x" }
  },

  work: function(my) {
    my.m2x.streamValues("<deviceId>", "temp", {}, function(err, data) {
      console.log("Err: ", err);
      console.log("Values: ", data);
    });
  }
}).start();
