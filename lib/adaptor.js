/*
 * cylon-m2x adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

'use strict';

var Cylon = require('cylon'),
    M2X = require("m2x");

var Commands = require('./commands');

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.masterKey = opts.masterKey || opts.apiKey;
  this.devices = [];
  this.distributions = [];
  this.keys = [];
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
  this._list('public', params, callback);
};

Adaptor.prototype.list = function(params, callback) {
  this._list('private', params, callback);
};

Adaptor.prototype._list = function(type, params, callback) {
  if (typeof params === "function") {
    callback = params;
    params = {};
  }

  var localCb = function(response) {
    if (response.isSuccess()) {
      this.devices = response.json.devices;
      callback(null, this.devices);
    } else {
      callback(response.error(), null);
    }
  }.bind(this);

  if (type === 'private') {
    this.m2xClient.devices.list(params, localCb);
  } else {
    this.m2xClient.devices.catalog(params, localCb);
  }
};

Adaptor.prototype.groups = function(callback) {
  var localCb = function(response) {
    if (response.isSuccess()) {
      console.log('groups -->', response.json.groups);
      callback(null, response.json.groups);
    } else {
      callback(response.error(), null);
    }
  }.bind(this);

  this.m2xClient.devices.groups(localCb);
};

Adaptor.prototype.create = function(params, callback) {
  this.m2xClient.devices.create(params, callback);
};

Adaptor.prototype.update = function(id, params, callback) {
  this.m2xClient.devices.update(id, params, callback);
};

Adaptor.prototype.view = function(id, callback) {
  this.m2xClient.devices.view(id, callback);
};

Adaptor.prototype.location = function(id, callback) {
  this.m2xClient.devices.location(id, callback);
};

Adaptor.prototype.updateLocation = function(id, params, callback) {
  this.m2xClient.devices.updateLocation(id, callback);
};

Adaptor.prototype.streams = function(id, callback) {
  this.m2xClient.devices.streams(id, callback);
};

Adaptor.prototype.updateStream = function(id, name, params, callback) {
  this.m2xClient.devices.updateStream(id, name, params, callback);
};

Adaptor.prototype.setStreamValue = function(id, name, params, callback) {
  this.m2xClient.devices.setStreamValue(id, name, params, callback);
};
