/*jslint node: true */
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
    var baseTemp = 20, temp = 0;

    every(2000, function() {
      temp = Math.floor(Math.random() * 6) + 1 + baseTemp;
      my.m2xDevice.publish("temp", temp, function(err, data) {
        console.log("Err: ", err);
        console.log("Values: ", data);
      });
    });
  }
}).start();
