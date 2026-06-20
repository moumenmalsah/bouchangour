import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Menu,
  BookOpen,
  FileText,
  Calculator,
  Code,
  Microscope,
  Video,
  Calendar,
  Palette,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
  Key,
} from 'lucide-react';

const sidebarLinks = [
  { path: '/idaraton', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/idaraton/menu', label: 'Menu', icon: Menu },
  { type: 'divider' as const },
  { path: '/idaraton/courses', label: 'Courses', icon: BookOpen },
  { path: '/idaraton/exams', label: 'Exams', icon: FileText },
  { path: '/idaraton/exercices', label: 'Exercices', icon: Calculator },
  { path: '/idaraton/tools', label: 'Tools & Softwares', icon: Code },
  { path: '/idaraton/research', label: 'Research', icon: Microscope },
  { path: '/idaraton/videos', label: 'Videos', icon: Video },
  { path: '/idaraton/events', label: 'Events', icon: Calendar },
  { type: 'divider' as const },
  { path: '/idaraton/footer', label: 'Footer', icon: Palette },
  { type: 'divider' as const },
  { path: '/idaraton/change-password', label: 'Change Password', icon: Key },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    navigate('/idaraton/login', { replace: true });
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/idaraton/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          collapsed ? 'w-16' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <Link to="/idaraton" className="font-serif text-lg font-bold text-teal-700 truncate">
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarLinks.map((link, index) => {
            if ('type' in link) {
              return <div key={index} className="border-t border-gray-100 my-2" />;
            }
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-serif transition-colors ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={collapsed ? link.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          {!collapsed && (
            <>
              <Link to="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-teal-600 transition-colors">
                <ChevronLeft className="w-3 h-3" />
                Back to site
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-red-400 hover:text-red-600 transition-colors w-full">
                <LogOut className="w-3 h-3" />
                Logout
              </button>
            </>
          )}
        </div>
      </aside>

      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 h-16 flex items-center px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 mr-3"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-teal-700" />
            </div>
            <span className="font-serif text-sm font-semibold text-gray-700">
              Site Administration
            </span>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
