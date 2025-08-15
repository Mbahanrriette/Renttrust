import { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { mockReviews } from '../data/mockData';
import { Plus, Star } from 'lucide-react';
import { ReviewForm } from '../components/forms/ReviewForm';
import { ReviewCard } from '../components/ui/ReviewCard';

export const ReviewsPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const handleSubmitReview = (formData: {
    revieweeAddress: string;
    rating: number;
    comment: string;
  }) => {
    console.log('Submitting review:', formData);
    alert('Review submitted successfully! (Demo)');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reviews & Reputation</h1>
        <p className="text-gray-600">Submit and view reviews for tenants and landlords</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Review */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Submit Review</h2>
            </div>
            <div className="p-6">
              {!showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Write Review
                </button>
              ) : (
                <ReviewForm 
                  onSubmit={handleSubmitReview} 
                  onCancel={() => setShowReviewForm(false)} 
                />
              )}
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
            </div>
            <div className="divide-y">
              {mockReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};