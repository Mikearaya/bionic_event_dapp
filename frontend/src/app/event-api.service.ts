import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventModel } from "./event.model";
import { EventDetailModel } from "./event-detail-model";

@Injectable({
  providedIn: "root"
})
export class EventApiService {
  controller = "events";
  constructor(private httpClient: HttpClient) {}

  getEventById(id: string): Observable<EventDetailModel> {
    return this.httpClient.get<EventDetailModel>(this.controller);
  }

  getEventsList(): Observable<EventModel[]> {
    return this.httpClient.get<EventModel[]>(this.controller);
  }

  creatEvent(event: EventModel): Observable<string> {
    return this.httpClient.post<string>(this.controller, event);
  }

  updateEvent(event: EventModel): Observable<void> {
    return this.httpClient.put<void>(`${this.controller}/${event.Id}`, event);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controller}/${eventId}`);
  }
}
