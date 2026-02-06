
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DoctorCard from './components/DoctorCard';
import TriageAssistant from './components/TriageAssistant';
import ProjectSpecs from './components/ProjectSpecs';
import AppointmentManager from './components/AppointmentManager';
import { MOCK_DOCTORS } from './constants.tsx';
import { Doctor } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'doctors':
        const filteredDocs = MOCK_DOCTORS.filter(d => 
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Available Specialists</h2>
              <div className="relative w-72">
                <input 
                  type="text" 
                  placeholder="Search specialty or doctor..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <span className="absolute right-3 top-2.5 opacity-30">🔍</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredDocs.length > 0 ? (
                filteredDocs.map(doc => (
                  <DoctorCard 
                    key={doc.id} 
                    doctor={doc} 
                    onBook={(d) => alert(`Booking flow for ${d.name} initiated!`)} 
                  />
                ))
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                    <p className="text-slate-400">No doctors found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'triage':
        return <TriageAssistant />;
      case 'specs':
        return <ProjectSpecs />;
      case 'appointments':
        return <AppointmentManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 capitalize">{activeTab}</h1>
            <p className="text-slate-500">Welcome back, Admin Panel</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white rounded-full border border-slate-200 text-xl hover:bg-slate-50 relative">
                🔔 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">A</div>
              <span className="text-sm font-semibold text-slate-700">Akash M.</span>
            </div>
          </div>
        </header>
        
        <div className="animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
