# Cylon.js For M2x

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and
physical computing using Node.js

This repository contains the Cylon adaptor & driver for the [AT&T M2X storage service](https://m2x.att.com).

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-m2x.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-m2x)

## Getting Started

Install the module with: `npm install cylon-m2x`

## Setting up M2X

On the [M2X site][M2X], sign up for an account, or log into your existing account.
After doing so, create a new Data Source Blueprint.
The name and details don't matter that much, but they should be meaningful.

![New Data Source Blueprint](http://i.imgur.com/YWIPHKr.png)

With that done, inside the new Data Source, create a new Stream.
This will be the data repository you can push and subscribe to from Cylon.

![New Stream](http://i.imgur.com/piKM1ey.png)

Once that's done, you're good to go.
Make sure to grab the API key and Feed ID from the Data Source page.

Now you're ready to hook up Cylon to M2X!

[M2X]: https://m2x.att.com

## Connecting

Most of the information you need for Cylon is stored in the connection hash, be sure to provide the API Key and Feed ID you grabbed off the Data Source page.

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: {
    name: 'm2x',
    adaptor: 'm2x',
    apiKey: '???',
    feedId: '???'
  },

  device: { name: 'm2x', driver: 'm2x' },

  work: function(my) {
    var count = 1;

    every(2000, function() {
      my.m2x.push('money', { value: count++ });
    });

    my.m2x.subscribe('money', function(data) {
      console.log("Latest value from M2X: " + data);
    });
  }
}).start();
```

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

- 0.2.0 - Compatability with Cylon 0.19.0

- 0.1.0 - Initial release.

## License
Copyright (c) 2014 The Hybrid Group. Licensed under the Apache 2.0 license.
