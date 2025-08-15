import { FileText, Plus, Home, Star, Users } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import type { ViewType } from '../../context/types';

interface NavigationProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

export const Navigation = ({ currentView, setCurrentView }: NavigationProps) => {
  const { userRole } = useAppContext();

  return (
    <nav className="bg-gray-50 border-r min-h-screen w-64 fixed left-0 top-16 z-10">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center px-3 py-2 text-left rounded-lg ${
                currentView === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </button>
          </li>
          
          {userRole === 'landlord' && (
            <>
              <li>
                <button
                  onClick={() => setCurrentView('create-agreement')}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg ${
                    currentView === 'create-agreement'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Plus className="h-5 w-5 mr-3" />
                  Create Agreement
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('view-agreements')}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg ${
                    currentView === 'view-agreements'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  View Agreements
                </button>
              </li>
            </>
          )}
          
          <li>
            <button
              onClick={() => setCurrentView('reviews')}
              className={`w-full flex items-center px-3 py-2 text-left rounded-lg ${
                currentView === 'reviews'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Star className="h-5 w-5 mr-3" />
              Reviews
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('profile-lookup')}
              className={`w-full flex items-center px-3 py-2 text-left rounded-lg ${
                currentView === 'profile-lookup'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Profile Lookup
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};