export type Ticket = {
  ticket_id: string;
  type: string;
  price: number;
  quantity: number;
};

export type Event = {
  event_id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  banner_url: string;
  tickets: Ticket[];
};
