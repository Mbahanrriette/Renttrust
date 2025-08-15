import { useAppContext } from '../hooks/useAppContext';

export const RoleSelectionPage = () => {
  const { setUserRole, setCurrentView, isDemoMode } = useAppContext();

  const handleRoleSelect = (role: 'tenant' | 'landlord') => {
    setUserRole(role);
    setCurrentView(isDemoMode ? 'demoMode' : 'dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Select Your Role
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleRoleSelect('landlord')}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Landlord
          </button>
          <button
            onClick={() => handleRoleSelect('tenant')}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Tenant
          </button>
        </div>
      </div>
    </div>
  );
};