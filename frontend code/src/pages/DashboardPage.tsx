import { useAppContext } from '../hooks/useAppContext';
import { mockAgreements, mockReputation } from '../data/mockData';
import { FileText, Star, Users, Plus, Eye } from 'lucide-react';
import { StatsCard } from '../components/ui/StatsCard';
import { AgreementCard } from '../components/ui/AgreementCard';

export const DashboardPage = () => {
  const { userRole, currentUser } = useAppContext();
  
  const userAgreements = mockAgreements.filter(agreement => 
    userRole === 'landlord' 
      ? agreement.landlord === currentUser 
      : agreement.tenant === currentUser
  );

  const userReputation = mockReputation[currentUser || ''] || { averageRating: 0, totalRatings: 0 };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
        </h1>
        <p className="text-gray-600">Manage your rental agreements and reputation on the blockchain</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          icon={<FileText className="h-8 w-8 text-blue-600" />}
          title="Active Agreements"
          value={userAgreements.filter(a => a.status === 'active').length}
        />
        <StatsCard 
          icon={<Star className="h-8 w-8 text-yellow-500" />}
          title="Reputation Score"
          value={`${userReputation.averageRating.toFixed(1)}/5.0`}
        />
        <StatsCard 
          icon={<Users className="h-8 w-8 text-green-600" />}
          title="Total Reviews"
          value={userReputation.totalRatings}
        />
      </div>

      {/* Recent Agreements */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Agreements</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Agreement
            </button>
          </div>
        </div>
        <div className="divide-y">
          {userAgreements.slice(0, 3).map(agreement => (
            <AgreementCard key={agreement.id} agreement={agreement} userRole={userRole} />
          ))}
        </div>
      </div>
    </div>
  );
};