import Link from 'next/link';
import { VehicleCard } from '@/src/components/features/vehicles/VehicleCard';
import { vehicleService } from '@/src/services/vehicle.service';

export const revalidate = 3600; // Revalidate every hour

async function HomePage() {
  const featuredVehicles = await vehicleService.getVehicles({ available: true });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
              Your Journey Begins Here
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              Discover our wide range of premium vehicles for any occasion. From luxury cars to economy options,
              we have the perfect ride for your extraordinary journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vehicles"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Browse All Vehicles
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-lg font-semibold rounded-2xl transition-all duration-300 border border-white/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
              Featured Vehicles
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Handpicked premium vehicles for the discerning traveler
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.slice(0, 6).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-purple-900/30 to-blue-900/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Experience excellence in every aspect of our service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">24/7 Support</h3>
                <p className="text-white/70 leading-relaxed">Round-the-clock customer support for your peace of mind</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Quality Guaranteed</h3>
                <p className="text-white/70 leading-relaxed">All our vehicles are regularly maintained and inspected</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Flexible Payment</h3>
                <p className="text-white/70 leading-relaxed">Multiple payment options for your convenience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
