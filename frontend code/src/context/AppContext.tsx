import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppContextType } from './types';
import type { UserRole, ViewType } from './types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('userRole') as UserRole) || 'tenant';
  });
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('isDemoMode') === 'true';
  });
  const [currentView, setCurrentView] = useState<ViewType>('landing');

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('isDemoMode', String(isDemoMode));
  }, [userRole, isDemoMode]);

  const goToRoleSelection = () => setCurrentView('roleSelection');
  const goToDemoMode = () => {
    setIsDemoMode(true);
    setCurrentView('demoMode');
  };

  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      setTimeout(() => {
        setWalletConnected(true);
        setCurrentUser('0x742a4b6e4aB8f69c7438e2B8334B6A86C52c');
        setIsDemoMode(false);
        goToRoleSelection();
      }, 1000);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      walletConnected,
      setWalletConnected,
      currentUser,
      setCurrentUser,
      userRole,
      setUserRole,
      isDemoMode,
      setIsDemoMode,
      currentView,
      setCurrentView,
      connectWallet,
      goToRoleSelection,
      goToDemoMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};