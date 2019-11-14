import { Component, OnInit } from "@angular/core";
import { EventDetailModel } from "../event-detail-model";
import { EventApiService } from "../event-api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.css"]
})
export class EventDetailComponent implements OnInit {
  eventDetail: EventDetailModel;
  private eventId: string;

  constructor(
    private eventApi: EventApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventDetail = new EventDetailModel();
  }

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get("eventId");

    if (this.eventId) {
      this.eventApi
        .getEventById(this.eventId)
        .subscribe((event: EventDetailModel) => (this.eventDetail = event));
    }
  }

  getRefund(): void {
    alert("inside get refund");
  }

  getTicket(): void {
    alert("inside get ticket");
  }
}
