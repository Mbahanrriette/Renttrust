import { AgreementForm } from '../components/forms/AgreementForm';
import { Plus } from 'lucide-react';

export const CreateAgreementPage = () => {
  const handleSubmit = (formData: {
    tenantAddress: string;
    propertyAddress: string;
    monthlyRent: string;
    securityDeposit: string;
    leaseStartDate: string;
    leaseDuration: string;
  }) => {
    console.log('Creating agreement:', formData);
    alert('Agreement created successfully! (Demo)');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Create New Rental Agreement</h2>
          <p className="text-sm text-gray-600">Create a new rental agreement on the blockchain</p>
        </div>
        
        <div className="p-6">
          <AgreementForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};