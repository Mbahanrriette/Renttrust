import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateAgreementPage } from './pages/CreateAgreementPage';
import { AgreementsPage } from './pages/AgreementsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ProfileLookupPage } from './pages/ProfileLookupPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { DemoModePage } from './pages/DemoModePage';
import { useAppContext } from './hooks/useAppContext';
import { NotAuthorized } from './components/ui/NotAuthorized';

const ViewRenderer = () => {
  const { currentView, userRole } = useAppContext();

  switch (currentView) {
    case 'landing':
      return <LandingPage />;
    case 'roleSelection':
      return <RoleSelectionPage />;
    case 'demoMode':
      return <DemoModePage />;
    case 'dashboard':
      return <DashboardPage />;
    case 'create-agreement':
      return userRole === 'landlord' ? <CreateAgreementPage /> : <NotAuthorized />;
    case 'view-agreements':
      return userRole === 'landlord' ? <AgreementsPage /> : <NotAuthorized />;
    case 'reviews':
      return <ReviewsPage />;
    case 'profile-lookup':
      return <ProfileLookupPage />;
    default:
      return <LandingPage />;
  }
};

export const App = () => {
  return (
    <AppProvider>
      <Layout>
        <ViewRenderer />
      </Layout>
    </AppProvider>
  );
};