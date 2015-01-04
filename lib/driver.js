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
 * Retrieves a list of public devices
 *
 * @param {String} params list of params to filter the list of devices
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Array} devices an array of objects
 * @return {null}
 * @publish
 */
Driver.prototype.catalog = function(params, callback) {
  this.connection.catalog(params, callback);
};

/**
 * Retrieves a list of private devices
 *
 * @param {String} params list of params to filter the list of devices
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Array} devices an array of objects
 * @return {null}
 * @publish
 */
Driver.prototype.list = function(params, callback) {
  this.connection.list(params, callback);
};

/**
 * Retrieves an array of groups  to which the devices belong to
 *
 * @param {String} params list of params to filter for
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Array} groups an array of groups
 * @return {null}
 * @publish
 */
Driver.prototype.groups = function(params, callback) {
  this.connection.groups(params, callback);
};

/**
 * Creates a new Device
 *
 * @param {Object} params list of device attrs
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Object} response on creating the array
 * @return {null}
 * @publish
 */
Driver.prototype.create = function(params, callback) {
  this.connection.create(params, callback);
};

/**
 * Updates a Device
 *
 * @param {String} id of the device to update
 * @param {Object} params list of device attrs
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Object} response on updating the array
 * @return {null}
 * @publish
 */
Driver.prototype.update = function(id, params, callback) {
  this.connection.update(id, params, callback);
};

/**
 * Returns an object with device details for the specified id
 *
 * @param {String} id of the device
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Object} device details
 * @return {null}
 * @publish
 */
Driver.prototype.view = function(id, callback) {
  this.connection.view(id, callback);
};

/**
 * Returns the location of a device
 *
 * @param {String} id of the device
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Object} location details
 * @return {null}
 * @publish
 */
Driver.prototype.location = function(id, callback) {
  this.connection.location(id, callback);
};

/**
 * Updates the location of a device
 *
 * @param {String} id of the device
 * @param {Object} params to be updated
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Object} location details
 * @return {null}
 * @publish
 */
Driver.prototype.updateLocation = function(id, params, callback) {
  this.connection.updateLocation(id, params, callback);
};

/**
 * Retrieve a list of streams for the device
 *
 * @param {String} id of the device
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Array} streams array
 * @return {null}
 * @publish
 */
Driver.prototype.streams = function(id, callback) {
  this.connection.streams(id, callback);
};

/**
 * Updates attrs of a stream
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Object} params to be updated
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Object} response with the update operation details
 * @return {null}
 * @publish
 */
Driver.prototype.updateStream = function(id, name, params, callback) {
  this.connection.updateStream(id, name, params, callback);
};

/**
 * Creates a new stream value
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Object} params { value: myValue[, timestamp: ISOTimestamp ]}
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Object} response with the set value operation details
 * @return {null}
 * @publish
 */
Driver.prototype.setStreamValue = function(id, name, params, callback) {
  this.connection.setStreamValue(id, name, params, callback);
};

/**
 * Retrieve stream details
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Function} callback function to be triggered with new data on the topic
 *   @param {Error} err error if any exists
 *   @param {Object} stream details
 * @return {null}
 * @publish
 */
Driver.prototype.stream = function(id, name, callback) {
  this.connection.stream(id, name, callback);
};
