export interface Ticket {
  ticket_id: string;
  event_name: string;
  event_date: string;
  ticket_type: string;
  price: number;
  status: "success" | "pending" | "cancelled";
  booking_date: string;
  ticket_code: string;
}

export const userTickets: Ticket[] = [];