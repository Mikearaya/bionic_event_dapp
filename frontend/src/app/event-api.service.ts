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
    const eventsList = await this.deployedFactory.getDeployedEvents();
    return eventsList;
  }

  async creatEvent(event: EventModel) {
    this.deployedFactory = await this.EventFactory.deployed();

    const eventsList = this.deployedFactory.createEvent(
      event.name,
      event.startDate,
      event.endDate,
      event.availableTickets,
      event.ticketPrice,
      { from: this.ethereumApi.account }
    );
    return eventsList;
  }

  async getUserTickets(eventId: string) {
    const event = await this.Event.at(eventId);
    return await event.getOwnersTicket(this.ethereumApi.account);
  }

  async purchaseTicket(eventId: string, quantity: number) {
    const val = this.ethereumApi.web3.utils.toWei("2", "ether");
    const event = await this.Event.at(eventId);

    await event.purchaseTicket(2, {
      from: this.ethereumApi.account,
      value: val
    });
  }
}
