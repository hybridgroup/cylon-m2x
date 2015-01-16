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
  this.devices = {};
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
  }.bind(this);

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
  args[3] = this._defCb(args[3]);
  this.devices[name].apply(null, args);
};

Adaptor.prototype.updateStream = function() {
  //this.devices.updateStream(id, name, params, this._defCb(cb));
  this._callFunction("updateStream", arguments);
};

Adaptor.prototype.setStreamValue = function() {
  //this.devices.setStreamValue(id, name, params, this._defCb(cb));
  this._callFunction("setStreamValue", arguments);
};

Adaptor.prototype.streamValues = function() {
  //this.devices.streamValues(id, name, params, this._defCb(cb));
  this._callFunction("streamValues", arguments);
};

Adaptor.prototype.sampleStreamValues = function() {
  //this.devices.sampleStreamValues(id, name, params, this._defCb(cb));
  this._callFunction("sampleStreamValues", arguments);
};

Adaptor.prototype.streamStats = function() {
  //this.devices.streamStats(id, name, params, this._defCb(cb));
  this._callFunction("streamStats", arguments);
};

Adaptor.prototype.postValues = function() {
  //this.devices.postValues(id, name, params, this._defCb(cb));
  this._callFunction("postValues", arguments);
};

Adaptor.prototype.deleteStreamValues = function() {
  //this.devices.deleteStreamValues(id, name, params, this._defCb(cb));
  this._callFunction("deleteStreamValues", arguments);
};

Adaptor.prototype.updateTrigger = function() {
  //this.devices.updateTrigger(id, triggerId, params, this._defCb(cb));
  this._callFunction("updateTrigger", arguments);
};

Adaptor.prototype.updateKey = function() {
  //this.devices.updateKey(id, key, params, this._defCb(cb));
  this._callFunction("updateKey", arguments);
};
