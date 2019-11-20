import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { EventApiService } from "../event-api.service";

declare var require: any;
declare var window: any;

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

@Component({
  selector: "app-event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.css"]
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private eventApi: EventApiService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm(): void {
    this.eventForm = this.formBuilder.group({
      eventName: ["", Validators.required],
      image: "",
      description: "",
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      location: ["", Validators.required],
      availableTicket: [1, Validators.required],
      ticketPrice: ["", Validators.required]
    });
  }

  getControl(control: string): FormControl {
    return this.eventForm.get(control) as FormControl;
  }

  onSubmit(): void {
    this.eventApi.creatEvent({
      name: this.getControl("eventName").value,
      startDate: toTimestamp(this.getControl("startDate").value),
      endDate: toTimestamp(this.getControl("endDate").value),
      location: this.getControl("location").value,
      image: this.getControl("image").value,
      availableTickets: this.getControl("availableTicket").value,
      description: this.getControl("description").value,
      ticketPrice: this.getControl("ticketPrice").value
    });
  }
  imageSelected(event: any): void {
    event.preventDefault();
    console.log("file selected ....");
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = e => {
      console.log("buffer");
      /* console.log(Buffer(reader.result)); */
      ipfs.add(Buffer(reader.result), (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
        }
      });
    };

    console.log(event.target.files);
  }
}

function toTimestamp(date) {
  return new Date(date).valueOf();
}
