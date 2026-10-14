import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FolderGit2,
  Code2,
  Briefcase,
  FileText,
  Compass,
  Sparkles,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
  Bell,
  Command,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Database,
  Cpu,
  Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { CommandPalette } from '../ui/CommandPalette';
import { Badge, Button } from '../ui/Primitives';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  link: string;
  type: 'success' | 'sparkles' | 'info';
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Repository Analysis Ready',
    description: 'enterprise-cqrs-api score updated to 94%.',
    time: '10m ago',
    unread: true,
    link: '/repositories',
    type: 'success',
  },
  {
    id: '2',
    title: 'New Career Fit Match',
    description: 'Senior .NET Engineer matches your profile (94%).',
    time: '45m ago',
    unread: true,
    link: '/career',
    type: 'sparkles',
  },
  {
    id: '3',
    title: 'Code Evidence Verified',
    description: '18 technologies verified across 24 public repositories.',
    time: '2h ago',
    unread: true,
    link: '/skills',
    type: 'info',
  },
];

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('gitinsight_notifications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_NOTIFICATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('gitinsight_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = (id: string, link?: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    if (link) {
      setShowNotifications(false);
      navigate(link);
    }
  };

  const markAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const { user, mockMode, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'GitHub Analyzer', path: '/analyzer', icon: <Search className="w-4 h-4" /> },
    { label: 'Repositories', path: '/repositories', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'Skills Intelligence', path: '/skills', icon: <Code2 className="w-4 h-4" /> },
    { label: 'Job Fit Alignment', path: '/career', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'JD Analyzer', path: '/jd-analyzer', icon: <FileText className="w-4 h-4" /> },
    { label: 'Career Roadmap', path: '/roadmap', icon: <Compass className="w-4 h-4" /> },
    { label: 'Interview Prep', path: '/interview', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Executive Reports', path: '/reports', icon: <FileText className="w-4 h-4" /> },
    { label: 'Analysis History', path: '/history', icon: <History className="w-4 h-4" /> },
    { label: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* --- DESKTOP SIDEBAR --- */}
      <aside
        className={`hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-all duration-300 z-30 h-full flex-shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand logo header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800/80">
          <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 flex-shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  Git<span className="text-indigo-600 dark:text-indigo-400">Insight</span>
                </span>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">
                  Developer Intelligence
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatarUrl || `https://github.com/${localStorage.getItem('gitinsight_active_user') || 'rounak2408'}.png`}
                alt={user?.name}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate text-slate-900 dark:text-slate-100">{user?.name || localStorage.getItem('gitinsight_active_user') || 'rounak2408'}</p>
                <p className="text-[10px] text-slate-400 truncate">@{user?.githubUsername || localStorage.getItem('gitinsight_active_user') || 'rounak2408'}</p>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="text-slate-400 hover:text-rose-500 transition-colors p-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={() => setMobileOpen(false)} />
          <div className="relative flex-1 max-w-[280px] w-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-sm">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  Git<span className="text-indigo-600 dark:text-indigo-400">Insight</span>
                </span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={user?.avatarUrl || `https://github.com/${localStorage.getItem('gitinsight_active_user') || 'rounak2408'}.png`}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold truncate text-slate-900 dark:text-slate-100">{user?.name || localStorage.getItem('gitinsight_active_user') || 'rounak2408'}</p>
                  <p className="text-[10px] text-slate-400 truncate">@{user?.githubUsername || localStorage.getItem('gitinsight_active_user') || 'rounak2408'}</p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN BODY CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar Header */}
        <header className="h-16 flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-3 sm:px-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Command palette search trigger button */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-xs w-32 xs:w-44 sm:w-72"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="flex-1 text-left truncate">Search or CMD+K...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-[10px] font-mono border border-slate-200 dark:border-slate-700 text-slate-400">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Mock Mode Toggle Indicator Badge */}
            <Badge variant={mockMode ? 'purple' : 'success'} className="hidden sm:inline-flex text-[11px] cursor-pointer" onClick={() => navigate('/settings')}>
              <Database className="w-3 h-3" />
              {mockMode ? 'Mock Data Active' : 'Live GitHub API Active'}
            </Badge>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Notification popover button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <>
                  {/* Backdrop to close notification popover */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-4 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Notifications</span>
                        {unreadCount > 0 ? (
                          <Badge variant="purple">{unreadCount} New</Badge>
                        ) : (
                          <Badge variant="success">All Read</Badge>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 pt-3 max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="py-6 text-center text-slate-400">
                          <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-60" />
                          <p className="font-medium text-xs">No notifications</p>
                        </div>
                      ) : (
                        notifications.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => markAsRead(item.id, item.link)}
                            className={`flex items-start gap-3 p-2.5 rounded-lg transition-all cursor-pointer group ${
                              item.unread
                                ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 hover:bg-indigo-100/60 dark:hover:bg-indigo-950/70'
                                : 'bg-slate-50/50 dark:bg-slate-950/30 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                              {item.type === 'sparkles' && <Sparkles className="w-4 h-4 text-indigo-500" />}
                              {item.type === 'info' && <Info className="w-4 h-4 text-sky-500" />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <p className={`font-semibold truncate ${item.unread ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                  {item.title}
                                </p>
                                <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                              </div>
                              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mt-0.5">
                                {item.description}
                              </p>
                            </div>

                            {item.unread ? (
                              <button
                                title="Mark as read"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(item.id);
                                }}
                                className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0 mt-1.5 hover:scale-125 transition-transform"
                              />
                            ) : (
                              <span className="text-[10px] font-semibold text-emerald-500 shrink-0 mt-1">
                                Read
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Menu Trigger */}
            <img
              src={user?.avatarUrl || `https://github.com/${localStorage.getItem('gitinsight_active_user') || 'rounak2408'}.png`}
              alt={user?.name || 'User profile'}
              onClick={() => navigate('/settings')}
              className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 cursor-pointer object-cover hover:ring-2 hover:ring-indigo-500/50 transition-all"
            />
          </div>
        </header>

        {/* Main page content container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
};
