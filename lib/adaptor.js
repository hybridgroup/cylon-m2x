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
    m2x.feeds.streamValues(this.feedId, topic, null, callback);
  }.bind(this));
};

Adaptor.prototype.push = function(topic, data) {
  this.m2xClient.feeds.postMultiple(this.feedId, data, function(data, error, res) {
    if (res.statusCode !== 202) {
      console.log("error: ", res.statusCode);
      // TODO: abort if something went wrong
    }
  });
};
