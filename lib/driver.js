/*
 * cylon-m2x driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var Commands = require("./commands");

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
 * @param {Function} callback function to be triggered
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
 * @param {Function} callback function to be triggered with (err, devices)
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
 * @param {Function} callback function to be triggered with (err, groups)
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
 * @param {Function} callback function to be triggered with (err, res)
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
 * @param {Function} callback function to be triggered with (err, res)
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
 * @param {Function} callback function to be triggered with (err, device)
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
 * @param {Function} callback function to be triggered with (err, location)
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
 * @param {Function} callback function to be triggered with (err, location)
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
 * @param {Function} callback function to be triggered with new (err, streams)
 *   @param {Error} err error if any exists
 *   @param {Array} streams array
 * @return {null}
 * @publish
 */
Driver.prototype.streams = function(id, callback) {
  this.connection.streams(id, callback);
};

/**
 * Updates(or creates) stream with the params passed
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Object} params to be updated
 * @param {Function} callback function to be triggered with (err, res)
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
 * @param {Function} callback function to be triggered with (err, res)
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
 * @param {Function} callback function to be triggered with (err, stream)
 *   @param {Error} err error if any exists
 *   @param {Object} stream details
 * @return {null}
 * @publish
 */
Driver.prototype.stream = function(id, name, callback) {
  this.connection.stream(id, name, callback);
};

/**
 * Retrieve stream values
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Object} filters for the values
 * @param {Function} callback function to be triggered with (err, stream)
 *   @param {Error} err error if any exists
 *   @param {Object} stream details
 * @return {null}
 * @publish
 */
Driver.prototype.streamValues = function(id, name, filters, callback) {
  this.connection.streamValues(id, name, filters, callback);
};

/**
 * Retrieve a sample of stream values
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Object} filters for the values
 * @param {Function} callback function to be triggered with (err, stream)
 *   @param {Error} err error if any exists
 *   @param {Object} stream details
 * @return {null}
 * @publish
 */
Driver.prototype.sampleStreamValues = function(id, name, filters, callback) {
  this.connection.streamValues(id, name, filters, callback);
};

/**
 * Retrieve stream stats
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Object} filters for the values
 * @param {Function} callback function to be triggered with (err, stream)
 *   @param {Error} err error if any exists
 *   @param {Object} stream details
 * @return {null}
 * @publish
 */
Driver.prototype.streamStats = function(id, name, filters, callback) {
  this.connection.streamStats(id, name, filters, callback);
};

/**
 * Add multiple values to a stream
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {array} values array of { value: val, timestamp: ISODateString }
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.postValues = function(id, name, values, callback) {
  this.connection.postValues(id, name, values, callback);
};

/**
 * Deletes stream values
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Object} filters to delete values
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.deleteStreamValues = function(id, name, filters, callback) {
  this.connection.deleteStreamValues(id, name, filters, callback);
};

/**
 * Deletes a stream
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.deleteStream = function(id, name, filters, callback) {
  this.connection.deleteStream(id, name, filters, callback);
};

/**
 * Post to multiple streams
 *
 * @param {String} id of the device
 * @param {Array} values array of { name: n, value: v, timestamp: t }
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.postMultiple = function(id, filters, callback) {
  this.connection.postMultiple(id, filters, callback);
};

/**
 * returns a list of triggers for the device
 *
 * @param {String} id of the device
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.triggers = function(id, callback) {
  this.connection.triggers(id, callback);
};

/**
 * creates a new trigger
 *
 * @param {String} id of the device
 * @param {Object} params for the trigger
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.createTrigger = function(id, params, callback) {
  this.connection.createTrigger(id, params, callback);
};

/**
 * creates a new trigger
 *
 * @param {String} id of the device
 * @param {String} name of the trigger
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.trigger = function(id, triggerId, callback) {
  this.connection.trigger(id, triggerId, callback);
};

/**
 * updates a trigger
 *
 * @param {String} id of the device
 * @param {String} name of the trigger
 * @param {Object} params to be updated
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.updateTrigger = function(id, name, params, callback) {
  this.connection.updateTrigger(id, name, params, callback);
};

/**
 * tests a trigger
 *
 * @param {String} id of the device
 * @param {String} name of the trigger
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.testTrigger = function(id, name, callback) {
  this.connection.testTrigger(id, name, callback);
};

/**
 * deletes a trigger
 *
 * @param {String} id of the device
 * @param {String} name of the trigger
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.deleteTrigger = function(id, name, callback) {
  this.connection.deleteTrigger(id, name, callback);
};

/**
 * Returns a log of access to the supplied device
 *
 * @param {String} id of the device
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} log details
 * @return {null}
 * @publish
 */
Driver.prototype.log = function(id, callback) {
  this.connection.log(id, callback);
};

/**
 * deletes a device
 *
 * @param {String} id of the device
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.deleteDevice = function(id, callback) {
  this.connection.deleteDevice(id, callback);
};

/**
 * returns a list of keys associated to a device
 *
 * @param {String} id of the device
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} keys detail
 * @return {null}
 * @publish
 */
Driver.prototype.keys = function(id, callback) {
  this.connection.keys(id, callback);
};

/**
 * creates a new key
 *
 * @param {String} id of the device
 * @param {obejct} params to create the new key
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.createKey = function(id, params, callback) {
  this.connection.createKey(id, params, callback);
};

/**
 * updates a key
 *
 * @param {String} id of the device
 * @param {obejct} params to update the key
 * @param {Function} callback function to be triggered with (err, res)
 *   @param {Error} err error if any exists
 *   @param {Object} response details
 * @return {null}
 * @publish
 */
Driver.prototype.updateKey = function(id, key, params, callback) {
  this.connection.createKey(id, key, params, callback);
};
