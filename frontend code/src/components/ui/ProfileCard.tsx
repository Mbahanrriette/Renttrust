import { AlertCircle, Star } from 'lucide-react';
import type { Reputation } from '../../data/mockData';

interface ProfileCardProps {
  address: string;
  reputation: Reputation[string];
}

export const ProfileCard = ({ address, reputation }: ProfileCardProps) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Profile Found</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          reputation.role === 'landlord' ? 'bg-blue-100 text-blue-800' :
          reputation.role === 'tenant' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {reputation.role}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Address:</span>
          <span className="text-sm font-mono">
            {address.slice(0, 10)}...{address.slice(-8)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Average Rating:</span>
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(reputation.averageRating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-sm font-medium">
              {reputation.averageRating.toFixed(1)}/5.0
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Reviews:</span>
          <span className="font-medium">{reputation.totalRatings}</span>
        </div>
      </div>
      
      {reputation.totalRatings === 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800">No reviews found for this address</span>
          </div>
        </div>
      )}
    </div>
  );
};