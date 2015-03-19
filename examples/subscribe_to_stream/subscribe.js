"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    m2x: { adaptor: "m2x", masterKey: "masterKey" }
  },

  devices: {
    m2xDevice: { driver: "m2x", id: "d9c3b48d3be2e..." }
  },

  work: function(my) {
    my.m2xDevice.on("error", function(err) {
      console.log("error: ", err);
    });

    my.m2xDevice.on("temp", function(data) {
      console.log("data: ", data);
    });

    my.m2xDevice.subscribe("temp", { interval: 5000 });
  }
}).start();
