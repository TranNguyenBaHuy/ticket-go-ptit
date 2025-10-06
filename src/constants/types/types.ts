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
  duration: string;
  organizer: string;
  banner_url: string;
  tickets: Ticket[];
};

// Authentication types
export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  avatar?: string;
}

export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}