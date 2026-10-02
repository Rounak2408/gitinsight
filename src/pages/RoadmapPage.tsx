import React, { useEffect, useState } from 'react';
import { Compass, CheckCircle2, Circle, ExternalLink, BookOpen, Sparkles, FolderPlus } from 'lucide-react';
import { Card, Badge, Button, ProgressBar } from '../components/ui/Primitives';
import { roadmapApi } from '../services/api/gitInsightServices';
import { SkillGapRoadmapItem } from '../types';

export const RoadmapPage: React.FC = () => {
  const [items, setItems] = useState<SkillGapRoadmapItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';
    roadmapApi.getRoadmap(activeUser).then((data) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);

  const handleToggle = async (id: string, current: boolean) => {
    const next = !current;
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, isCompleted: next } : item)));
    await roadmapApi.toggleMilestone(id, next);
  };

  const completedCount = items.filter((i) => i.isCompleted).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Skill-Gap Career Roadmap</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Sequential learning roadmap designed to bridge missing GitHub evidence for target roles.
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span>Roadmap Completion</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
          </div>
          <ProgressBar value={progressPercent} />
        </div>
      </div>

      <div className="space-y-6 relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 ml-4">
        {items.map((item) => (
          <div key={item.id} className="relative">
            {/* Circle timeline marker */}
            <button
              onClick={() => handleToggle(item.id, item.isCompleted)}
              className="absolute -left-[35px] top-1 bg-white dark:bg-slate-900 rounded-full transition-transform hover:scale-110"
            >
              {item.isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
              ) : (
                <Circle className="w-6 h-6 text-slate-400" />
              )}
            </button>

            <Card className={`space-y-4 ${item.isCompleted ? 'border-emerald-500/40 bg-emerald-50/10 dark:bg-emerald-950/10' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">Week {item.weekNumber}</Badge>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.phaseTitle}</h3>
                </div>
                <Badge variant={item.isCompleted ? 'success' : 'outline'}>
                  {item.isCompleted ? 'Completed ✓' : 'In Progress'}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.objective}</p>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-indigo-400">
                  <FolderPlus className="w-4 h-4" /> Recommended Project to Build:
                </div>
                <p className="text-slate-200 font-mono">{item.suggestedProject}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs">
                <span className="font-semibold text-slate-500 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Curated Resources:
                </span>
                {item.learningResources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    {res.title} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
