import React, { useEffect, useState } from 'react';
import { Briefcase, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Card, Badge, MatchIndicator, Button } from '../components/ui/Primitives';
import { jobApi } from '../services/api/gitInsightServices';
import { JobMatch } from '../types';

export const CareerFitPage: React.FC = () => {
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';
    jobApi.getJobMatches(activeUser).then((data) => {
      setMatches(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Career Alignment & Job Fit</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Transparent evidence matrix comparing target job requirements with your GitHub activity.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {matches.map((job) => (
          <Card key={job.id} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{job.roleTitle}</h2>
                  <Badge variant="purple">{job.targetSeniority}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <Building2 className="w-3.5 h-3.5" /> {job.companyName}
                </div>
              </div>
              <MatchIndicator score={job.overallMatchScore} />
            </div>

            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-xl text-xs space-y-1">
              <span className="font-bold text-indigo-900 dark:text-indigo-300">Why this role appears aligned:</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{job.whyAligned}</p>
            </div>

            {/* Requirements vs Evidence Matrix */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Requirements vs Evidence Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">Requirement</th>
                      <th className="p-3">Required</th>
                      <th className="p-3">GitHub Evidence</th>
                      <th className="p-3">Strength</th>
                      <th className="p-3 rounded-r-lg">Gap Analysis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {job.requirements.map((req, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">{req.skill}</td>
                        <td className="p-3">{req.isRequired ? 'Mandatory ✓' : 'Preferred'}</td>
                        <td className="p-3">{req.evidenceDetails}</td>
                        <td className="p-3">
                          <Badge variant={req.evidenceStrength === 'Strong' ? 'success' : req.evidenceStrength === 'Moderate' ? 'warning' : 'danger'}>
                            {req.evidenceStrength}
                          </Badge>
                        </td>
                        <td className="p-3 text-slate-500">{req.gapAnalysis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
