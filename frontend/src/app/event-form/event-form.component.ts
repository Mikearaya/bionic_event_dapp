import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm(): void {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      image: '',
      description: '',
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  getControl(control: string): FormControl {
    return this.eventForm.get(control) as FormControl;
  }

  onSubmit(): void {}
}
