import { useAppContext } from '../hooks/useAppContext';
import { FileText, Star, CheckCircle, Building, Wallet, Eye } from 'lucide-react';

export const LandingPage = () => {
  const { connectWallet, goToDemoMode } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <Building className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to RentTrust
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The first blockchain-based rental agreement and tenant reputation platform in Canada. 
            Create transparent, immutable rental records that build trust between landlords and tenants.
          </p>

          <div className="flex justify-center space-x-4 mb-16">
            <button
              onClick={connectWallet}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium flex items-center"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet to Get Started
            </button>
            <button 
              onClick={goToDemoMode}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium flex items-center"
            >
              <Eye className="h-5 w-5 mr-2" />
              View Demo
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex justify-center mb-4">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Contracts</h3>
              <p className="text-gray-600">
                Create rental agreements on the blockchain with automatic execution and transparent terms.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reputation System</h3>
              <p className="text-gray-600">
                Build and maintain your rental reputation with immutable reviews and payment history.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Records</h3>
              <p className="text-gray-600">
                All rental payments and agreements are recorded on the blockchain for complete transparency.
              </p>
            </div>
          </div>

          {/* Demo Section */}
          <div className="mt-20 bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How RentTrust Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Create Agreement</h3>
                <p className="text-gray-600 text-sm">Landlords create rental agreements with all terms on the blockchain</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Sign & Pay</h3>
                <p className="text-gray-600 text-sm">Both parties sign digitally and tenants make payments through smart contracts</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Build Reputation</h3>
                <p className="text-gray-600 text-sm">Both parties review each other, building immutable reputation scores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};