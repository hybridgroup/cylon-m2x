/*
 * cylon-m2x driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Commands = require('./commands');

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);
  this.setupCommands(Commands);
};

Driver.prototype.commands = Commands;

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

// Public: Subscribes the driver.
//
// topic - params
// callback - params
//
// Returns null.
Driver.prototype.subscribe = function(topic, callback) {
  return this.connection.subscribe(topic, callback);
};

// Public: Pushes a message into the message queue.
//
// id - params
// data - params
//
// Returns null.
Driver.prototype.push = function(id, data) {
  return this.connection.push(id, data);
};
