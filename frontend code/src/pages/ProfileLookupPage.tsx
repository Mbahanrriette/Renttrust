import { useState } from 'react';
import { mockReputation } from '../data/mockData';
import { Star, AlertCircle } from 'lucide-react';
import { ProfileCard } from '../components/ui/ProfileCard';

export const ProfileLookupPage = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [searchResult, setSearchResult] = useState<{
    address: string;
    averageRating: number;
    totalRatings: number;
    role: 'landlord' | 'tenant' | 'unknown';
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const reputation = mockReputation[searchAddress];
    if (reputation) {
      setSearchResult({ address: searchAddress, ...reputation });
    } else {
      setSearchResult({ 
        address: searchAddress, 
        averageRating: 0, 
        totalRatings: 0, 
        role: 'unknown' 
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile Lookup</h1>
        <p className="text-gray-600">Search for tenant or landlord reputation</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Search Profile</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex space-x-4">
            <input
              type="text"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter wallet address (0x...)"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>

          {searchResult && (
            <ProfileCard address={searchResult.address} reputation={searchResult} />
          )}
        </div>
      </div>
    </div>
  );
};