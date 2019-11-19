const Event = artifacts.require("Event");
const EventFactory = artifacts.require("EventFactory");
let catchRevert = require("./exceptionHelper.js").catchRevert;

const assert = require("assert");

contract("Event", function(accounts) {
  let eventFactory;
  let firstEvent;
  let secondEvent;

  beforeEach(async () => {
    eventFactory = await EventFactory.new();

    await eventFactory.createEvent(
      "First Event",
      44444444,
      55555555,
      200,
      1000000,
      "Event Description",
      "Event Location"
    );

    await eventFactory.createEvent(
      "Second Event",
      66666666,
      77777777,
      100,
      2000000,
      "",
      "Second Event Location"
    );

    const deployedEvents = await eventFactory.getDeployedEvents();

    firstEvent = await Event.at(deployedEvents[0]);
    secondEvent = await Event.at(deployedEvents[1]);
  });

  //test if event name is assigned correctly
  it("should have the correct name field value assigned", async () => {
    assert.equal("First Event", await firstEvent.name());
    assert.equal("Second Event", await secondEvent.name());
  });
  //test if start date is assigned correctly
  it("should have the correct start date field value assigned", async () => {
    assert.equal(44444444, await firstEvent.startDate());
    assert.equal(66666666, await secondEvent.startDate());
  });

  //test if end date is assigned correctly
  it("should have the correct end date field value assigned", async () => {
    assert.equal(55555555, await firstEvent.endDate());
    assert.equal(77777777, await secondEvent.endDate());
  });

  //test if available is assigned correctly
  it("should have the correct available field value assigned", async () => {
    assert.equal(200, await firstEvent.available());
    assert.equal(100, await secondEvent.available());
  });

  //test if ticket price is assigned correctly
  it("should have the correct ticket price field value assigned", async () => {
    assert.equal(1000000, await firstEvent.ticketPrice());
    assert.equal(2000000, await secondEvent.ticketPrice());
  });

  //test if event description is assigned correctly
  it("should have the correct Description field value assigned", async () => {
    assert.equal("Event Description", await firstEvent.description());
    assert.equal("", await secondEvent.description());
  });

  //test if event location is assigned correctly
  it("should have the correct location field value assigned", async () => {
    assert.equal("Event Location", await firstEvent.location());
    assert.equal("Second Event Location", await secondEvent.location());
  });

  //test if event can be canceled by the event creator successfuly
  it("event should be canceled successfuly", async () => {
    await firstEvent.cancelEvent();

    assert.equal(true, await firstEvent.isCanceled());
  });

  // tests if anyone but the owner can cancel event
  it("only event owner should be able to cancel event", async () => {
    await catchRevert(
      firstEvent.cancelEvent({
        from: accounts[1]
      })
    );
  });

  // test if purchase ticket is working successfuly

  it("should allow user to purchase ticket successfuly", async () => {
    const initialAvailable = await firstEvent.available();

    await firstEvent.purchaseTicket(3, {
      from: accounts[1],
      value: "3000000"
    });

    const remainingTicket = await firstEvent.available();

    assert.equal(initialAvailable - 3, remainingTicket);
  });

  // testing attempting to purchase more than the max amount alowed at once (5) throws error
  it("should revert when attempting to purchase more than 5 ticket at once", async () => {
    await catchRevert(
      firstEvent.purchaseTicket(6, {
        from: accounts[1],
        value: "3000000"
      })
    );
  });

  // testing attempting to buy the available amount throws error
  it("should revert when attempting to purchase more than available amount ", async () => {
    const available = await firstEvent.available();

    await catchRevert(
      firstEvent.purchaseTicket(available + 1, {
        from: accounts[1],
        value: "3000000"
      })
    );
  });

  // testing attempting to purchase ticket with insufficient funds throws error
  it("should revert when attempting to purchase with insuficient funds", async () => {
    await catchRevert(
      firstEvent.purchaseTicket(3, {
        from: accounts[1],
        value: "2000000"
      })
    );
  });

  // test the successful transfer of tiket ownership
  it("should transfer ownership of token to different account", async () => {
    await firstEvent.purchaseTicket(3, {
      from: accounts[1],
      value: "3000000"
    });

    var initialTickets = await firstEvent.getOwnersTicket(accounts[1]);

    await firstEvent.transferTicket(accounts[2], initialTickets[0], {
      from: accounts[1]
    });
    var transferedTicket = await firstEvent.getOwnersTicket(accounts[2]);

    assert.equal(initialTickets[0].toNumber(), transferedTicket[0].toNumber());
  });

  it("should return all tickets owned", async () => {
    await firstEvent.purchaseTicket(3, { from: accounts[1], value: "3000000" });
    var tickets = await firstEvent.getOwnersTicket(accounts[1]);
    assert.equal(3, tickets.length);
  });

  it("should validate tiket and destroy it ", async () => {
    await firstEvent.purchaseTicket(3, { from: accounts[1], value: "3000000" });

    var tickets = await firstEvent.getOwnersTicket(accounts[1]);

    await firstEvent.isTicketValid(accounts[1], tickets[0]);

    var afterValidation = await firstEvent.getOwnersTicket(accounts[1]);

    assert.notEqual(
      afterValidation[0],
      tickets[0],
      "ticket value at a given index before  and after validation should not be equal"
    );
    assert.notEqual(
      afterValidation.length,
      tickets.length,
      "ticket owned by owner should be less after validation"
    );
  });

  // tests only the owner can call isTicketValid function
  it("should only allow owner to validate ticket", async () => {
    await catchRevert(
      firstEvent.isTicketValid(accounts[1], 2, { from: accounts[3] })
    );
  });

  it("should fail  when non-owner tries to collect payment", async () => {
    await catchRevert(firstEvent.collectPayment({ from: accounts[3] }));
  });

  /*   it("should allow the owner to collect payment", async () => {
    await firstEvent.purchaseTicket(3, { from: accounts[1], value: "3000000" });

    var initialBalance = await web3.eth.getBalance(accounts[0]);
    await firstEvent.collectPayment();
    var balanceAfter = await web3.eth.getBalance(accounts[0]);

    assert.ok(initialBalance > balanceAfter);
  });
 */
  it("should transfer all contract balance when user collects payment", async () => {
    await firstEvent.purchaseTicket(3, { from: accounts[1], value: "3000000" });

    var balanceBeforeWithdrawal = await web3.eth.getBalance(firstEvent.address);

    await firstEvent.collectPayment();

    var balanceAfterWithdrawal = await web3.eth.getBalance(firstEvent.address);

    assert.ok(
      balanceBeforeWithdrawal > 0,
      "contract should have balance before user collects payment"
    );
    assert.ok(
      balanceAfterWithdrawal == 0,
      "contract should not have balance after user collects payment"
    );
  });

  it("should revert if user attempts to collect payment for canceled event", async () => {
    await firstEvent.purchaseTicket(3, { from: accounts[1], value: "3000000" });
    await firstEvent.cancelEvent();
    await catchRevert(firstEvent.collectPayment());
  });

  /* it("should refund tiket fund to user", async () => {
    await firstEvent.purchaseTicket(3, { from: accounts[1], value: "3000000" });
    var purchasedTickets = await firstEvent.getOwnersTicket(accounts[1]);

    var balanceAfterPurchase = await web3.eth.getBalance(accounts[1]);

    await firstEvent.cancelEvent();

    await firstEvent.getRefund(purchasedTickets[0], { from: accounts[1] });
    var balanceAfterRefund = await web3.eth.getBalance(accounts[1]);

    assert.equal(balanceAfterRefund, balanceAfterPurchase);
  }); */

  it("should destroy ticket after refund", async () => {
    await firstEvent.purchaseTicket(3, { from: accounts[1], value: "3000000" });
    var purchasedTickets = await firstEvent.getOwnersTicket(accounts[1]);
    await firstEvent.cancelEvent();
    await firstEvent.getRefund(purchasedTickets[0], { from: accounts[1] });
    var ownerTicketAfterRefund = await firstEvent.getOwnersTicket(accounts[1]);

    assert.ok(purchasedTickets.length > ownerTicketAfterRefund.length);
  });

  it("should revert when requesting refund for event not canceled", async () => {
    await firstEvent.purchaseTicket(3, {
      from: accounts[1],
      value: "3000000"
    });

    await catchRevert(firstEvent.getRefund(2, { from: accounts[1] }));
  });

  it("should return true when event is canceled", async () => {
    await firstEvent.cancelEvent();
    var result = await firstEvent.isCanceled();

    assert.ok(result);
  });

  it("should return false when event is not canceled", async () => {
    var result = await firstEvent.isCanceled();

    assert.ok(!result);
  });
});
