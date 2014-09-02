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
      console.log("Setting test-topic to " + count);
      my.m2x.push('test-topic', { value: count++ });
    });

    my.m2x.subscribe('test-topic', function(data) {
      console.log(data);
    });
  }
}).start();
