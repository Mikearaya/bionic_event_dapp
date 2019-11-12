import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  eventsList = [
    {
      name: 'Event 1',
      location: 'Addis Ababa, Ethiopia',
      date: Date().toString(),
      price: '0.01 eth',
      image: 'assets/img1.jpeg'
    },
    {
      name: 'Event 1',
      location: 'Addis Ababa, Ethiopia',
      date: Date().toString(),
      price: '0.01 eth',
      image: 'assets/img2.jpeg'
    },
    {
      name: 'Event 1',
      location: 'Addis Ababa, Ethiopia',
      date: Date().toString(),
      price: '0.01 eth',
      image: 'assets/img3.jpeg'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
