import { Home, AppWindow, BarChart3, Inbox, RefreshCw, Settings, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Overview' },
    { path: '/apps', icon: AppWindow, label: 'Apps History' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/review', icon: Inbox, label: 'Review Queue' },
    { path: '/update', icon: RefreshCw, label: 'Update Center' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">UltraClaw</h1>
            <p className="text-xs text-gray-500">God-Mode 2026</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;