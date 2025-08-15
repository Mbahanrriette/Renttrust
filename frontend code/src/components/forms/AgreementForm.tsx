import { useState } from 'react';

interface AgreementFormProps {
  onSubmit: (formData: {
    tenantAddress: string;
    propertyAddress: string;
    monthlyRent: string;
    securityDeposit: string;
    leaseStartDate: string;
    leaseDuration: string;
  }) => void;
}

export const AgreementForm = ({ onSubmit }: AgreementFormProps) => {
  const [formData, setFormData] = useState({
    tenantAddress: '',
    propertyAddress: '',
    monthlyRent: '',
    securityDeposit: '',
    leaseStartDate: '',
    leaseDuration: '12'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tenant Wallet Address
        </label>
        <input
          type="text"
          value={formData.tenantAddress}
          onChange={(e) => setFormData({...formData, tenantAddress: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0x..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Address
        </label>
        <input
          type="text"
          value={formData.propertyAddress}
          onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="123 Main Street, Toronto, ON"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Rent (CAD)
          </label>
          <input
            type="number"
            value={formData.monthlyRent}
            onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Deposit (CAD)
          </label>
          <input
            type="number"
            value={formData.securityDeposit}
            onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2000"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lease Start Date
          </label>
          <input
            type="date"
            value={formData.leaseStartDate}
            onChange={(e) => setFormData({...formData, leaseStartDate: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lease Duration (Months)
          </label>
          <select
            value={formData.leaseDuration}
            onChange={(e) => setFormData({...formData, leaseDuration: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="6">6 months</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Agreement
        </button>
      </div>
    </form>
  );
};