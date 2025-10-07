export type Booking = {
  ticket_id: string;
  event_name: string;
  event_date: string;
  ticket_type: string;
  price: number;
  status: "success" | "pending" | "cancelled";
  booking_date: string;
  ticket_code: string;
};

export type Ticket = {
  ticket_id: string;
  type: string;
  price: number;
  quantity: number;
};

export const userBookings: Booking[] = [];

export type Event = {
  event_id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  duration: string;
  organizer: string;
  banner_url: string;
  tickets: Ticket[];
};
