import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid, List, Star, MapPin, Shield, DollarSign, Clock } from 'lucide-react';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  
  const location = searchParams.get('location') || '';
  const service = searchParams.get('service') || '';

  // Mock data - replace with API call
  const [providers] = useState([
    {
      id: 1,
      name: 'Sophia',
      age: 26,
      location: 'New York, NY',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      services: ['Massage', 'Companionship'],
      price: '$200-300/hr',
      availability: 'Available Now',
      verified: true,
      distance: '2.3 miles',
      languages: ['English', 'Spanish'],
    },
    {
      id: 2,
      name: 'Isabella',
      age: 29,
      location: 'New York, NY',
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      services: ['Escort', 'Entertainment'],
      price: '$300-400/hr',
      availability: 'Available Today',
      verified: true,
      distance: '3.1 miles',
      languages: ['English', 'French'],
    },
    {
      id: 3,
      name: 'Emma',
      age: 24,
      location: 'New York, NY',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      services: ['Therapy', 'Outcall'],
      price: '$150-250/hr',
      availability: 'Available Tomorrow',
      verified: true,
      distance: '4.5 miles',
      languages: ['English'],
    },
    {
      id: 4,
      name: 'Olivia',
      age: 27,
      location: 'New York, NY',
      rating: 4.7,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      services: ['Massage', 'Therapy'],
      price: '$180-280/hr',
      availability: 'Available Now',
      verified: true,
      distance: '1.8 miles',
      languages: ['English', 'Italian'],
    },
  ]);

  const [filters, setFilters] = useState({
    priceRange: '',
    serviceType: service,
    gender: '',
    rating: '',
    language: '',
    availability: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const ProviderCard: React.FC<{ provider: any; viewMode: 'grid' | 'list' }> = ({ provider, viewMode }) => {
    if (viewMode === 'list') {
      return (
        <Link to={`/profile/${provider.id}`} className="card p-6 hover:shadow-lg transition-shadow">
          <div className="flex space-x-6">
            <div className="relative flex-shrink-0">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              {provider.verified && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                  <Shield className="w-4 h-4" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {provider.name}, {provider.age}
                </h3>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                    <span className="text-sm text-gray-500">({provider.reviews})</span>
                  </div>
                  <p className="text-lg font-semibold text-primary-600">{provider.price}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{provider.location} • {provider.distance}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {provider.services.map((service: string) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{provider.availability}</span>
                  </div>
                  <span>Languages: {provider.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    }

    return (
      <Link to={`/profile/${provider.id}`} className="card overflow-hidden hover:shadow-xl transition-shadow group">
        <div className="relative">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {provider.verified && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Verified</span>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
            {provider.distance}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {provider.name}, {provider.age}
            </h3>
            <div className="flex items-center space-x-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{provider.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {provider.services.map((service: string) => (
              <span
                key={service}
                className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-primary-600">{provider.price}</p>
            <p className="text-sm text-gray-500">{provider.reviews} reviews</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {location && service ? `${service} services in ${location}` : 
             location ? `Services in ${location}` :
             service ? `${service} services` :
             'All services'}
            {' • '}
            <span className="font-medium">{providers.length} providers found</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any Price</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200-300">$200 - $300</option>
                    <option value="300-400">$300 - $400</option>
                    <option value="400+">$400+</option>
                  </select>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <select
                    value={filters.serviceType}
                    onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Services</option>
                    <option value="massage">Massage</option>
                    <option value="escort">Escort</option>
                    <option value="outcall">Outcall</option>
                    <option value="companionship">Companionship</option>
                    <option value="therapy">Therapy</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => handleFilterChange('language', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any Language</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="italian">Italian</option>
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Anytime</option>
                    <option value="now">Available Now</option>
                    <option value="today">Available Today</option>
                    <option value="week">Available This Week</option>
                  </select>
                </div>
              </div>

              <button className="w-full btn-primary mt-6">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Provider Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} viewMode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 bg-primary-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};