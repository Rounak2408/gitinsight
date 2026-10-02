import React, { useState } from 'react';
import { Settings, Database, Server, Key, Shield, CheckCircle2 } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/ui/Primitives';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';

export const SettingsPage: React.FC = () => {
  const { mockMode, setMockModeState } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [apiUrl, setApiUrl] = useState<string>('http://localhost:5000/api');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Platform Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Configure API connection parameters, mock data mode, and backend integration.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Mock Mode Switch Card */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Mock API Layer Mode</h3>
                <p className="text-xs text-slate-500">
                  Runs GitInsight with built-in high-fidelity mock data before the ASP.NET Core C# backend is connected.
                </p>
              </div>
            </div>

            <button
              onClick={() => setMockModeState(!mockMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                mockMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mockMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <span>Status: <strong className="text-slate-900 dark:text-white">{mockMode ? 'Mock Data Active (Offline Mode)' : 'ASP.NET Core Web API Live Mode'}</strong></span>
            <Badge variant={mockMode ? 'purple' : 'success'}>{mockMode ? 'Mock Mode' : 'Live API'}</Badge>
          </div>
        </Card>

        {/* Backend API Configuration */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <Server className="w-4 h-4 text-emerald-500" /> ASP.NET Core Backend API Endpoint
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="VITE_API_BASE_URL"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="http://localhost:5000/api"
              disabled={mockMode}
            />

            <Button type="submit" size="sm" icon={<CheckCircle2 className="w-4 h-4" />}>
              Save API Settings
            </Button>

            {saved && (
              <span className="text-xs text-emerald-500 font-semibold ml-3">Settings updated successfully!</span>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};
