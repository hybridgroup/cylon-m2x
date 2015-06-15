/*
 * cylon-m2x adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014-2015 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

/* eslint camelcase: 0 */

"use strict";

var Cylon = require("cylon"),
    M2X = require("m2x");

var Commands = require("./commands");

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.masterKey = opts.masterKey || opts.apiKey;
  this.interval = opts.interval || 2000;
  this.m2xClient = {};
  this.devices = {};
  this.intervalTS = {};
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = Commands;

Adaptor.prototype.connect = function(cb) {
  this.m2xClient = this._new_m2x();
  this.devices = this.m2xClient.devices;
  cb();
};

Adaptor.prototype._new_m2x = function() {
  return new M2X(this.masterKey);
};

Adaptor.prototype.disconnect = function(cb) {
  cb();
};

Adaptor.prototype.catalog = function(params, cb) {
  this._list("public", params, cb);
};

Adaptor.prototype.list = function(params, cb) {
  this._list("private", params, cb);
};

Adaptor.prototype._list = function(type, params, cb) {
  if (typeof params === "function") {
    cb = params;
    params = {};
  }

  if (type === "private") {
    this.devices.list(params, this._defCb(cb));
  } else {
    this.devices.catalog(params, this._defCb(cb));
  }
};

Adaptor.prototype._defCb = function(cb) {
  var tmpcb = function(response) {
    if (response.isSuccess()) {
      cb(null, response.json);
    } else {
      cb(response.error(), null);
    }
  };

  return tmpcb;
};

Adaptor.prototype.groups = function(cb) {
  this.devices.groups(this._defCb(cb));
};

Adaptor.prototype.create = function(params, cb) {
  this.devices.create(params, this._defCb(cb));
};

Adaptor.prototype.update = function(id, params, cb) {
  this.devices.update(id, params, this._defCb(cb));
};

Adaptor.prototype.view = function(id, cb) {
  this.devices.view(id, this._defCb(cb));
};

Adaptor.prototype.location = function(id, cb) {
  this.devices.location(id, this._defCb(cb));
};

Adaptor.prototype.updateLocation = function(id, params, cb) {
  this.devices.updateLocation(id, params, this._defCb(cb));
};

Adaptor.prototype.streams = function(id, cb) {
  this.devices.streams(id, this._defCb(cb));
};

Adaptor.prototype.stream = function(id, name, cb) {
  this.devices.stream(id, name, this._defCb(cb));
};

Adaptor.prototype.deleteStream = function(id, name, cb) {
  this.devices.deleteStream(id, name, this._defCb(cb));
};

Adaptor.prototype.postMultiple = function(id, params, cb) {
  this.devices.postMultiple(id, params, this._defCb(cb));
};

Adaptor.prototype.triggers = function(id, cb) {
  this.devices.triggers(id, this._defCb(cb));
};

Adaptor.prototype.createTrigger = function(id, params, cb) {
  this.devices.createTrigger(id, params, this._defCb(cb));
};

Adaptor.prototype.trigger = function(id, triggerId, cb) {
  this.devices.trigger(id, triggerId, this._defCb(cb));
};

Adaptor.prototype.testTrigger = function(id, triggerId, cb) {
  this.devices.testTrigger(id, triggerId, this._defCb(cb));
};

Adaptor.prototype.deleteTrigger = function(id, triggerId, cb) {
  this.devices.deleteTrigger(id, triggerId, this._defCb(cb));
};

Adaptor.prototype.log = function(id, cb) {
  this.devices.log(id, this._defCb(cb));
};

Adaptor.prototype.deleteDevice = function(id, cb) {
  this.devices.deleteDevice(id, this._defCb(cb));
};

Adaptor.prototype.keys = function(id, cb) {
  this.devices.keys(id, this._defCb(cb));
};

Adaptor.prototype.createKey = function(id, params, cb) {
  this.devices.createKey(id, params, this._defCb(cb));
};

Adaptor.prototype._callFunction = function(name, args) {
  var device = this.devices[name];
  args[3] = this._defCb(args[3]);
  device.apply(this.devices, args);
};

Adaptor.prototype.updateStream = function() {
  this._callFunction("updateStream", arguments);
};

Adaptor.prototype.setStreamValue = function() {
  this._callFunction("setStreamValue", arguments);
};

/**
 * Stream values from m2x
 *
 * @param {String} deviceId ID of device to stream data for
 * @param {String} stream - Name of the stream
 * @param {Object} options - {
 *                   min: integer, // Greater or equal to
 *                   max: integer, // Lower or equal to
 *                   start: Date().toISOString(),
 *                   end: Date().toISOString(),
 *                   limit: integer, // Max values to return
 *                 }
 * @param {standardCallback} cb - The callback that handles the response
 * @return {void}
 *
 **/
Adaptor.prototype.streamValues = function() {
  this._callFunction("streamValues", arguments);
};

Adaptor.prototype.sampleStreamValues = function() {
  this._callFunction("sampleStreamValues", arguments);
};

Adaptor.prototype.streamStats = function() {
  this._callFunction("streamStats", arguments);
};

Adaptor.prototype.postValues = function() {
  this._callFunction("postValues", arguments);
};

Adaptor.prototype.deleteStreamValues = function() {
  this._callFunction("deleteStreamValues", arguments);
};

Adaptor.prototype.updateTrigger = function() {
  this._callFunction("updateTrigger", arguments);
};

Adaptor.prototype.updateKey = function() {
  this._callFunction("updateKey", arguments);
};

/**
 * Subscribe to stream updates.
 *
 * @param {String} deviceId device to stream updates for
 * @param {String} stream - Name of the stream
 * @param {Object} options - {
 *                   interval: integer, // milliseconds
 *                   min: integer, // Greater or equal to
 *                   max: integer, // Lower or equal to
 *                   limit: integer, // Max values to return
 *                 }
 * @param {standardCallback} callback - The callback that handles the response
 * @return {void}
 *
 **/
Adaptor.prototype.subscribe = function(deviceId, stream, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }

  var unique = deviceId + ":" + stream,
      start = new Date();


  this.interval = options.interval || this.interval;
  this.intervalTS[unique] = start;

  options.start = start.toISOString();

  setInterval(function() {
    var intCallback = function(err, data) {
      if (typeof callback === "function") {
        callback(err, data);
      }

      if (err) {
        this.emit("error", err);
      } else {
        this.emit(stream, data);
        this.emit(unique, data);
      }
    }.bind(this);

    this.streamValues(deviceId, stream, options, intCallback);
    options.start = new Date().toISOString();
  }.bind(this), this.interval);
};

/**
 * Publish new stream values
 *
 * @param {String} deviceId device to publish to
 * @param {String} stream - Name of the stream
 * @param {Value} value - Stream value to be added
 * @param {standardCallback} callback - The callback that handles the response
 * @return {void}
 */
Adaptor.prototype.publish = function(deviceId, stream, value, callback) {
  var unique = deviceId + ":" + stream + ":publish";

  var intCallback = function(err, response) {
    if (typeof callback === "function") {
      callback(err, response);
    }

    if (err) {
      this.emit("error", response);
    } else {
      this.emit(stream + ":publish", response);
      this.emit(unique, response);
    }
  }.bind(this);

  this.setStreamValue(deviceId, stream, { value: value }, intCallback);
};

// JSDoc helpers and definitions

/**
 *
 * Standard callback for driver methods.
 *
 * @callback standardCallback
 * @param {Error} err
 * @param {Object} data - Object with response data
 *
 **/
