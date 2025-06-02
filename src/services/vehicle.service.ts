import { supabase } from '@/src/config/supabase';
import { Vehicle } from '@/src/types/database';

class VehicleService {
  async getVehicles(filters?: {
    available?: boolean;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    console.log('Fetching vehicles with filters:', filters);
    let query = supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters) {
      if (filters.available !== undefined) {
        query = query.eq('availability', filters.available);
      }
      if (filters.type) {
        query = query.eq('car_type', filters.type);
      }
      if (filters.minPrice !== undefined) {
        query = query.gte('price_per_day', filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte('price_per_day', filters.maxPrice);
      }
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
    console.log('Fetched vehicles:', data);
    return data;
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    console.log('Fetching vehicle by ID:', id);
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching vehicle by ID:', error);
      throw error;
    }
    console.log('Fetched vehicle:', data);
    return data;
  }

  async createVehicle(vehicleData: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicleData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateVehicle(
    id: string,
    vehicleData: Partial<Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>>
  ) {
    const { data, error } = await supabase
      .from('vehicles')
      .update(vehicleData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteVehicle(id: string) {
    // First, delete all images from storage
    const vehicle = await this.getVehicleById(id);
    if (vehicle.image_urls.length > 0) {
      for (const imageUrl of vehicle.image_urls) {
        const path = imageUrl.split('/').pop();
        if (path) {
          const { error } = await supabase.storage
            .from('vehicles')
            .remove([`vehicle-images/${path}`]);
          
          if (error) {
            console.error('Error deleting image:', error);
          }
        }
      }
    }

    // Then delete the vehicle record
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `vehicle-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('vehicles')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('vehicles')
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async deleteImage(imageUrl: string) {
    const path = imageUrl.split('/').pop();
    if (!path) throw new Error('Invalid image URL');

    const { error } = await supabase.storage
      .from('vehicles')
      .remove([`vehicle-images/${path}`]);

    if (error) throw error;
  }

  async searchVehicles(searchTerm: string) {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .or(`brand.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getAvailableVehicles(startDate: string, endDate: string) {
    // First get all vehicles
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('availability', true);

    if (vehiclesError) throw vehiclesError;

    // Then get all bookings that overlap with the requested period
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('vehicle_id, start_date, end_date')
      .not('status', 'eq', 'cancelled')
      .or(`start_date.lte.${endDate},end_date.gte.${startDate}`);

    if (bookingsError) throw bookingsError;

    // Filter out vehicles that have overlapping bookings
    const bookedVehicleIds = new Set(bookings.map(b => b.vehicle_id));
    return vehicles.filter(v => !bookedVehicleIds.has(v.id));
  }

  async getVehicleStats() {
    const { data: totalVehicles, error: totalError } = await supabase
      .from('vehicles')
      .select('availability', { count: 'exact' });

    const { data: availableVehicles, error: availableError } = await supabase
      .from('vehicles')
      .select('id', { count: 'exact' })
      .eq('availability', true);

    if (totalError || availableError) {
      throw new Error('Error fetching vehicle stats');
    }

    return {
      total: totalVehicles.length,
      available: availableVehicles.length,
      unavailable: totalVehicles.length - availableVehicles.length
    };
  }
}

export const vehicleService = new VehicleService();