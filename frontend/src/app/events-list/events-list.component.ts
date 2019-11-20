import { Component, OnInit } from "@angular/core";
import { EventApiService } from "../event-api.service";
import { EventModel } from "../event.model";

@Component({
  selector: "app-events-list",
  templateUrl: "./events-list.component.html",
  styleUrls: ["./events-list.component.css"]
})
export class EventsListComponent implements OnInit {
  eventsList: any;
  imageHash = "Qmdu4R9YTgnyogp2htYMzbFZfinoE8tCfKwUCnbi6FjQHz";
  constructor(private eventApi: EventApiService) {}

  async ngOnInit() {
    this.eventsList = await this.eventApi.getEventsList();
    console.log(this.eventsList);
  }

  getImageHash(value: string): string {
    return value ? value : this.imageHash;
  }
}
