export type UserRole = 'user' | 'admin' | 'guest';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type CarType = 'Sedan' | 'SUV' | 'Sports' | 'Luxury' | 'Electric' | 'Van' | 'Compact';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
  last_sign_in?: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  car_type: CarType;
  price_per_day: number;
  mileage_limit: number;
  fuel_policy: string;
  availability: boolean;
  image_urls: string[];
  color?: string;
  transmission?: string;
  fuel_type?: string;
  seats?: number;
  features?: string[];
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

// Extended types for joined queries
export interface BookingWithVehicle extends Booking {
  vehicle: Pick<Vehicle, 'brand' | 'model' | 'image_urls' | 'price_per_day'>;
}

export interface BookingWithDetails extends Booking {
  vehicle: Pick<Vehicle, 'brand' | 'model' | 'image_urls' | 'price_per_day' | 'car_type' | 'fuel_policy'>;
  user: Pick<User, 'name' | 'email' | 'phone'>;
}

// Database table names
export type Tables = {
  users: User;
  vehicles: Vehicle;
  bookings: Booking;
};

export interface BookingDocument {
  id: string;
  booking_id: string;
  document_type: string;
  document_url: string;
  uploaded_at: Date;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  payment_method: string;
  status: PaymentStatus;
  transaction_id: string;
  created_at: Date;
}

export interface Review {
  id: string;
  user_id: string;
  vehicle_id: string;
  rating: number;
  comment: string;
  created_at: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: Date;
}