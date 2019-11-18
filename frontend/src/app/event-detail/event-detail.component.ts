import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { EventDetailModel } from "../event-detail-model";
import { EventApiService } from "../event-api.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Web3Service } from "../ethereum/web3.service";

declare var $: any;
@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.css"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EventDetailComponent implements OnInit {
  eventDetail: EventDetailModel;
  currentAccount: string;
  isCanceled: boolean;

  userTickets = [];
  private eventId: string;
  bookingForm: FormGroup;

  @Input()
  public quantity;

  constructor(
    private eventApi: EventApiService,
    private ethereumApi: Web3Service,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.eventDetail = new EventDetailModel();
    this.initializeForm();
  }

  async ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get("eventId");
    this.ethereumApi.selectedAccount$.subscribe(
      (a: string) => (this.currentAccount = a)
    );
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
      this.isCanceled = await detail.isCanceled();
      this.userTickets = await this.eventApi.getUserTickets(this.eventId);
    }
  }

  private initializeForm(): void {
    this.bookingForm = this.formBuilder.group({
      quantity: ""
    });
  }

  async getRefund(ticketId: number) {
    await this.eventApi.getTicketRefund(this.eventId, ticketId);
  }

  async getTicket() {
    await this.eventApi.purchaseTicket(
      this.eventId,
      this.bookingForm.get("quantity").value
    );
  }

  isOwner(): boolean {
    return this.currentAccount === this.eventDetail.owner;
  }

  async cancelEvent() {
    const result = await this.eventApi.cancelEvent(this.eventId);
  }

  generateCode(ticketId: string): string {
    const ticketCode = {
      ticketId: ticketId,
      account: this.currentAccount
    };

    return JSON.stringify(ticketCode);
  }

  async transferTo(address: string, tokenId: number) {
    await this.eventApi.transferTicket(this.eventId, address, tokenId);
  }
}
