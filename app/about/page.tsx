export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
            About Techno Cars
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Your premier car rental service in Algeria, delivering excellence in every journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-white/80 leading-relaxed">
              To provide exceptional car rental services that exceed expectations, making every journey comfortable, safe, and memorable for our valued customers.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
            <p className="text-white/80 leading-relaxed">
              To become Algeria's leading car rental service, known for our premium fleet, innovative technology, and unmatched customer satisfaction.
            </p>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 mb-12">
          <h2 className="text-3xl font-playfair font-bold text-white mb-6 text-center">Our Story</h2>
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              Founded in the heart of Algeria, Techno Cars emerged from a passion for providing exceptional automotive experiences. 
              We recognized the need for a premium car rental service that combines cutting-edge technology with traditional Algerian hospitality.
            </p>
            <p>
              Our journey began with a simple vision: to make car rental seamless, transparent, and enjoyable. 
              Today, we proudly serve customers across Algeria with our diverse fleet of well-maintained vehicles, 
              from economy cars perfect for city exploration to luxury vehicles for special occasions.
            </p>
            <p>
              What sets us apart is our commitment to innovation and customer satisfaction. 
              We leverage modern technology to streamline the rental process while maintaining the personal touch that makes every interaction memorable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/70">Happy Customers</div>
            </div>
          </div>
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/70">Premium Vehicles</div>
            </div>
          </div>
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
