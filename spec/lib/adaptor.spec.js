"use strict";

/* eslint no-undef: 0 */

var M2X_Adaptor = lib("adaptor");

describe("Cylon.Adaptors.M2X", function() {
  var adaptor;

  beforeEach(function() {
    adaptor = new M2X_Adaptor({ masterKey: "myMasterKey" });
  });

  describe("#constructor", function() {
    it("sets the masterKey", function() {
      expect(adaptor.masterKey).to.be.eql("myMasterKey");
    });

    it("sets the interval for reads", function() {
      expect(adaptor.interval).to.be.eql(2000);
    });
  });

  describe("#connect", function() {
    var callback, m2x;

    beforeEach(function() {
      callback = spy();
      m2x = { devices: {} };

      stub(adaptor, "_new_m2x").returns(m2x);

      adaptor.connect(callback);
    });

    it("creates a new M2X client by calling new_m2x", function() {
      expect(adaptor._new_m2x).to.be.calledOnce;
    });

    it("triggers callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });

  describe("#disconnect", function() {
    var callback;

    beforeEach(function() {
      callback = spy();

      adaptor.disconnect(callback);
    });

    it("triggers callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });

  describe("#list and #catalog", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      stub(adaptor, "_list");

      adaptor.catalog(callback);
      adaptor.list(callback);
    });

    afterEach(function() {
      adaptor._list.restore();
    });

    it("call _list with public ", function() {
      expect(adaptor._list).to.be.calledWith("public", callback);
    });

    it("call _list with private", function() {
      expect(adaptor._list).to.be.calledWith("private", callback);
    });

    it("call _list twice", function() {
      expect(adaptor._list).to.be.calledWith("private", callback);
    });
  });

  describe("#_list", function() {
    var callback, m2x, list, catalog;

    beforeEach(function() {
      m2x = {
        devices: {
          list: stub(),
          catalog: stub()
        }
      };

      callback = spy();

      adaptor.m2xClient = m2x;
      adaptor.devices = m2x.devices;

      list = adaptor.devices.list;
      catalog = adaptor.devices.catalog;

      stub(adaptor, "_defCb").returns(callback);
    });

    afterEach(function() {
      adaptor._defCb.restore();
      adaptor.m2xClient = {};
      adaptor.devices = {};
    });

    describe("when filter params are null", function() {
      beforeEach(function() {
        adaptor._list("public", callback);
        adaptor._list("private", callback);
      });

      it("calls @m2xClient.devices.catalog", function() {
        expect(catalog).to.be.calledWith({}, callback);
      });

      it("calls @m2xClient.devices.list", function() {
        expect(list).to.be.calledWith({}, callback);
      });
    });

    describe("when filter params are present", function() {
      beforeEach(function() {
        adaptor._list("public", { from: "2014/08/01" }, callback);
        adaptor._list("private", { from: "2014/08/01" }, callback);
      });

      it("calls @m2xClient.devices.catalog", function() {
        expect(catalog).to.be.calledWith({ from: "2014/08/01" }, callback);
      });

      it("calls @m2xClient.devices.list", function() {
        expect(list).to.be.calledWith({ from: "2014/08/01" }, callback);
      });
    });
  });

  describe("#_defCb", function() {
    var callback, retCallback, response;

    beforeEach(function() {
      callback = spy();

      response = {
        isSuccess: function() { return true; },
        json: { devices: { id: "1234" } },
        error: function() { return "Some Error!!!"; }
      };

      retCallback = adaptor._defCb(callback);
    });

    afterEach(function() {
      retCallback = null;
    });

    it("returns a function that triggers the callback", function() {
      retCallback(response);
      expect(callback).to.be.calledWith(null, { devices: { id: "1234" } });
    });

    describe("when response isSuccess() === true", function() {
      it("triggers the callback with the data", function() {
        retCallback(response);
        expect(callback).to.be.calledWith(null, { devices: { id: "1234" } });
      });
    });

    describe("when response isSuccess() === false", function() {
      it("returns a function that triggers the callback", function() {
        response.isSuccess = function() { return false; };
        retCallback(response);
        expect(callback).to.be.calledWith("Some Error!!!", null);
      });
    });
  });

  describe("m2x", function() {
    var callback, devices;

    beforeEach(function() {
      adaptor.devices = devices = {
        groups: stub(),
        create: stub(),
        update: stub(),
        view: stub(),
        location: stub(),
        updateLocation: stub(),
        streams: stub(),
        updateStream: stub(),
        setStreamValue: stub(),
        stream: stub(),
        streamValues: stub(),
        sampleStreamValues: stub(),
        streamStats: stub(),
        postValues: stub(),
        deleteStreamValues: stub(),
        deleteStream: stub(),
        postMultiple: stub(),
        triggers: stub(),
        createTrigger: stub(),
        trigger: stub(),
        updateTrigger: stub(),
        testTrigger: stub(),
        deleteTrigger: stub(),
        log: stub(),
        deleteDevice: stub(),
        keys: stub(),
        createKey: stub(),
        updateKey: stub()
      };

      adaptor.m2xClient = { devices: devices };

      callback = spy();

      stub(adaptor, "_defCb").returns(callback);
    });

    afterEach(function() {
      adaptor._defCb.restore();
      adaptor.m2xClient = {};
    });

    describe("#groups", function() {
      it("calls @m2xClient.devices.groups", function() {
        adaptor.groups(callback);
        expect(devices.groups).to.be.calledWith(callback);
      });
    });

    describe("#create", function() {
      it("calls @m2xClient.devices.create", function() {
        var params = { name: "deviceName" };
        adaptor.create({ name: "deviceName" }, callback);
        expect(devices.create).to.be.calledWith(params, callback);
      });
    });
    describe("#update", function() {
      it("calls @m2xClient.devices.update", function() {
        adaptor.update("123456", { name: "deviceName2" }, callback);
        expect(devices.update).to.be.calledWith(
          "123456",
          { name: "deviceName2" },
          callback
        );
      });
    });

    describe("#view", function() {
      it("calls @m2xClient.devices.view", function() {
        adaptor.view("123456", callback);
        expect(devices.view).to.be.calledWith("123456", callback);
      });
    });

    describe("#location", function() {
      it("calls @m2xClient.devices.location", function() {
        adaptor.location("123456", callback);
        expect(devices.location).to.be.calledWith("123456", callback);
      });
    });

    describe("#updateLocation", function() {
      it("calls @m2xClient.devices.updateLocation", function() {
        adaptor.updateLocation(
          "123456",
          { lon: 123456, lat: 123456 },
          callback
        );

        expect(devices.updateLocation).to.be.calledWith(
          "123456",
          { lon: 123456, lat: 123456 },
          callback
        );
      });
    });

    describe("#streams", function() {
      it("calls @m2xClient.devices.streams", function() {
        adaptor.streams("123456", callback);
        expect(devices.streams).to.be.calledWith("123456", callback);
      });
    });

    describe("#updateStream", function() {
      it("calls @m2xClient.devices.updateStream", function() {
        adaptor.updateStream("123456", { name: "some new name" }, callback);
        expect(devices.updateStream).to.be.calledWith(
          "123456",
          { name: "some new name" },
          callback
        );
      });
    });

    describe("#publish", function() {
      it("calls @m2xClient.devices.setStreamValue", function() {
        adaptor.publish("123456", "temp", 15, callback);
        expect(devices.setStreamValue).to.be.calledWith(
          "123456",
          "temp",
          { value: 15 },
          callback
        );
      });
    });

    describe("#setStreamValue", function() {
      it("calls @m2xClient.devices.setStreamValue", function() {
        adaptor.setStreamValue("123456", "temp", { value: 15 }, callback);
        expect(devices.setStreamValue).to.be.calledWith(
          "123456",
          "temp",
          { value: 15 },
          callback
        );
      });
    });

    describe("#stream", function() {
      it("calls @m2xClient.devices.stream", function() {
        adaptor.stream("123456", "temp", callback);
        expect(devices.stream).to.be.calledWith("123456", "temp", callback);
      });
    });

    describe("#subscribe", function() {
      beforeEach(function() {
        setInterval = stub();
        setInterval.yields();

        stub(adaptor, "streamValues");

        adaptor.subscribe("123456", "temp", callback);
      });

      it("calls #streamValues", function() {
        var p1 = "123456";
        expect(adaptor.streamValues).to.be.calledWith(p1, "temp");
      });
    });

    describe("#streamValues", function() {
      it("calls @m2xClient.devices.streamValues", function() {
        adaptor.streamValues("123456", "temp", callback);
        var p1 = "123456";
        expect(devices.streamValues).to.be.calledWith(p1, "temp", callback);
      });
    });

    describe("#sampleStreamValues", function() {
      it("calls @m2xClient.devices.sampleStreamValues", function() {
        adaptor.sampleStreamValues("123456", "temp", callback);
        expect(devices.sampleStreamValues).to.be.calledWith(
          "123456",
          "temp",
          callback
        );
      });
    });

    describe("#streamStats", function() {
      it("calls @m2xClient.devices.streamStats", function() {
        var p1 = "123456";
        adaptor.streamStats("123456", "temp", callback);
        expect(devices.streamStats).to.be.calledWith(p1, "temp", callback);
      });
    });

    describe("#postValues", function() {
      it("calls @m2xClient.devices.postValues", function() {
        adaptor.postValues(
          "123456",
          { value: "some new name", timestamp: "DateISOString" },
          callback
        );

        expect(devices.postValues).to.be.calledWith(
          "123456",
          { value: "some new name", timestamp: "DateISOString" },
          callback
        );
      });
    });

    describe("#deleteStreamValues", function() {
      it("calls @m2xClient.devices.deleteStreamValues", function() {
        adaptor.deleteStreamValues(
          "123456",
          { from: "someDate", to: "otherDate" },
          callback
        );

        expect(devices.deleteStreamValues).to.be.calledWith(
          "123456",
          { from: "someDate", to: "otherDate" },
          callback
        );
      });
    });

    describe("#deleteStream", function() {
      it("calls @m2xClient.devices.updateStream", function() {
        adaptor.deleteStream("123456", "myStream", callback);
        expect(devices.deleteStream).to.be.calledWith(
          "123456",
          "myStream",
          callback
        );
      });
    });

    describe("#postMultiple", function() {
      it("calls @m2xClient.devices.postMultiple", function() {
        adaptor.postMultiple(
          "123456",
          { name: "temp", value: "some new name", timestamp: "DateISOString" },
          callback
        );

        expect(devices.postMultiple).to.be.calledWith(
          "123456",
          { name: "temp", value: "some new name", timestamp: "DateISOString" },
          callback
        );
      });
    });

    describe("#triggers", function() {
      it("calls @m2xClient.devices.triggers", function() {
        adaptor.triggers("123456", callback);
        expect(devices.triggers).to.be.calledWith("123456", callback);
      });
    });

    describe("#createTrigger", function() {
      it("calls @m2xClient.devices.createTrigger", function() {
        adaptor.createTrigger("123456", { name: "some new name" }, callback);
        expect(devices.createTrigger).to.be.calledWith(
          "123456",
          { name: "some new name" },
          callback
        );
      });
    });

    describe("#trigger", function() {
      it("calls @m2xClient.devices.trigger", function() {
        adaptor.trigger("123456", "triggerID", callback);
        var p1 = "123456";
        expect(devices.trigger).to.be.calledWith(p1, "triggerID", callback);
      });
    });

    describe("#updateTrigger", function() {
      it("calls @m2xClient.devices.updateTrigger", function() {
        adaptor.updateTrigger("123456", { name: "some new name" }, callback);
        expect(devices.updateTrigger).to.be.calledWith(
          "123456",
          { name: "some new name" },
          callback
        );
      });
    });

    describe("#testTrigger", function() {
      it("calls @m2xClient.devices.testTrigger", function() {
        adaptor.testTrigger("123456", "triggerID", callback);
        expect(devices.testTrigger).to.be.calledWith(
          "123456",
          "triggerID",
          callback
        );
      });
    });

    describe("#deleteTrigger", function() {
      it("calls @m2xClient.devices.deleteTrigger", function() {
        adaptor.deleteTrigger("123456", "triggerID", callback);
        expect(devices.deleteTrigger).to.be.calledWith(
          "123456",
          "triggerID",
          callback
        );
      });
    });

    describe("#log", function() {
      it("calls @m2xClient.devices.log", function() {
        adaptor.log("123456", callback);
        expect(devices.log).to.be.calledWith("123456", callback);
      });
    });

    describe("#deleteDevice", function() {
      it("calls @m2xClient.devices.deleteDevice", function() {
        adaptor.deleteDevice("123456", callback);
        expect(devices.deleteDevice).to.be.calledWith("123456", callback);
      });
    });

    describe("#keys", function() {
      it("calls @m2xClient.devices.keys", function() {
        adaptor.keys("123456", callback);
        expect(devices.keys).to.be.calledWith("123456", callback);
      });
    });

    describe("#createKey", function() {
      it("calls @m2xClient.devices.createKey", function() {
        adaptor.createKey("123456", { name: "key" }, callback);
        expect(devices.createKey).to.be.calledWith(
          "123456",
          { name: "key" },
          callback
        );
      });
    });

    describe("#updateKey", function() {
      it("calls @m2xClient.devices.updateKey", function() {
        adaptor.updateKey("123456", { name: "key2" }, callback);

        expect(devices.updateKey).to.be.calledWith(
          "123456",
          { name: "key2" },
          callback
        );
      });
    });
  });
});

