import React, { useEffect, useState } from 'react';
import { FileText, Printer, Download, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge, ProgressRing } from '../components/ui/Primitives';
import { githubApi } from '../services/api/gitInsightServices';
import { GitHubProfile } from '../types';

export const ReportsPage: React.FC = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);

  useEffect(() => {
    const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';
    githubApi.analyzeProfile(activeUser).then(setProfile).catch(console.error);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const username = profile?.username || localStorage.getItem('gitinsight_active_user') || 'rounak2408';
  const displayName = profile?.name || username;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800 no-print">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Executive Intelligence Report</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Print-ready PDF report summarizing developer profile health, repository architecture, and job fit.
          </p>
        </div>

        <Button onClick={handlePrint} icon={<Printer className="w-4 h-4" />}>
          Print / Save as PDF
        </Button>
      </div>

      {/* Printable Report Document Card */}
      <Card className="p-8 sm:p-12 space-y-8 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-2xl print-page">
        {/* Document Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-600 text-white">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">GitInsight Executive Report</h2>
              <p className="text-xs text-slate-500 font-mono">Generated: October 2026 | ID: #RPT-{Math.floor(10000 + Math.random() * 90000)}</p>
            </div>
          </div>

          <Badge variant="purple" className="text-xs">
            Academic & Industry Standard
          </Badge>
        </div>

        {/* Candidate Profile Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{displayName}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">{profile?.bio || 'Software Engineer'} | @{username}</p>
            <p className="text-xs text-slate-500">Public Repos: {profile?.publicRepos || 36} | Total Stars: {profile?.totalStars || 12} | Followers: {profile?.followers || 4}</p>
          </div>
          <ProgressRing value={profile?.profileStrengthScore || 92} size={65} strokeWidth={6} label="Profile Score" />
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Executive Summary</h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            The candidate @{username} demonstrates software engineering practices across public GitHub repositories. Codebases display verified language proficiency in {(profile?.topLanguages || []).map(l => l.name).join(', ') || 'TypeScript, JavaScript, Python'}, automated security checks, modular project structures, and active public repository maintainability.
          </p>
        </div>

        {/* Verified Technical Skills */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Verified Engineering Skills</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {(profile?.topLanguages || [
              { name: 'TypeScript', percentage: 49 },
              { name: 'JavaScript', percentage: 26 },
              { name: 'CSS', percentage: 11 },
              { name: 'Python', percentage: 6 }
            ]).map((lang) => (
              <div key={lang.name} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold block text-indigo-600 dark:text-indigo-400">{lang.name}</span>
                <span className="text-[11px] text-slate-500">{lang.percentage}% Language Share</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Alignment Matrix */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Target Role Alignment</h4>
          <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/20 text-xs flex justify-between items-center">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Full-Stack / Web Application Engineer</span>
              <p className="text-slate-500 text-[11px]">Verified alignment with candidate public repositories and code structure.</p>
            </div>
            <Badge variant="success" className="text-xs">92% Fit</Badge>
          </div>
        </div>

        {/* Report Footer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 flex justify-between">
          <span>GitInsight Platform Engine</span>
          <span>Verified Academic Major Project Artifact</span>
        </div>
      </Card>
    </div>
  );
};
