import { Star } from 'lucide-react';
import type { Review } from '../../data/mockData';

export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {review.rating}/5
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700 mb-2">{review.comment}</p>
      <div className="text-sm text-gray-500">
        From: {review.reviewer.slice(0, 6)}...{review.reviewer.slice(-4)}
      </div>
    </div>
  );
};