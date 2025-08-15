import { Header } from './Header';
import { Navigation } from './Navigation';
import { useAppContext } from '../../hooks/useAppContext';
import type { ViewType } from '../../context/types';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { walletConnected, currentView, setCurrentView } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {walletConnected && (
        <Navigation 
          setCurrentView={setCurrentView as (view: ViewType) => void} 
          currentView={currentView as ViewType} 
        />
      )}
      <div className={walletConnected ? "ml-64" : ""}>
        {children}
      </div>
      
      {walletConnected && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Blockchain Connected</span>
          </div>
        </div>
      )}
    </div>
  );
};