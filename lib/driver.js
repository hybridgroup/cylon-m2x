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

/**
 * Subscribes to messages on a topic through M2X
 *
 * @param {String} topic topic name to subscribe to
 * @param {Function} callback function to be triggered with new data on the topic
 * @return {null}
 * @publish
 */
Driver.prototype.subscribe = function(topic, callback) {
  this.connection.subscribe(topic, callback);
};

/**
 * Publishes a new message to a topic through M2X
 *
 * @param {String} id topic name to publish to
 * @param {Object} data
 * @return {null}
 * @publish
 */
Driver.prototype.push = function(id, data) {
  this.connection.push(id, data);
};
