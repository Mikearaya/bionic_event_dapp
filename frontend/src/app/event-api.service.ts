import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { EventModel } from "./event.model";
import { EventDetailModel } from "./event-detail-model";
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
  private deployedEvent;

  constructor(private ethereumApi: Web3Service) {
    this.EventFactory.setProvider(this.ethereumApi.web3.currentProvider);
    this.Event.setProvider(this.ethereumApi.web3.currentProvider);
  }

  getEventById(id: string): Observable<EventDetailModel> {
    const event = contract(eventArtifact);
    const deployedEvent = event.at(id);
    return of(deployedEvent);
  }

  async getEventsList() {
    this.deployedFactory = await this.EventFactory.deployed();
    const eventsList = await this.deployedFactory.getDeployedEvents();
    return eventsList;
  }

  creatEvent(event: EventModel): Observable<string> {
    const deployedFactory = this.Event.deployed();
    const eventsList = deployedFactory.createEvent(
      event.name,
      event.startDate,
      event.endDate,
      event.availableTickets,
      event.ticketPrice,
      { from: this.ethereumApi.account }
    );
    return of(eventsList);
  }
}
