import { supabase } from '@/src/config/supabase';
import { Booking, BookingStatus, BookingWithVehicle, BookingWithDetails } from '@/src/types/database';

class BookingService {
  async createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'status'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...bookingData,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getBookingById(id: string): Promise<BookingWithDetails> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicle:vehicles (
          brand,
          model,
          image_urls,
          price_per_day,
          car_type,
          fuel_policy
        ),
        user:users (
          name,
          email,
          phone
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getUserBookings(userId: string): Promise<BookingWithVehicle[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicle:vehicles (
          brand,
          model,
          image_urls,
          price_per_day
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getAllBookings(status?: BookingStatus): Promise<BookingWithDetails[]> {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        vehicle:vehicles (
          brand,
          model,
          image_urls,
          price_per_day,
          car_type,
          fuel_policy
        ),
        user:users (
          name,
          email,
          phone
        )
      `)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  async updateBookingStatus(id: string, status: BookingStatus) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getVehicleBookings(vehicleId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .not('status', 'eq', 'cancelled')
      .or(`start_date.lte.${endDate},end_date.gte.${startDate}`);

    if (error) throw error;
    return data;
  }

  async cancelBooking(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUpcomingBookings(userId: string): Promise<BookingWithVehicle[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicle:vehicles (
          brand,
          model,
          image_urls,
          price_per_day
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'confirmed')
      .gte('start_date', today)
      .order('start_date');

    if (error) throw error;
    return data;
  }

  async getActiveBookings(userId: string): Promise<BookingWithVehicle[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicle:vehicles (
          brand,
          model,
          image_urls,
          price_per_day
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'confirmed')
      .lte('start_date', today)
      .gte('end_date', today);

    if (error) throw error;
    return data;
  }

  async getPastBookings(userId: string): Promise<BookingWithVehicle[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicle:vehicles (
          brand,
          model,
          image_urls,
          price_per_day
        )
      `)
      .eq('user_id', userId)
      .or(`status.eq.completed,and(status.eq.confirmed,end_date.lt.${today})`)
      .order('end_date', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getDashboardStats() {
    const { data: totalBookings, error: totalError } = await supabase
      .from('bookings')
      .select('status', { count: 'exact' });

    const { data: pendingBookings, error: pendingError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact' })
      .eq('status', 'pending');

    const { data: confirmedBookings, error: confirmedError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact' })
      .eq('status', 'confirmed');

    if (totalError || pendingError || confirmedError) {
      throw new Error('Error fetching dashboard stats');
    }

    return {
      total: totalBookings.length,
      pending: pendingBookings.length,
      confirmed: confirmedBookings.length
    };
  }
}

export const bookingService = new BookingService();