/*
 * cylon-m2x adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

"use strict";

var Cylon = require("cylon"),
    M2X = require("m2x");

var Commands = require("./commands");

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.masterKey = opts.masterKey || opts.apiKey;
  this.interval = opts.interval || 1000;
  this.m2xClient = null;
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = Commands;

Adaptor.prototype.connect = function(callback) {
  this.m2xClient = new M2X(this.masterKey);
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};

Adaptor.prototype.catalog = function(params, callback) {
  this._list("public", params, callback);
};

Adaptor.prototype.list = function(params, callback) {
  this._list("private", params, callback);
};

Adaptor.prototype._list = function(type, params, callback) {
  if (typeof params === "function") {
    callback = params;
    params = {};
  }

  if (type === "private") {
    this.m2xClient.devices.list(params, this._defCallback(callback));
  } else {
    this.m2xClient.devices.catalog(params, this._defCallback(callback));
  }
};

Adaptor.prototype._defCallback = function(callback) {
  var tmpCallback = function(response) {
    if (response.isSuccess()) {
      callback(null, response.json);
    } else {
      callback(response.error(), null);
    }
  }.bind(this);

  return tmpCallback;
};

Adaptor.prototype.groups = function(callback) {
  this.m2xClient.devices.groups(this._defCallback(callback));
};

Adaptor.prototype.create = function(params, callback) {
  this.m2xClient.devices.create(params, this._defCallback(callback));
};

Adaptor.prototype.update = function(id, params, callback) {
  this.m2xClient.devices.update(id, params, this._defCallback(callback));
};

Adaptor.prototype.view = function(id, callback) {
  this.m2xClient.devices.view(id, this._defCallback(callback));
};

Adaptor.prototype.location = function(id, callback) {
  this.m2xClient.devices.location(id, this._defCallback(callback));
};

Adaptor.prototype.updateLocation = function(id, params, callback) {
  this.m2xClient.devices.updateLocation(id, this._defCallback(callback));
};

Adaptor.prototype.streams = function(id, callback) {
  this.m2xClient.devices.streams(id, this._defCallback(callback));
};

Adaptor.prototype.updateStream = function(id, name, params, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.updateStream(id, name, params, tmpCb);
};

Adaptor.prototype.setStreamValue = function(id, name, params, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.setStreamValue(id, name, params, tmpCb);
};

Adaptor.prototype.stream = function(id, name, callback) {
  this.m2xClient.devices.stream(id, name, this._defCallback(callback));
};

Adaptor.prototype.streamValues = function(id, name, filters, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.streamValues(id, name, filters, tmpCb);
};

Adaptor.prototype.sampleStreamValues = function(id, name, filters, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.sampleStreamValues(id, name, filters, tmpCb);
};

Adaptor.prototype.streamStats = function(id, name, filters, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.streamStats(id, name, filters, tmpCb);
};

Adaptor.prototype.postValues = function(id, name, params, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.postValues(id, name, params, tmpCb);
};

Adaptor.prototype.deleteStreamValues = function(id, name, filters, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.deleteStreamValues(id, name, filters, tmpCb);
};

Adaptor.prototype.deleteStream = function(id, name, callback) {
  this.m2xClient.devices.deleteStream(id, name, this._defCallback(callback));
};

Adaptor.prototype.postMultiple = function(id, params, callback) {
  this.m2xClient.devices.postMultiple(id, params, this._defCallback(callback));
};

Adaptor.prototype.triggers = function(id, callback) {
  this.m2xClient.devices.triggers(id, this._defCallback(callback));
};

Adaptor.prototype.createTrigger = function(id, params, callback) {
  this.m2xClient.devices.createTrigger(id, params, this._defCallback(callback));
};

Adaptor.prototype.trigger = function(id, triggerName, callback) {
  this.m2xClient.devices.trigger(id, triggerName, this._defCallback(callback));
};

Adaptor.prototype.updateTrigger = function(id, triggerName, params, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.updateTrigger(id, triggerName, params, tmpCb);
};

Adaptor.prototype.testTrigger = function(id, triggerName, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.testTrigger(id, triggerName, tmpCb);
};

Adaptor.prototype.deleteTrigger = function(id, triggerName, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.deleteTrigger(id, triggerName, tmpCb);
};

Adaptor.prototype.log = function(id, callback) {
  this.m2xClient.devices.log(id, this._defCallback(callback));
};

Adaptor.prototype.deleteDevice = function(id, callback) {
  this.m2xClient.devices.deleteDevice(id, this._defCallback(callback));
};

Adaptor.prototype.keys = function(id, callback) {
  this.m2xClient.devices.keys(id, this._defCallback(callback));
};

Adaptor.prototype.createKey = function(id, params, callback) {
  this.m2xClient.devices.createKey(id, params, this._defCallback(callback));
};

Adaptor.prototype.updateKey = function(id, key, params, callback) {
  var tmpCb =  this._defCallback(callback);

  this.m2xClient.devices.updateKey(id, key, params,tmpCb);
};
