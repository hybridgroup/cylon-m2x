# Cylon.js For M2x

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and
physical computing using Node.js

This repository contains the Cylon adaptor & driver for the [AT&T M2X storage service](https://m2x.att.com).

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-m2x.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-m2x) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-m2x/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-m2x) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-m2x/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-m2x)

## How to Install

Install the module with:

    $ npm install cylon cylon-m2x

## How to Use

```javascript
var Cylon = require("cylon");

Cylon.robot({
  connections: {
    m2x: { adaptor: "m2x", masterKey: "masterKey" }
  },

  devices: {
    m2xDevice: { driver: "m2x", id: "d9c3b48d3be2e..." }
  },

  work: function(my) {
    var baseTemp = 20, temp = 0;

    every(2000, function() {
      temp = Math.floor(Math.random() * 6) + 1 + baseTemp;
      my.m2xDevice.publish("temp", temp, function(err, data) {
        console.log("Err: ", err);
        console.log("Values: ", data);
      });
    });
  }
}).start();
```

## How to Connect

On the [M2X site][M2X], sign up for an account, or log into your existing account.
After doing so, create a new Device.
The name of the device and details don't matter that much, but they should be meaningful.

<img src="http://i.imgur.com/3BZkKU2.png" alt="Create New Device" width="100%">

With that done, inside the new Device, create a new Stream.
This will be the data repository you can push and read values from Cylon.

<img src="http://i.imgur.com/wcsjTyX.png" alt="New Stream" width="100%">

Once that's done, you're good to go.
Make sure to grab the Master API key from your account details page and Device ID from the
devices page.

Now you're ready to hook up Cylon to M2X!

[M2X]: https://m2x.att.com

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-m2x/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-m2x/blob/master/RELEASES.md
).

## License
Copyright (c) 2014-2015 The Hybrid Group. Licensed under the Apache 2.0 license.
