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
  this.m2xClient = {};
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = Commands;

Adaptor.prototype.connect = function(cb) {
  this.m2xClient =this._new_m2x();
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
    this.m2xClient.devices.list(params, this._defCb(cb));
  } else {
    this.m2xClient.devices.catalog(params, this._defCb(cb));
  }
};

Adaptor.prototype._defCb = function(cb) {
  var tmpcb = function(response) {
    if (response.isSuccess()) {
      cb(null, response.json);
    } else {
      cb(response.error(), null);
    }
  }.bind(this);

  return tmpcb;
};

Adaptor.prototype.groups = function(cb) {
  this.m2xClient.devices.groups(this._defCb(cb));
};

Adaptor.prototype.create = function(params, cb) {
  this.m2xClient.devices.create(params, this._defCb(cb));
};

Adaptor.prototype.update = function(id, params, cb) {
  this.m2xClient.devices.update(id, params, this._defCb(cb));
};

Adaptor.prototype.view = function(id, cb) {
  this.m2xClient.devices.view(id, this._defCb(cb));
};

Adaptor.prototype.location = function(id, cb) {
  this.m2xClient.devices.location(id, this._defCb(cb));
};

Adaptor.prototype.updateLocation = function(id, params, cb) {
  this.m2xClient.devices.updateLocation(id, params, this._defCb(cb));
};

Adaptor.prototype.streams = function(id, cb) {
  this.m2xClient.devices.streams(id, this._defCb(cb));
};

Adaptor.prototype.updateStream = function(id, name, params, cb) {
  this.m2xClient.devices.updateStream(id, name, params, this._defCb(cb));
};

Adaptor.prototype.setStreamValue = function(id, name, params, cb) {
  this.m2xClient.devices.setStreamValue(id, name, params, this._defCb(cb));
};

Adaptor.prototype.stream = function(id, name, cb) {
  this.m2xClient.devices.stream(id, name, this._defCb(cb));
};

Adaptor.prototype.streamValues = function(id, name, filters, cb) {
  this.m2xClient.devices.streamValues(id, name, filters, this._defCb(cb));
};

Adaptor.prototype.sampleStreamValues = function(id, name, filters, cb) {
  this.m2xClient.devices.sampleStreamValues(id, name, filters, this._defCb(cb));
};

Adaptor.prototype.streamStats = function(id, name, filters, cb) {
  this.m2xClient.devices.streamStats(id, name, filters, this._defCb(cb));
};

Adaptor.prototype.postValues = function(id, name, params, cb) {
  this.m2xClient.devices.postValues(id, name, params, this._defCb(cb));
};

Adaptor.prototype.deleteStreamValues = function(id, name, filters, cb) {
  this.m2xClient.devices.deleteStreamValues(id, name, filters, this._defCb(cb));
};

Adaptor.prototype.deleteStream = function(id, name, cb) {
  this.m2xClient.devices.deleteStream(id, name, this._defCb(cb));
};

Adaptor.prototype.postMultiple = function(id, params, cb) {
  this.m2xClient.devices.postMultiple(id, params, this._defCb(cb));
};

Adaptor.prototype.triggers = function(id, cb) {
  this.m2xClient.devices.triggers(id, this._defCb(cb));
};

Adaptor.prototype.createTrigger = function(id, params, cb) {
  this.m2xClient.devices.createTrigger(id, params, this._defCb(cb));
};

Adaptor.prototype.trigger = function(id, triggerId, cb) {
  this.m2xClient.devices.trigger(id, triggerId, this._defCb(cb));
};

Adaptor.prototype.updateTrigger = function(id, triggerId, params, cb) {
  this.m2xClient.devices.updateTrigger(id, triggerId, params, this._defCb(cb));
};

Adaptor.prototype.testTrigger = function(id, triggerId, cb) {
  this.m2xClient.devices.testTrigger(id, triggerId, this._defCb(cb));
};

Adaptor.prototype.deleteTrigger = function(id, triggerId, cb) {
  this.m2xClient.devices.deleteTrigger(id, triggerId, this._defCb(cb));
};

Adaptor.prototype.log = function(id, cb) {
  this.m2xClient.devices.log(id, this._defCb(cb));
};

Adaptor.prototype.deleteDevice = function(id, cb) {
  this.m2xClient.devices.deleteDevice(id, this._defCb(cb));
};

Adaptor.prototype.keys = function(id, cb) {
  this.m2xClient.devices.keys(id, this._defCb(cb));
};

Adaptor.prototype.createKey = function(id, params, cb) {
  this.m2xClient.devices.createKey(id, params, this._defCb(cb));
};

Adaptor.prototype.updateKey = function(id, key, params, cb) {
  this.m2xClient.devices.updateKey(id, key, params, this._defCb(cb));
};
