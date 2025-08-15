import { useState } from 'react';
import { CheckCircle, X, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSubmit: () => Promise<void>;
  action: 'pay' | 'mark-paid';
}

export const PaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  onSubmit,
  action
}: PaymentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit();
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {action === 'pay' ? 'Pay Rent' : 'Mark Rent Paid'}
          </h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium">
              {action === 'pay' 
                ? 'Payment Successful!' 
                : 'Rent Marked Paid!'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                {action === 'pay' 
                  ? `You are about to pay $${amount} for rent.`
                  : `Confirm that $${amount} rent has been paid.`}
              </p>
              <p className="text-sm text-gray-500">
                This action will be recorded on the blockchain.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  action === 'pay' ? 'Confirm Payment' : 'Confirm'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};