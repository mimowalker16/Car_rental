import { FormEvent, useState } from 'react';

interface VehicleFiltersProps {
  onFilter: (filters: {
    car_type?: string;
    min_price?: number;
    max_price?: number;
    available?: boolean;
  }) => void;
}

const carTypes = [
  'All',
  'Sedan',
  'SUV',
  'Sports',
  'Luxury',
  'Electric',
  'Van',
  'Compact'
];

export function VehicleFilters({ onFilter }: VehicleFiltersProps) {
  const [filters, setFilters] = useState({
    car_type: '',
    min_price: '',
    max_price: '',
    available: true
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilter({
      ...(filters.car_type && filters.car_type !== 'All' && { car_type: filters.car_type }),
      ...(filters.min_price && { min_price: Number(filters.min_price) }),
      ...(filters.max_price && { max_price: Number(filters.max_price) }),
      available: filters.available
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Car Type</label>
        <select
          value={filters.car_type}
          onChange={(e) => setFilters({ ...filters, car_type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {carTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Price</label>
          <input
            type="number"
            value={filters.min_price}
            onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            value={filters.max_price}
            onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="1000"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={filters.available}
          onChange={(e) => setFilters({ ...filters, available: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Show only available vehicles
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Apply Filters
      </button>
    </form>
  );
}