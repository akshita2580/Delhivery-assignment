import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';
import { 
  LayoutDashboard, 
  Bot, 
  PlusCircle, 
  ListTodo, 
  BarChart3, 
  Map,
  Box,
  LogOut,
  Menu,
  X
} from 'lucide-react';

/**
 * Main Layout Component with Navigation
 * Fully responsive with mobile hamburger menu
 */
export const Layout = ({ children }) => {
  // ALL HOOKS MUST BE AT THE TOP - NO CONDITIONAL HOOKS
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated, user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Callbacks - defined with useCallback to avoid dependency issues
  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
    setIsSidebarOpen(false);
  }, [logout, navigate]);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    if (isAuthenticated) {
      closeSidebar();
    }
  }, [location.pathname, isAuthenticated, closeSidebar]);

  // Handle ESC key to close sidebar
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when sidebar is open on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, isAuthenticated, closeSidebar]);

  // Early return AFTER all hooks
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/bots', icon: Bot, label: 'Bot Status' },
    { path: '/tasks/allocate', icon: PlusCircle, label: 'Allocate Task' },
    { path: '/tasks/queue', icon: ListTodo, label: 'Task Queue' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/3d', icon: Box, label: '3D View' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Mobile Top Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isSidebarOpen}
            aria-controls="mobile-sidebar"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
          <h1 className="text-xl font-bold text-primary-600">Bot Manager</h1>
        </div>
        <p className="text-sm text-gray-500 truncate max-w-[120px]">
          {user?.name}
        </p>
      </nav>

      {/* Backdrop Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Navigation Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`
          fixed left-0 top-0 h-full bg-white shadow-lg z-50
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:z-10
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          w-[250px] md:w-64
        `}
        aria-label="Main navigation"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between md:block">
            <div>
              <h1 className="text-2xl font-bold text-primary-600">Bot Manager</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome, {user?.name}</p>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 p-4 md:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
};

