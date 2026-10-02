import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FolderGit2, Star, GitFork, ShieldCheck, Code2, ArrowRight } from 'lucide-react';
import { Input, Button, Card, Badge, ProgressRing } from '../components/ui/Primitives';
import { repositoryApi } from '../services/api/gitInsightServices';
import { Repository } from '../types';

export const RepositoriesPage: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [query, setQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    repositoryApi.getRepositories().then((data) => {
      setRepos(data);
      setIsLoading(false);
    });
  }, []);

  const filteredRepos = repos.filter((r) => {
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase());
    const matchesLang = selectedLang === 'All' || r.language === selectedLang;
    return matchesQuery && matchesLang;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Repository Catalog</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explore code quality, architecture patterns, and AI indicators across repositories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories..."
            icon={<Search className="w-4 h-4" />}
            className="w-56"
          />
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">All Languages</option>
            <option value="C#">C#</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRepos.map((repo) => (
          <Card key={repo.id} className="flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <Link to={`/repositories/${repo.id}`} className="font-bold text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                    {repo.name}
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{repo.description}</p>
                </div>
                <ProgressRing value={repo.qualityScore} size={48} strokeWidth={4} />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="purple">{repo.language}</Badge>
                <Badge variant="outline">{repo.architectureType}</Badge>
                <Badge variant={repo.securityRisk === 'Low' ? 'success' : 'warning'}>Security: {repo.securityRisk}</Badge>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> {repo.stars}</span>
                <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {repo.forks}</span>
                <span>Coverage: <strong className="text-slate-700 dark:text-slate-300">{repo.testCoveragePercent}%</strong></span>
              </div>
              <Link to={`/repositories/${repo.id}`}>
                <Button size="sm" variant="outline" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Analyze Repo
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
