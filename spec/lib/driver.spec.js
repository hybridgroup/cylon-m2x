// jshint expr:true
"use strict";

var M2X = source("driver");

describe("Cylon.Drivers.M2X", function() {
  var driver;

  beforeEach(function() {
    driver  = new M2X({
      connection: {}
    });
  });

  describe("#constructor", function() {
    it("sets commands object with the following", function() {
      var commands = [
        "catalog",
        "list",
        "groups",
        "create",
        "update",
        "view",
        "location",
        "update_location",
        "streams",
        "update_stream",
        "set_stream_value",
        "stream",
        "stream_values",
        "sample_stream_values",
        "stream_stats",
        "post_values",
        "delete_stream_values",
        "delete_stream",
        "post_multiple",
        "triggers",
        "create_trigger",
        "trigger",
        "update_trigger",
        "test_trigger",
        "delete_trigger",
        "log",
        "delete_device",
        "keys",
        "create_key",
        "update_key"
      ];

      for (var c in commands) {
        //console.log("command is a function?: ", commands[c]);
        expect(driver.commands[commands[c]]).to.be.a("function");
      }
    });
  });

  describe("#start", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      driver.start(callback);
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });

  describe("#halt", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      driver.halt(callback);
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });
  describe("command", function() {
    var cb, connection;

    beforeEach(function() {
      cb = spy();

      connection = {
        "catalog": spy(),
        "list": spy(),
        "groups": spy(),
        "create": spy(),
        "update": spy(),
        "view": spy(),
        "location": spy(),
        "updateLocation": spy(),
        "streams": spy(),
        "updateStream": spy(),
        "setStreamValue": spy(),
        "stream": spy(),
        "streamValues": spy(),
        "sampleStreamValues": spy(),
        "streamStats": spy(),
        "postValues": spy(),
        "deleteStreamValues": spy(),
        "deleteStream": spy(),
        "postMultiple": spy(),
        "triggers": spy(),
        "createTrigger": spy(),
        "trigger": spy(),
        "updateTrigger": spy(),
        "testTrigger": spy(),
        "deleteTrigger": spy(),
        "log": spy(),
        "deleteDevice": spy(),
        "keys": spy(),
        "createKey": spy(),
        "updateKey": spy()
      };

      driver.connection = connection;
    });

    afterEach(function() {
      driver.connection.restore;
    });

    it("#catalog calls #connection.catalog", function() {
      driver.catalog("123", cb);
      expect(connection.catalog).to.be.calledOnce;
      expect(connection.catalog).to.be.calledWith("123", cb);
    });

    it("#list calls #connection.list", function() {
      driver.list("123", cb);
      expect(connection.list).to.be.calledOnce;
      expect(connection.list).to.be.calledWith("123", cb);
    });

    it("#groups calls #connection.groups", function() {
      driver.groups("123", cb);
      expect(connection.groups).to.be.calledOnce;
      expect(connection.groups).to.be.calledWith("123", cb);
    });

    it("#create calls #connection.create", function() {
      driver.create("123", cb);
      expect(connection.create).to.be.calledOnce;
      expect(connection.create).to.be.calledWith("123", cb);
    });

    it("#update calls #connection.update", function() {
      driver.update("123", {}, cb);
      expect(connection.update).to.be.calledOnce;
      expect(connection.update).to.be.calledWith("123", {}, cb);
    });

    it("#view calls #connection.view", function() {
      driver.view("123", cb);
      expect(connection.view).to.be.calledOnce;
      expect(connection.view).to.be.calledWith("123", cb);
    });

    it("#location calls #connection.location", function() {
      driver.location("123", cb);
      expect(connection.location).to.be.calledOnce;
      expect(connection.location).to.be.calledWith("123", cb);
    });

    it("#updateLocation calls #connection.updateLocation", function() {
      driver.updateLocation("123", {}, cb);
      expect(connection.updateLocation).to.be.calledOnce;
      expect(connection.updateLocation).to.be.calledWith("123", {}, cb);
    });

    it("#streams calls #connection.streams", function() {
      driver.streams("123", cb);
      expect(connection.streams).to.be.calledOnce;
      expect(connection.streams).to.be.calledWith("123", cb);
    });

    it("#updateStream calls #connection.updateStream", function() {
      driver.updateStream("123", "stream", {}, cb);
      expect(connection.updateStream).to.be.calledOnce;
      expect(connection.updateStream).to.be.calledWith("123", "stream", {}, cb);
    });

    it("#setStreamValue calls #connection.setStreamValue", function() {
      driver.setStreamValue("123", "name", {}, cb);
      expect(connection.setStreamValue).to.be.calledOnce;
      expect(connection.setStreamValue).to.be.calledWith("123", "name", {}, cb);
    });

    it("#stream calls #connection.stream", function() {
      driver.stream("123", "name", cb);
      expect(connection.stream).to.be.calledOnce;
      expect(connection.stream).to.be.calledWith("123", "name", cb);
    });

    it("#streamValues calls #connection.streamValues", function() {
      driver.streamValues("123", "name", {}, cb);
      expect(connection.streamValues).to.be.calledOnce;
      expect(connection.streamValues).to.be.calledWith("123", "name", {}, cb);
    });

    it("#sampleStreamValues calls #connection.sampleStreamValues", function() {
      driver.sampleStreamValues("123", "name", {}, cb);
      expect(connection.sampleStreamValues).to.be.calledOnce;
      expect(connection.sampleStreamValues)
        .to.be.calledWith("123", "name", {}, cb);
    });

    it("#streamStats calls #connection.streamStats", function() {
      driver.streamStats("123", "name", {}, cb);
      expect(connection.streamStats).to.be.calledOnce;
      expect(connection.streamStats).to.be.calledWith("123", "name", {}, cb);
    });

    it("#postValues calls #connection.postValues", function() {
      driver.postValues("123", "name", {}, cb);
      expect(connection.postValues).to.be.calledOnce;
      expect(connection.postValues).to.be.calledWith("123", "name", {}, cb);
    });

    it("#deleteStreamValues calls #connection.deleteStreamValues", function() {
      driver.deleteStreamValues("123", "name", {}, cb);
      expect(connection.deleteStreamValues).to.be.calledOnce;
      expect(connection.deleteStreamValues)
        .to.be.calledWith("123", "name", {}, cb);
    });

    it("#deleteStream calls #connection.deleteStream", function() {
      driver.deleteStream("123", "name", {}, cb);
      expect(connection.deleteStream).to.be.calledOnce;
      expect(connection.deleteStream).to.be.calledWith("123", "name", {}, cb);
    });

    it("#postMultiple calls #connection.postMultiple", function() {
      driver.postMultiple("123", {}, cb);
      expect(connection.postMultiple).to.be.calledOnce;
      expect(connection.postMultiple).to.be.calledWith("123", {}, cb);
    });

    it("#triggers calls #connection.triggers", function() {
      driver.triggers("123", cb);
      expect(connection.triggers).to.be.calledOnce;
      expect(connection.triggers).to.be.calledWith("123", cb);
    });

    it("#createTrigger calls #connection.createTrigger", function() {
      driver.createTrigger("123", {}, cb);
      expect(connection.createTrigger).to.be.calledOnce;
      expect(connection.createTrigger).to.be.calledWith("123", {}, cb);
    });

    it("#trigger calls #connection.trigger", function() {
      driver.trigger("123", "tid", cb);
      expect(connection.trigger).to.be.calledOnce;
      expect(connection.trigger).to.be.calledWith("123", "tid", cb);
    });

    it("#updateTrigger calls #connection.updateTrigger", function() {
      driver.updateTrigger("123", "tid", {}, cb);
      expect(connection.updateTrigger).to.be.calledOnce;
      expect(connection.updateTrigger).to.be.calledWith("123", "tid", {}, cb);
    });

    it("#testTrigger calls #connection.testTrigger", function() {
      driver.testTrigger("123", "tid", cb);
      expect(connection.testTrigger).to.be.calledOnce;
      expect(connection.testTrigger).to.be.calledWith("123", "tid", cb);
    });

    it("#deleteTrigger calls #connection.deleteTrigger", function() {
      driver.deleteTrigger("123", "tid", cb);
      expect(connection.deleteTrigger).to.be.calledOnce;
      expect(connection.deleteTrigger).to.be.calledWith("123", "tid", cb);
    });

    it("#log calls #connection.log", function() {
      driver.log("123", cb);
      expect(connection.log).to.be.calledOnce;
      expect(connection.log).to.be.calledWith("123", cb);
    });

    it("#deleteDevice calls #connection.deleteDevice", function() {
      driver.deleteDevice("123", cb);
      expect(connection.deleteDevice).to.be.calledOnce;
      expect(connection.deleteDevice).to.be.calledWith("123", cb);
    });

    it("#keys calls #connection.keys", function() {
      driver.keys("123", cb);
      expect(connection.keys).to.be.calledOnce;
      expect(connection.keys).to.be.calledWith("123", cb);
    });

    it("#createKey calls #connection.createKey", function() {
      driver.createKey("123", {}, cb);
      expect(connection.createKey).to.be.calledOnce;
      expect(connection.createKey).to.be.calledWith("123", {}, cb);
    });

    it("#updateKey calls #connection.updateKey", function() {
      driver.updateKey("123", "key", {}, cb);
      expect(connection.updateKey).to.be.calledOnce;
      expect(connection.updateKey).to.be.calledWith("123", "key", {}, cb);
    });
  });
});
