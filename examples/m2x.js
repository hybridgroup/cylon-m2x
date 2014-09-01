var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'm2x', adaptor: 'm2x', apiKey: 'key', feedId: 'feedId' },
  device: {name: 'm2x', driver: 'm2x'},

  work: function(my) {
    var count = 0;

    every(100, function() {
      my.m2x.push('topic1', { count: count++ });
    });

    my.m2x.subscribe('topic1', function(data) {
      console.log(data);
    });
  }
}).start();
