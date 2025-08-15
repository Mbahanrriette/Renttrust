import { useAppContext } from '../hooks/useAppContext';

export const DemoModePage = () => {
  const { userRole, setCurrentView } = useAppContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Demo Mode: {userRole}
        </h2>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Continue to Dashboard
        </button>
        <button
          onClick={() => setCurrentView('roleSelection')}
          className="group relative w-full flex justify-center py-4 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Switch Role
        </button>
      </div>
    </div>
  );
};