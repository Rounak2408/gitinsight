import React, { useEffect, useState } from 'react';
import { History, GitCompare, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, Badge, Button, ProgressRing } from '../components/ui/Primitives';
import { historyApi } from '../services/api/gitInsightServices';
import { HistoricalAnalysis, ProfileComparison } from '../types';

export const HistoryPage: React.FC = () => {
  const [logs, setLogs] = useState<HistoricalAnalysis[]>([]);
  const [comparison, setComparison] = useState<ProfileComparison | null>(null);
  const [viewMode, setViewMode] = useState<'history' | 'compare'>('history');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';
    Promise.all([historyApi.getHistory(activeUser), historyApi.getComparison(activeUser)]).then(([hData, cData]) => {
      setLogs(hData);
      setComparison(cData);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analysis History & Profile Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Track historical repository scans and view before/after engineering growth metrics.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'history' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('history')}
            icon={<History className="w-3.5 h-3.5" />}
          >
            Analysis Log
          </Button>
          <Button
            variant={viewMode === 'compare' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('compare')}
            icon={<GitCompare className="w-3.5 h-3.5" />}
          >
            Before / After Comparison
          </Button>
        </div>
      </div>

      {viewMode === 'history' ? (
        <div className="space-y-4">
          {logs.map((log) => (
            <Card key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">{log.type.toUpperCase()}</Badge>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{log.targetName}</h3>
                </div>
                <p className="text-xs text-slate-500">{log.summary}</p>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <ProgressRing value={log.qualityScore} size={42} strokeWidth={4} />
                <Button size="sm" variant="outline">
                  View Scan Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        comparison && (
          <Card className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Profile Growth Comparison</h3>
                <p className="text-xs text-slate-500">Comparing {comparison.beforeDate} vs {comparison.afterDate}</p>
              </div>
              <Badge variant="success">Positive Growth</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                <span className="block text-xs uppercase font-bold text-emerald-800 dark:text-emerald-300">Quality Score</span>
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">+{comparison.qualityScoreDelta} pts</span>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800/50">
                <span className="block text-xs uppercase font-bold text-indigo-800 dark:text-indigo-300">Documentation</span>
                <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">+{comparison.docScoreDelta}%</span>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800/50">
                <span className="block text-xs uppercase font-bold text-purple-800 dark:text-purple-300">Job Fit Boost</span>
                <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">+{comparison.jobAlignmentDelta}%</span>
              </div>
              <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800/50">
                <span className="block text-xs uppercase font-bold text-sky-800 dark:text-sky-300">Repos Added</span>
                <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">+{comparison.reposAdded} Repos</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Newly Demonstrated Skills</h4>
              <div className="flex flex-wrap gap-2">
                {comparison.skillsGained.map((skill) => (
                  <Badge key={skill} variant="purple" className="px-3 py-1 text-xs">
                    + {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        )
      )}
    </div>
  );
};
