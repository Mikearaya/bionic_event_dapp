import { Injectable } from "@angular/core";
import { EventModel } from "./event.model";
import { Web3Service } from "./ethereum/web3.service";
declare var require: any;
const contract = require("truffle-contract");
const eventFactoryArtifact = require("../../../build/contracts/EventFactory.json");
const eventArtifact = require("../../../build/contracts/Event.json");

@Injectable({
  providedIn: "root"
})
export class EventApiService {
  controller = "events";
  EventFactory = contract(eventFactoryArtifact);
  Event = contract(eventArtifact);

  private deployedFactory;

  constructor(private ethereumApi: Web3Service) {
    this.EventFactory.setProvider(this.ethereumApi.web3.currentProvider);
    this.Event.setProvider(this.ethereumApi.web3.currentProvider);
  }

  async getEventById(id: string) {
    return await this.Event.at(id);
  }

  async getEventsList() {
    this.deployedFactory = await this.EventFactory.deployed();

    const log = await this.deployedFactory.getPastEvents("eventCreated", {
      fromBlock: 0,
      toBlock: "latest"
    });
    const event: any[] = [];
    log.forEach(element => {
      event.push({
        Id: element.returnValues._address,
        name: element.returnValues._name,
        ticketPrice: element.returnValues._ticketPrice,
        location: element.returnValues.location,
        startDate: element.returnValues.startDate,
        endDate: element.returnValues.endDate
      });
    });

    return event;
  }

  async creatEvent(event: EventModel) {
    this.deployedFactory = await this.EventFactory.deployed();
    const eventsList = await this.deployedFactory.createEvent(
      event.name,
      event.startDate,
      event.endDate,
      event.availableTickets,
      event.ticketPrice,
      event.description,
      event.location,
      { from: this.ethereumApi.account }
    );
    return eventsList;
  }

  async getUserTickets(eventId: string) {
    const event = await this.Event.at(eventId);
    return await event.getOwnersTicket(this.ethereumApi.account);
  }

  async purchaseTicket(eventId: string, quantity: number) {
    const event = await this.Event.at(eventId);
    const price = await event.ticketPrice();
    const total = price * quantity;

    const val = this.ethereumApi.web3.utils.toWei(total.toString(), "ether");
    await event.purchaseTicket(quantity, {
      from: this.ethereumApi.account,
      value: val
    });
  }

  async getTicketRefund(eventId: string, ticketId: number) {
    const event = await this.Event.at(eventId);
    await event.getRefund(ticketId, { from: this.ethereumApi.account });
  }

  async cancelEvent(eventId: string) {
    alert(eventId);
    const event = await this.Event.at(eventId);
    await event.cancelEvent({ from: this.ethereumApi.account });
  }
}
