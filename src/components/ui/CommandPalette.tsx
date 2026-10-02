import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderGit2, Sparkles, Code2, Briefcase, FileText, Settings, History, X } from 'lucide-react';
import { Badge } from './Primitives';

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled externally or passed via state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { label: 'Overview Dashboard', category: 'Navigation', path: '/dashboard', icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
    { label: 'GitHub Profile Analyzer', category: 'Tools', path: '/analyzer', icon: <Search className="w-4 h-4 text-emerald-400" /> },
    { label: 'Repository Catalog & Code Intel', category: 'Repositories', path: '/repositories', icon: <FolderGit2 className="w-4 h-4 text-sky-400" /> },
    { label: 'Developer Skill Intelligence', category: 'Skills', path: '/skills', icon: <Code2 className="w-4 h-4 text-purple-400" /> },
    { label: 'Career Alignment & Job Fit', category: 'Career', path: '/career', icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
    { label: 'Job Description Analyzer', category: 'Career', path: '/jd-analyzer', icon: <FileText className="w-4 h-4 text-rose-400" /> },
    { label: 'Career Roadmap & Skill Gaps', category: 'Career', path: '/roadmap', icon: <History className="w-4 h-4 text-indigo-400" /> },
    { label: 'Interview Preparation & Mock Interview', category: 'Interview', path: '/interview', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
    { label: 'Executive Report Generator', category: 'Reports', path: '/reports', icon: <FileText className="w-4 h-4 text-sky-400" /> },
    { label: 'Platform Settings & Backend API Mode', category: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4 text-slate-400" /> },
  ];

  const filteredCommands = commands.filter(
    (cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search commands, repositories, skills, jobs, or pages... (ESC to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, i) => (
              <button
                key={i}
                onClick={() => handleSelect(cmd.path)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs hover:bg-indigo-950/60 hover:text-indigo-200 transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  {cmd.icon}
                  <span className="font-medium text-slate-200 group-hover:text-white">{cmd.label}</span>
                </div>
                <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-800">
                  {cmd.category}
                </Badge>
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">No matching commands found.</div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">↑</kbd>{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">↓</kbd> to navigate
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
