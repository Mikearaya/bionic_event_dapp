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
  userTickets = [];
  private eventId: string;

  constructor(
    private eventApi: EventApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventDetail = new EventDetailModel();
  }

  async ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get("eventId");

    if (this.eventId) {
      const detail = await this.eventApi.getEventById(this.eventId);
      console.log(detail);
      this.eventDetail.name = await detail.name();
      this.eventDetail.ticketPrice = await detail.available();
      this.userTickets = await this.eventApi.getUserTickets(this.eventId);
      console.log(this.userTickets);
    }
  }

  getRefund(): void {
    alert("inside get refund");
  }

  async getTicket() {
    await this.eventApi.purchaseTicket(this.eventId, 3);
  }
}
