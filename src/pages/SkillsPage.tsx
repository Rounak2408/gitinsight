import React, { useEffect, useState } from 'react';
import { Code2, FolderGit2, FileCode, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import { Card, Badge, ProgressBar, Input } from '../components/ui/Primitives';
import { skillsApi } from '../services/api/gitInsightServices';
import { SkillEvidence } from '../types';

export const SkillsPage: React.FC = () => {
  const [evidences, setEvidences] = useState<SkillEvidence[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    skillsApi.getSkillEvidences().then((data) => {
      setEvidences(data);
      setIsLoading(false);
    });
  }, []);

  const categories = ['All', 'Languages', 'Frameworks', 'Databases', 'DevOps', 'Architecture'];

  const filtered = selectedCategory === 'All' ? evidences : evidences.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Developer Skill Intelligence</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Verified evidence extracted from your source files and repository structures.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((skill) => (
          <Card key={skill.skillName} className="space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{skill.skillName}</h3>
                    <Badge variant="purple">{skill.category}</Badge>
                    <Badge variant="success">{skill.confidence} Confidence</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Demonstrated in {skill.repositoriesCount} repositories across {skill.filesCount} source files.
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-48 space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Proficiency Score</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{skill.proficiencyScore}%</span>
                </div>
                <ProgressBar value={skill.proficiencyScore} />
              </div>
            </div>

            {/* Sample Code Evidence Snippets */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Evidence Snippets</h4>
              {skill.sampleEvidence.map((ev, i) => (
                <div key={i} className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                    <span className="font-bold text-indigo-400">{ev.repoName}</span>
                    <span className="text-slate-500">{ev.filePath}</span>
                  </div>
                  <div className="text-emerald-400 overflow-x-auto py-1">{ev.snippet}</div>
                  <p className="text-[11px] text-slate-400 font-sans">{ev.description}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
