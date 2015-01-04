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

  this.masterKey = opts.apiKey;
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
  this.m2xClient.devices.groups(callback);
};

Adaptor.prototype.create = function(params, callback) {
  this.m2xClient.devices.create(params, callback);
};

Adaptor.prototype.update = function(id, params, callback) {
  this.m2xClient.devices.update(id, params, callback);
};

Adaptor.prototype.view = function(id, params, callback) {
  this.m2xClient.devices.view(id, callback);
};

/**
 * Subscribes to messages on a topic through M2X
 *
 * @param {String} topic topic name to subscribe to
 * @param {Function} callback function to be triggered with new data on the topic
 * @return {null}
 * @publish
 */

/*
Adaptor.prototype.subscribe = function(topic, callback) {
  every(this.interval, function() {
    this.m2xClient.devices.stream(this.feedId, topic, function(data, err) {
      callback(err, data.value);
    });
  }.bind(this));
};
 */

/**
 * Publishes a new message to a topic through M2X
 *
 * @param {String} topic topic name to publish to
 * @param {Object} data
 * @return {null}
 * @publish
 */

/*
Adaptor.prototype.push = function(topic, data) {
  // M2X expects timestamps in ISO-8601 format, .toJSON() is shorthand
  data.at = data.at || new Date();
  data.at = data.at.toJSON();

  this.m2xClient.feeds.updateStreamValue(this.feedId, topic, data, function(data, error, res) {
    switch (res.statusCode) {
      case 202: // 'OK' result
        break;

      default: // error of some sort
        console.log("error:", res.statusCode);
        console.log(arguments);
        // TODO: abort if something went wrong
    }
  });
};
*/
