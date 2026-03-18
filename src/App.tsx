import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from '@/features/auth/LoginPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
import StationsPage from '@/features/stations/StationsPage';
import ConnectorsPage from '@/features/connectors/ConnectorsPage';
import ChargingSessionsPage from '@/features/sessions/ChargingSessionsPage';
import UsersPage from '@/features/users/UsersPage';
import WalletsPage from '@/features/wallets/WalletsPage';
import TransactionsPage from '@/features/wallets/TransactionsPage';
import AnalyticsPage from '@/features/analytics/AnalyticsPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="stations" element={<StationsPage />} />
          <Route path="connectors" element={<ConnectorsPage />} />
          <Route path="sessions" element={<ChargingSessionsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="wallets" element={<WalletsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
