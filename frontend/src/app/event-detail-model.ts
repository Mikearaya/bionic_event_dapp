export class EventDetailModel {
  Id?: number;
  name: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  ticketPrice: string;
  image?: string;
  ticketId: string[] = [];
}
