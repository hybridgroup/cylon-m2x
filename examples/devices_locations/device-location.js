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
    my.m2x.list(function(err, data) {
      console.log("Err: ", err);
      console.log("Private devices: ", data.devices);
      data.devices.forEach(function(device) {
        my.m2x.location(device.id, function(error, locations) {
          console.log("Err: ", error);
          console.log("locations: ", locations);
        });
      });
    });
  }
}).start();
