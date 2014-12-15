var Cylon = require('cylon');

Cylon.robot({
  connections: {
    m2x: { adaptor: 'm2x', apiKey: '???', feedId: '???' }
  },

  devices: {
    m2x: { driver: 'm2x' }
  },

  work: function(my) {
    var count = 1;

    every(2000, function() {
      console.log("Setting 'money' to " + count);
      my.m2x.push('money', { value: count++ });
    });

    my.m2x.subscribe('money', function(err, data) {
      console.log("Latest value from M2X: " + data);
    });
  }
}).start();
