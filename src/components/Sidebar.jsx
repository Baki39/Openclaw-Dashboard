import { useState, useEffect } from 'react';
import { Home, AppWindow, BarChart3, Inbox, RefreshCw, Settings, Sparkles, ChevronLeft, ChevronRight, Rocket, FileCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  const navItems = [
    { path: '/', icon: Home, label: 'Overview' },
    { path: '/app-review', icon: FileCheck, label: 'Review App', highlight: true },
    { path: '/apps', icon: AppWindow, label: 'Apps History' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/review', icon: Inbox, label: 'Review Queue' },
    { path: '/update', icon: RefreshCw, label: 'Update Center' },
    { path: '/setup', icon: Rocket, label: 'Setup Wizard' },
  ];

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    setCollapsed(newState);
  };

  return (
    <aside 
      className="fixed left-0 top-0 h-screen bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col z-50 transition-all duration-300"
      style={{ width: isCollapsed ? '5rem' : '16rem' }}
    >
      {/* Logo */}
      <div className={`p-4 border-b border-[#2a2a2a] flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">UltraClaw</h1>
              <p className="text-xs text-gray-500">God-Mode 2026</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? item.highlight 
                    ? 'bg-gradient-to-r from-green-500 to-indigo-500 text-white'
                    : 'bg-indigo-500/20 text-indigo-400'
                  : item.highlight
                    ? 'text-green-400 hover:bg-green-500/10'
                    : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-green-400' : 'group-hover:text-white'}`} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <button 
          title={isCollapsed ? 'Settings' : undefined}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-all ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;