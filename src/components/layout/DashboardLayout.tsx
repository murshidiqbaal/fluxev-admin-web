
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative">
      <Sidebar />
      <div className="flex-col flex-1 flex w-full min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
