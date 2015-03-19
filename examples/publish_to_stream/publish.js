/*jslint node: true */
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
    var dev = "d9c3b48d3be2e...",
        temp = 20;
    setInterval(function() {
      my.m2x.publish(dev, "temp", temp, function(err, data) {
        console.log("Err: ", err);
        console.log("Values: ", data);
      });
      temp++;
    }, 2000);
  }
}).start();
