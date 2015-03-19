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

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);
  this.setupCommands(Commands);
  this.deviceId = opts.id || null;
};

Driver.prototype.commands = Commands;

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  this.defineDriverEvent("error");
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};


/**
 * Retrieves a list of public devices
 *
 * @param {String} params list of params to filter the list of devices
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
 * @return {null}
 * @publish
 */
Driver.prototype.sampleStreamValues = function(id, name, filters, callback) {
  this.connection.sampleStreamValues(id, name, filters, callback);
};

/**
 * Retrieve stream stats
 *
 * @param {String} id of the device
 * @param {String} name of the stream to be updated
 * @param {Object} filters for the values
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
 * @return {null}
 * @publish
 */
Driver.prototype.postMultiple = function(id, values, callback) {
  this.connection.postMultiple(id, values, callback);
};

/**
 * returns a list of triggers for the device
 *
 * @param {String} id of the device
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
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
 * @param {standardCallback} callback - Triggers with (err, data)
 * @return {null}
 * @publish
 */
Driver.prototype.updateKey = function(id, key, params, callback) {
  this.connection.updateKey(id, key, params, callback);
};

/**
 * Subscribe to stream updates
 *
 * @param {String} stream - Name of the stream
 * @param {Object} options - {
 *                   interval: integer, // milliseconds
 *                   deviceId: string,
 *                   min: integer, // Greater or equal to
 *                   max: integer, // Lower or equal to
 *                   limit: integer, // Max values to return
 *                 }
 * @param {standardCallback} cb - The callback that handles the response
 *
 **/
Driver.prototype.subscribe = function(stream, options, callback) {
  if (typeof(options) === "function") {
    callback = options;
    options = {};
  }

  this.defineDriverEvent(stream);

  var deviceId = options.deviceId || this.deviceId;
  this.connection.subscribe(deviceId, stream, options, callback);
};

/**
 * Publishes stream value (sets new stream value)
 *
 * @param {String} stream - Name of the stream
 * @param {Object} value
 * @param {Object} options - {
 *                   deviceId: string
 *                 }
 * @param {standardCallback} cb - The callback that handles the response
 *
 **/
Driver.prototype.publish = function(stream, value, options, callback) {
  if (typeof(options) === "function") {
    callback = options;
    options = {};
  }

  var unique = stream + ":publish";
  if (this.connection.listeners(unique).length === 0) {
    this.defineDriverEvent(unique);
  }

  var deviceId = options.deviceId || this.deviceId;
  this.connection.publish(deviceId, stream, value, callback);
};

// JSDoc helpers and definitions

/**
 * Standard callback for driver methods.
 *
 * @callback standardCallback
 * @param {Error} err
 * @param {Object} data - Object with response data
 *
 **/
