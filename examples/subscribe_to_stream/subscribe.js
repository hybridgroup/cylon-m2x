"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    m2x: { adaptor: "m2x", masterKey: "masterKey" }
  },

  devices: {
    m2x: { driver: "m2x" }
  },

  work: function(my) {
    var device = "d9c3b48d3be2e...";

    my.m2x.on("error", function(err) {
      console.log("error: ", err);
    });

    my.m2x.on("temp", function(data) {
      console.log("data: ", data);
    });

    my.m2x.subscribe(device, "temp", { interval: 5000 });
  }
}).start();
