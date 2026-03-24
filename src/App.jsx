import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AppsHistory from './pages/AppsHistory';
import Analytics from './pages/Analytics';
import ReviewQueue from './pages/ReviewQueue';
import UpdateCenter from './pages/UpdateCenter';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#0f0f0f]">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apps" element={<AppsHistory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/review" element={<ReviewQueue />} />
            <Route path="/update" element={<UpdateCenter />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;