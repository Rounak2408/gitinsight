import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, CheckCircle2, RefreshCw, Star, GitFork, Users, MapPin, ExternalLink, Sparkles, FolderGit2, Code2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Github } from '../components/ui/GithubIcon';
import { Button, Input, Card, Badge, ProgressRing, ProgressBar } from '../components/ui/Primitives';
import { githubApi, repositoryApi } from '../services/api/gitInsightServices';
import { GitHubProfile, Repository } from '../types';

export const AnalyzerPage: React.FC = () => {
  const [username, setUsername] = useState(() => localStorage.getItem('gitinsight_active_user') || 'rounak2408');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [repoQuery, setRepoQuery] = useState('');

  const steps = [
    'Fetching GitHub profile data...',
    'Scanning public repository file trees...',
    'Parsing language distribution & commit frequency...',
    'Inspecting ASP.NET Core & TypeScript architecture patterns...',
    'Calculating test coverage & documentation index...',
    'Detecting frameworks, ORMs & DevOps tools...',
    'Generating AI career intelligence summary...'
  ];

  const fetchProfileAndRepos = async (targetUser: string) => {
    try {
      const [profRes, reposRes] = await Promise.all([
        githubApi.analyzeProfile(targetUser),
        repositoryApi.getRepositories(targetUser),
      ]);
      setProfile(profRes);
      setRepos(reposRes);
    } catch (err) {
      console.error('Error fetching profile and repos:', err);
    }
  };

  useEffect(() => {
    if (username) {
      fetchProfileAndRepos(username);
    }
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsScanning(true);
    setScanStep(0);

    for (let i = 0; i < steps.length; i++) {
      setScanStep(i);
      await new Promise((r) => setTimeout(r, 300));
    }

    try {
      await fetchProfileAndRepos(username);
    } finally {
      setIsScanning(false);
    }
  };

  const filteredRepos = repos.filter((r) =>
    r.name.toLowerCase().includes(repoQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(repoQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="purple">
          <Github className="w-3.5 h-3.5" /> GitHub Profile & Developer Intelligence Analyzer
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Inspect Any GitHub Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Enter a GitHub username or URL to run multi-step code intelligence, structure analysis, and skill verification.
        </p>

        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto pt-2">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="github.com/username or username"
            icon={<Search className="w-4 h-4" />}
            required
          />
          <Button type="submit" isLoading={isScanning} size="md" icon={<Sparkles className="w-4 h-4" />} className="w-full sm:w-auto">
            Analyze Profile
          </Button>
        </form>
      </div>

      {/* Multi-step Scanning Experience */}
      {isScanning && (
        <Card className="max-w-xl mx-auto space-y-4 p-6 border-indigo-500/40 bg-indigo-50/20 dark:bg-indigo-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-indigo-900 dark:text-indigo-300">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
              Scanning @{username}...
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              Step {scanStep + 1} of {steps.length}
            </span>
          </div>

          <ProgressBar value={((scanStep + 1) / steps.length) * 100} height="h-2.5" />

          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-indigo-100 dark:border-indigo-900/50 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            {steps[scanStep]}
          </div>
        </Card>
      )}

      {/* Analysis Profile Result */}
      {profile && !isScanning && (
        <div className="space-y-8">
          {/* Profile Overview Card */}
          <Card className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-indigo-500/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 w-full">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-indigo-400 object-cover shadow-lg shrink-0"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                    <span className="text-xs text-indigo-300 font-mono">@{profile.username}</span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">{profile.bio}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {profile.followers} Followers</span>
                    <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5" /> {profile.publicRepos} Repositories</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                <ProgressRing value={profile.profileStrengthScore} size={70} strokeWidth={6} label="Profile Score" />
              </div>
            </div>
          </Card>

          {/* Technology Overview & Improvement Suggestions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Top Demonstrated Languages & Tech</h3>
              <div className="space-y-3">
                {profile.topLanguages.map((lang: any) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">{lang.name}</span>
                      <span className="text-slate-500 font-mono">{lang.percentage}%</span>
                    </div>
                    <ProgressBar value={lang.percentage} height="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="space-y-4">
              <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                Profile Improvement Suggestions
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {profile.improvementSuggestions.map((sug: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                    <span className="font-bold text-indigo-500 shrink-0">•</span>
                    {sug}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Public Repositories & Details Section */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-500" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Public Repositories ({filteredRepos.length})
                </h3>
              </div>

              <Input
                value={repoQuery}
                onChange={(e) => setRepoQuery(e.target.value)}
                placeholder="Filter repositories..."
                icon={<Search className="w-4 h-4" />}
                className="w-full sm:w-64"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRepos.map((repo) => (
                <Card key={repo.id} className="flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all p-5 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={repo.htmlUrl || `https://github.com/${repo.owner}/${repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-base text-slate-900 dark:text-white hover:text-indigo-400 flex items-center gap-1.5 truncate"
                          >
                            {repo.name}
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </a>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 flex items-center gap-1"
                            >
                              Live Demo 🚀
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>
                      </div>
                      <ProgressRing value={repo.qualityScore} size={46} strokeWidth={4} label="Score" />
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="purple">{repo.language}</Badge>
                      <Badge variant="outline">{repo.architectureType}</Badge>
                      {repo.topics && repo.topics.slice(0, 2).map((t) => (
                        <Badge key={t} variant="info" className="text-[10px]">#{t}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {repo.stars}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5 text-indigo-400" /> {repo.forks}</span>
                      <span className="text-slate-500">{repo.sizeKb} KB</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={repo.htmlUrl || `https://github.com/${repo.owner}/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                      <Link to={`/repositories/${repo.id}`}>
                        <Button size="sm" variant="outline" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                          Inspect
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}

              {filteredRepos.length === 0 && (
                <div className="col-span-full p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-xl text-slate-500 text-sm">
                  No repositories matching "{repoQuery}" found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
