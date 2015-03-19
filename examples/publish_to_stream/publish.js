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
    var temp = 20;

    Cylon.Utils.every(2000, function() {
      my.m2xDevice.publish("temp", temp, function(err, data) {
        console.log("Err: ", err);
        console.log("Values: ", data);
      });
      temp++;
    });
  }
}).start();
