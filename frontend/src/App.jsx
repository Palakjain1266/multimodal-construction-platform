import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import JsonViewerModal from './components/JsonViewerModal';

// Pages
import DashboardOverview from './pages/DashboardOverview';
import SafetyAnalysis from './pages/SafetyAnalysis';
import CrackInspection from './pages/CrackInspection';
import ProjectPlanner from './pages/ProjectPlanner';
import PropertyValuation from './pages/PropertyValuation';
import DailySiteLog from './pages/DailySiteLog';
import WeatherAdvisory from './pages/WeatherAdvisory';
import KnowledgeChat from './pages/KnowledgeChat';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [backendOnline, setBackendOnline] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    data: null,
  });

  // Check backend health on mount and every 15s
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await api.getHealth();
        if (res && res.status === 'healthy') {
          setBackendOnline(true);
        }
      } catch {
        setBackendOnline(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const openJsonModal = (title, data) => {
    setModalState({
      isOpen: true,
      title,
      data,
    });
  };

  const closeJsonModal = () => {
    setModalState({
      isOpen: false,
      title: '',
      data: null,
    });
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'safety':
        return <SafetyAnalysis openJsonModal={openJsonModal} />;
      case 'crack':
        return <CrackInspection openJsonModal={openJsonModal} />;
      case 'planning':
        return <ProjectPlanner openJsonModal={openJsonModal} />;
      case 'valuation':
        return <PropertyValuation openJsonModal={openJsonModal} />;
      case 'sitelog':
        return <DailySiteLog openJsonModal={openJsonModal} />;
      case 'weather':
        return <WeatherAdvisory openJsonModal={openJsonModal} />;
      case 'chatbot':
        return <KnowledgeChat openJsonModal={openJsonModal} />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar backendOnline={backendOnline} openJsonModal={openJsonModal} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950/90">
          {renderActivePage()}
        </main>
      </div>

      <JsonViewerModal
        isOpen={modalState.isOpen}
        onClose={closeJsonModal}
        title={modalState.title}
        data={modalState.data}
      />
    </div>
  );
}
