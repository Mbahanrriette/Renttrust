import { useState } from 'react';

interface ReviewFormProps {
  onSubmit: (formData: {
    revieweeAddress: string;
    rating: number;
    comment: string;
  }) => void;
  onCancel: () => void;
}

export const ReviewForm = ({ onSubmit, onCancel }: ReviewFormProps) => {
  const [reviewForm, setReviewForm] = useState({
    revieweeAddress: '',
    rating: 5,
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reviewForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address to Review
        </label>
        <input
          type="text"
          value={reviewForm.revieweeAddress}
          onChange={(e) => setReviewForm({...reviewForm, revieweeAddress: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0x..."
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <select
          value={reviewForm.rating}
          onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[5,4,3,2,1].map(num => (
            <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comment
        </label>
        <textarea
          value={reviewForm.comment}
          onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Share your experience..."
          required
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};