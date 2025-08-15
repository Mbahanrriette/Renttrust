import { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Wallet, Menu, X, Building } from 'lucide-react';

export const Header = () => {
  const { walletConnected, userRole, setUserRole, connectWallet, currentUser } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">RentTrust</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="#agreements" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Agreements
            </a>
            <a href="#reviews" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Reviews
            </a>
            <a href="#profile" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Profile
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {!walletConnected ? (
              <button
                onClick={connectWallet}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as 'tenant' | 'landlord')}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </select>
                <div className="text-sm">
                  <div className="text-gray-600">Connected</div>
                  <div className="text-xs text-gray-500">
                    {currentUser?.slice(0, 6)}...{currentUser?.slice(-4)}
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};