import { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { mockAgreements } from '../data/mockData';
import { AgreementCard } from '../components/ui/AgreementCard';
import { PaymentModal } from '../components/PaymentModal';

export const AgreementsPage = () => {
  const { userRole, currentUser, isDemoMode } = useAppContext();
  const [selectedAgreement, setSelectedAgreement] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (userRole !== 'landlord') return null;

  const landlordAgreements = mockAgreements.filter(
    agreement => agreement.landlord === currentUser
  );

  const handlePayment = async (agreementId: number) => {
    if (isDemoMode) {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          console.log(`Demo payment for agreement ${agreementId}`);
          resolve();
        }, 1500);
      });
    }
    // TODO: Actual blockchain call
    return new Promise<void>(resolve => resolve());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={selectedAgreement ? 
          mockAgreements.find(a => a.id === selectedAgreement)?.monthlyRent || 0 
          : 0}
        onSubmit={() => selectedAgreement ? handlePayment(selectedAgreement) : Promise.resolve()}
        action="mark-paid"
      />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Agreements</h1>
        <p className="text-gray-600">
          {landlordAgreements.length} active agreements
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {landlordAgreements.map(agreement => (
          <AgreementCard 
            key={agreement.id} 
            agreement={agreement}
            onMarkPaid={() => {
              setSelectedAgreement(agreement.id);
              setShowPaymentModal(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};