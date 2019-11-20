import { Injectable } from "@angular/core";
import { EventModel } from "./event.model";
import { Web3Service } from "./ethereum/web3.service";
declare var require: any;
const contract = require("truffle-contract");
const eventFactoryArtifact = require("../../../build/contracts/EventFactory.json");
const eventArtifact = require("../../../build/contracts/Event.json");
declare var Buffer: any;
declare var window: any;

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
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
      filter: { _filterName: "", _filterLocation: "" },
      fromBlock: 0,
      toBlock: "latest"
    });
    const event: any[] = [];
    console.log(log);
    log.forEach(element => {
      event.push({
        Id: element.returnValues._address,
        name: element.returnValues._name,
        ticketPrice: element.returnValues._ticketPrice,
        location: element.returnValues.location,
        startDate: element.returnValues.startDate,
        endDate: element.returnValues.endDate,
        image: element.returnValues.image
      });
    });

    return event;
  }

  async uploadImage(eventId: string, imageBuffer: any) {
    const event = await this.Event.at(eventId);

    ipfs.add(imageBuffer, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result[0].hash);
      }

      event.setImage(result[0].hash, { from: this.ethereumApi.account });
    });
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
    console.log("ticket id", ticketId);
    console.log("event if", eventId);
    const event = await this.Event.at(eventId);
    await event.getRefund(ticketId, { from: this.ethereumApi.account });
  }

  async cancelEvent(eventId: string) {
    const event = await this.Event.at(eventId);

    await event.cancelEvent();
  }

  async transferTicket(
    eventId: string,
    recieverAccount: string,
    tokenId: number
  ) {
    const event = await this.Event.at(eventId);
    await event.transferTicket(recieverAccount, tokenId, {
      from: this.ethereumApi.account
    });
  }
}
