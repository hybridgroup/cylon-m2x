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

  this.apiKey = opts.apiKey;
  this.feedId = opts.feedId;
  this.interval = opts.interval || 1000;
  this.m2xClient = null;
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = Commands;

Adaptor.prototype.connect = function(callback) {
  this.m2xClient = new M2X(this.apiKey);
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};

/**
 * Subscribes to messages on a topic through M2X
 *
 * @param {String} topic topic name to subscribe to
 * @param {Function} callback function to be triggered with new data on the topic
 * @return {null}
 * @publish
 */
Adaptor.prototype.subscribe = function(topic, callback) {
  every(this.interval, function() {
    this.m2xClient.feeds.stream(this.feedId, topic, function(data, err, res) {
      callback(err, data.value);
    });
  }.bind(this));
};

/**
 * Publishes a new message to a topic through M2X
 *
 * @param {String} topic topic name to publish to
 * @param {Object} data
 * @return {null}
 * @publish
 */
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
