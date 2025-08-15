import { useAppContext } from '../../hooks/useAppContext';
import { Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { Agreement } from '../../data/mockData';

interface AgreementCardProps {
  agreement: Agreement;
}

export const AgreementCard = ({ agreement }: AgreementCardProps) => {
  const { userRole, currentUser, isDemoMode } = useAppContext();

  const handleMarkPaid = () => {
    if (isDemoMode) {
      alert('In demo: Rent would be marked paid on blockchain\nTx hash: 0x...');
      return;
    }
    // TODO: Actual blockchain call
    alert(`Marking rent paid for agreement ${agreement.id}`);
  };

  const handlePayRent = () => {
    if (isDemoMode) {
      alert('In demo: Rent payment would be submitted on blockchain\nTx hash: 0x...');
      return;
    }
    // TODO: Actual blockchain call
    alert(`Paying rent for agreement ${agreement.id}`);
  };

  const isActive = agreement.status === 'active';
  const isLandlord = userRole === 'landlord';
  const isParty = currentUser === agreement.landlord || currentUser === agreement.tenant;

  return (
    <div className="p-6 hover:bg-gray-50 border-b">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{agreement.propertyAddress}</h3>
          <p className="text-sm text-gray-600">
            Monthly Rent: ${agreement.monthlyRent.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(agreement.startDate).toLocaleDateString()} - {agreement.lastPayment || 'No payments yet'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {agreement.status}
          </span>
        </div>
      </div>

      {isActive && isParty && (
        <div className="mt-4 flex space-x-3">
          {isLandlord ? (
            <button
              onClick={handleMarkPaid}
              className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark Paid
            </button>
          ) : (
            <button
              onClick={handlePayRent}
              className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
            >
              <Send className="h-4 w-4 mr-1" />
              Pay Rent
            </button>
          )}
          
          {agreement.lastPayment && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Last paid: {new Date(agreement.lastPayment).toLocaleDateString()}
            </div>
          )}
        </div>
      )}

      {isActive && !isParty && (
        <div className="mt-2 flex items-center text-sm text-yellow-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          You're not a party to this agreement
        </div>
      )}
    </div>
  );
};