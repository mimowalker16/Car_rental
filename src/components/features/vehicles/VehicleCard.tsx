import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/src/types/database';
import { memo } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
  showBookButton?: boolean;
}

export const VehicleCard = memo(function VehicleCard({ vehicle, showBookButton = true }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={vehicle.image_urls[0] || '/placeholder-car.jpg'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj84MTY3ODYxSUJWRz5PRlVeVkFmXV1zcmtLT1RchGRtdnBwcHD/2wBDARUXFyAeIBshIW0mHyYxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {vehicle.brand} {vehicle.model}
        </h3>
        <p className="text-sm text-gray-500">{vehicle.year}</p>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-lg font-bold text-blue-600">
            ${vehicle.price_per_day}/day
          </p>
          <span className={`px-2 py-1 rounded-full text-sm ${
            vehicle.availability 
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {vehicle.availability ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Type:</span> {vehicle.car_type}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Mileage Limit:</span> {vehicle.mileage_limit}km/day
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Fuel Policy:</span> {vehicle.fuel_policy}
          </p>
        </div>
        {showBookButton && vehicle.availability && (
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="mt-4 w-full block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details & Book
          </Link>
        )}
      </div>
    </div>
  );
});