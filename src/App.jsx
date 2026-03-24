import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AppsHistory from './pages/AppsHistory';
import Analytics from './pages/Analytics';
import ReviewQueue from './pages/ReviewQueue';
import UpdateCenter from './pages/UpdateCenter';
import SetupWizard from './pages/SetupWizard';
import AppReview from './pages/AppReview';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) {
      setCollapsed(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (newCollapsed) => {
    setCollapsed(newCollapsed);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed));
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-[#0f0f0f]">
        <Sidebar collapsed={collapsed} setCollapsed={handleToggle} />
        <main 
          className="flex-1 transition-all duration-300 overflow-x-hidden pb-24"
          style={{ 
            marginLeft: collapsed ? '5rem' : '16rem',
            minWidth: collapsed ? 'calc(100% - 5rem)' : 'calc(100% - 16rem)'
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apps" element={<AppsHistory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/review" element={<ReviewQueue />} />
            <Route path="/update" element={<UpdateCenter />} />
            <Route path="/setup" element={<SetupWizard />} />
            <Route path="/app-review" element={<AppReview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;