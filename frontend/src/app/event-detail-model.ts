export class EventDetailModel {
  Id?: number;
  owner: string;
  name: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  ticketPrice: string;
  availableTickets: number;
  image?: string;
  ticketId: string[] = [];
}
