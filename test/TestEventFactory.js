const EventFactory = artifacts.require("EventFactory");
let catchRevert = require("./exceptionHelper.js").catchRevert;
const assert = require("assert");

contract("EventFactory", function(accounts) {
  let eventFactory;

  beforeEach(async () => {
    eventFactory = await EventFactory.new();
  });

  it("should have no events", async () => {
    assert.equal(
      await eventFactory.deployedEvents.length,
      0,
      "expected event count to be 0"
    );
  });

  it("should create event successfuly", async () => {
    const transaction = await eventFactory.createEvent(
      "Test event",
      555555555,
      666666666,
      200,
      1,
      "event description",
      "addis ababa",
      { from: accounts[0] }
    );

    var result = await eventFactory.getDeployedEvents();

    assert.equal(1, result.length, "there should be two events created");

    const { logs } = transaction;

    // test if event created event is emited

    assert.equal(logs.length, 1, "there should be only 1 event emited");
    const log = logs[0];
    assert.equal(
      log.event,
      "eventCreated",
      "emited event value should be eventCreated"
    );
  });
});
