import { Component, OnInit } from "@angular/core";
import { EventApiService } from "../event-api.service";

@Component({
  selector: "app-events-list",
  templateUrl: "./events-list.component.html",
  styleUrls: ["./events-list.component.css"]
})
export class EventsListComponent implements OnInit {
  eventsList: string[] = [];
  constructor(private eventApi: EventApiService) {}

  async ngOnInit() {
    this.eventsList = await this.eventApi.getEventsList();
  }
}
