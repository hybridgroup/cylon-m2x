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
  if (opts == null) {
    opts = {};
  }

  Adaptor.__super__.constructor.apply(this, arguments);

  var extraParams = opts.extraParams || {};

  this.apiKey = extraParams.apiKey;
  this.feedId = extraParams.feedId;
  this.interval = extraParams.interval || 1000;
  this.m2xClient = null;
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = Commands;

Adaptor.prototype.connect = function(callback) {
  this.m2xClient = new M2X(this.apiKey);
  Adaptor.__super__.connect.apply(this, arguments);
};

Adaptor.prototype.subscribe = function(topic, callback) {
  every(this.interval, function() {
    this.m2xClient.feeds.stream(this.feedId, topic, function(data, error, res) {
      callback(data.value);
    });
  }.bind(this));
};

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
