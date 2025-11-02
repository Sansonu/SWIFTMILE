
import React, { useState } from 'react';
import { UserRole } from './types';
import { TruckIcon, UserCircleIcon, BriefcaseIcon, CogIcon } from './components/icons';
import ShipperDashboard from './components/ShipperDashboard';
import AdminDashboard from './components/AdminDashboard';
import AgentView from './components/AgentView';
import PartnerDashboard from './components/PartnerDashboard';

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.MSME_SHIPPER);

  const renderContent = () => {
    switch (activeRole) {
      case UserRole.MSME_SHIPPER:
        return <ShipperDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.DELIVERY_AGENT:
        return <AgentView />;
      case UserRole.CARRIER_PARTNER:
        return <PartnerDashboard />;
      default:
        return <ShipperDashboard />;
    }
  };
  
  // FIX: Changed icon type from JSX.Element to React.ReactElement to avoid global namespace issues.
  const NavButton: React.FC<{ role: UserRole; label: string; icon: React.ReactElement }> = ({ role, label, icon }) => (
    <button
      onClick={() => setActiveRole(role)}
      className={`flex flex-col items-center justify-center space-y-1 w-full md:w-auto md:flex-row md:space-y-0 md:space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
        activeRole === role
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
      }`}
    >
      {icon}
      <span className="text-xs md:text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <TruckIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              SwiftMile <span className="text-blue-600">AI</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2 p-1 bg-gray-200 rounded-lg">
             <NavButton role={UserRole.MSME_SHIPPER} label="Shipper" icon={<UserCircleIcon className="w-5 h-5" />} />
             <NavButton role={UserRole.DELIVERY_AGENT} label="Agent" icon={<BriefcaseIcon className="w-5 h-5" />} />
             <NavButton role={UserRole.ADMIN} label="Admin" icon={<CogIcon className="w-5 h-5" />} />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6">
        {renderContent()}
      </main>

       <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} SwiftMile AI Logistics. Powering India's MSMEs.</p>
      </footer>
    </div>
  );
};

export default App;