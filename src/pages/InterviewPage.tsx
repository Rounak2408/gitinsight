import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mic, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '../components/ui/Primitives';
import { interviewApi } from '../services/api/gitInsightServices';
import { InterviewQuestion } from '../types';

export const InterviewPage: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';
    interviewApi.getQuestions(activeUser).then((data) => {
      setQuestions(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            Interview Preparation <Badge variant="green">Voice AI Enabled 🎙️</Badge>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Technical and architectural interview questions generated directly from your actual GitHub repository code with real-time Voice-to-Voice interaction.
          </p>
        </div>

        <Button onClick={() => navigate('/interview/session')} icon={<Mic className="w-4 h-4 text-emerald-400" />}>
          Start Voice-to-Voice Mock Interview 🎙️
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <Card key={q.id} className="space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="purple">{q.category}</Badge>
                <span className="text-xs font-mono text-slate-500">From repository: {q.contextRepo}</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => navigate('/interview/session')} icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Practice Answer
              </Button>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{q.question}</h3>

            {q.contextSnippet && (
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                {q.contextSnippet}
              </div>
            )}

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">Sample Guidance:</span> {q.sampleAnswerGuidance}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
