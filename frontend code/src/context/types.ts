export type UserRole = 'tenant' | 'landlord';
export type ViewType = 'landing' | 'dashboard' | 'create-agreement' | 'view-agreements' | 'reviews' | 'profile-lookup';

export interface AppContextType {
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
  currentUser: string | null;
  setCurrentUser: (user: string | null) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  connectWallet: () => Promise<void>;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}