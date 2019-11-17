import { Component, OnInit, Input } from "@angular/core";
import { EventDetailModel } from "../event-detail-model";
import { EventApiService } from "../event-api.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.css"]
})
export class EventDetailComponent implements OnInit {
  eventDetail: EventDetailModel;

  userTickets = [];
  private eventId: string;
  bookingForm: FormGroup;

  @Input()
  public quantity;

  constructor(
    private eventApi: EventApiService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.eventDetail = new EventDetailModel();
    this.initializeForm();
  }

  async ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get("eventId");

    if (this.eventId) {
      const detail = await this.eventApi.getEventById(this.eventId);

      this.eventDetail.name = await detail.name();
      this.eventDetail.description = await detail.description();
      this.eventDetail.owner = await detail.owner();
      this.eventDetail.availableTickets = await detail.available();
      this.eventDetail.location = await detail.location();
      this.eventDetail.startDate = await detail.startDate();
      this.eventDetail.endDate = await detail.endDate();
      this.eventDetail.ticketPrice = await detail.ticketPrice();

      this.userTickets = await this.eventApi.getUserTickets(this.eventId);
    }
  }

  private initializeForm(): void {
    this.bookingForm = this.formBuilder.group({
      quantity: ""
    });
  }

  getRefund(): void {
    alert("inside get refund");
  }

  async getTicket() {
    await this.eventApi.purchaseTicket(
      this.eventId,
      this.bookingForm.get("quantity").value
    );
  }
}
