import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button, Textarea, Card, Badge, MatchIndicator } from '../components/ui/Primitives';
import { jobApi } from '../services/api/gitInsightServices';
import { JobMatch } from '../types';

export const JdAnalyzerPage: React.FC = () => {
  const [jdText, setJdText] = useState<string>(
    `Role: Full-Stack Web Application & Systems Engineer\n\nRequirements:\n- 2+ years experience building web applications using TypeScript and JavaScript\n- Strong proficiency in modern React UI component design and CSS\n- Experience building enterprise management systems or admin dashboards\n- Knowledge of Python for scripting or automation\n- Preferred: CI/CD GitHub Actions & Docker deployment experience`
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<JobMatch | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jdText.trim()) return;

    setIsAnalyzing(true);
    try {
      const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';
      const res = await jobApi.analyzeJobDescription(jdText, activeUser);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Job Description Analyzer</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Paste any target job description to extract required skills and compare directly with your GitHub evidence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <FileText className="w-4 h-4 text-indigo-500" /> Target Job Description Input
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4">
            <Textarea
              value={jdText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJdText(e.target.value)}
              placeholder="Paste job description text here..."
              className="h-64 font-mono text-xs"
              required
            />
            <Button type="submit" isLoading={isAnalyzing} className="w-full" icon={<Sparkles className="w-4 h-4" />}>
              Analyze JD vs My GitHub Profile
            </Button>
          </form>
        </Card>

        <div>
          {result ? (
            <Card className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{result.roleTitle}</h3>
                  <p className="text-xs text-slate-500">{result.companyName}</p>
                </div>
                <MatchIndicator score={result.overallMatchScore} />
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-xs text-indigo-900 dark:text-indigo-300">
                <span className="font-bold">Alignment Overview:</span> {result.whyAligned}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Requirements Breakdown</h4>
                <div className="space-y-2">
                  {result.requirements.map((req, i) => (
                    <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{req.skill}</span>
                        <p className="text-slate-500 text-[11px]">{req.evidenceDetails}</p>
                      </div>
                      <Badge variant={req.evidenceStrength === 'Strong' ? 'success' : 'danger'}>{req.evidenceStrength}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center p-8 text-center text-xs text-slate-400">
              Click "Analyze JD vs My GitHub Profile" to view requirement extraction & alignment matrix.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
