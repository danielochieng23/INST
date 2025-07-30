import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, Shield, Clock, MapPin, Heart, Users, Zap } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = formData.get('location') as string;
    const service = formData.get('service') as string;
    
    navigate(`/search?location=${encodeURIComponent(location)}&service=${encodeURIComponent(service)}`);
  };

  const categories = [
    { name: 'Massage', icon: '💆', count: '2,345', color: 'bg-blue-100 text-blue-800' },
    { name: 'Escort', icon: '👥', count: '1,876', color: 'bg-purple-100 text-purple-800' },
    { name: 'Outcall', icon: '🚗', count: '1,234', color: 'bg-green-100 text-green-800' },
    { name: 'Companionship', icon: '🤝', count: '987', color: 'bg-pink-100 text-pink-800' },
    { name: 'Therapy', icon: '🧘', count: '654', color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Entertainment', icon: '🎭', count: '432', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const featuredProfiles = [
    {
      id: 1,
      name: 'Sophia',
      age: 26,
      location: 'New York, NY',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      services: ['Massage', 'Companionship'],
      verified: true,
    },
    {
      id: 2,
      name: 'Isabella',
      age: 29,
      location: 'Los Angeles, CA',
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      services: ['Escort', 'Entertainment'],
      verified: true,
    },
    {
      id: 3,
      name: 'Emma',
      age: 24,
      location: 'Miami, FL',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      services: ['Therapy', 'Outcall'],
      verified: true,
    },
  ];

  const testimonials = [
    {
      name: 'Michael R.',
      location: 'Chicago, IL',
      rating: 5,
      text: 'Exceptional service and professionalism. The platform made it easy to find exactly what I was looking for.',
    },
    {
      name: 'David K.',
      location: 'Seattle, WA',
      rating: 5,
      text: 'Safe, secure, and discreet. Great experience overall with excellent customer support.',
    },
    {
      name: 'James L.',
      location: 'Boston, MA',
      rating: 5,
      text: 'High-quality providers and a user-friendly platform. Highly recommend to others.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Premium Services
              <br />
              <span className="text-primary-200">Near You</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Connect with verified, professional service providers in a safe and secure environment
            </p>
          </div>

          {/* Hero Search */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter city or zip code"
                    className="input-field"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <select name="service" className="input-field">
                    <option value="">All Services</option>
                    <option value="massage">Massage</option>
                    <option value="escort">Escort</option>
                    <option value="outcall">Outcall</option>
                    <option value="companionship">Companionship</option>
                    <option value="therapy">Therapy</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
                <div className="md:col-span-1 flex items-end">
                  <button
                    type="submit"
                    className="w-full btn-primary h-12 text-lg font-semibold flex items-center justify-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">All providers are thoroughly verified for your safety and peace of mind.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Available</h3>
              <p className="text-gray-600">Find services available around the clock to fit your schedule.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discreet & Secure</h3>
              <p className="text-gray-600">Your privacy is our priority with encrypted communications and secure payments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Discover the perfect service for your needs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/search?service=${encodeURIComponent(category.name.toLowerCase())}`}
                className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                  {category.name}
                </h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                  {category.count} providers
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Providers</h2>
            <p className="text-xl text-gray-600">Top-rated professionals in your area</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProfiles.map((profile) => (
              <Link
                key={profile.id}
                to={`/profile/${profile.id}`}
                className="card overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {profile.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {profile.name}, {profile.age}
                    </h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{profile.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-500">{profile.reviews} reviews</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/search" className="btn-primary text-lg px-8 py-3">
              View All Providers
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust Rubica for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Services
            </Link>
            <Link to="/auth?mode=signup&role=provider" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};