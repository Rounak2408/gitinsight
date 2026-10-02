import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Code2,
  FolderGit2,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Star,
  GitFork,
  CheckCircle2,
  AlertCircle,
  Zap,
  Layers,
  Search,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { MetricCard, Card, Badge, Button, ProgressRing, ProgressBar, Skeleton } from '../components/ui/Primitives';
import { githubApi, repositoryApi, skillsApi, jobApi } from '../services/api/gitInsightServices';
import { GitHubProfile, Repository, SkillEvidence, JobMatch } from '../types';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [skills, setSkills] = useState<SkillEvidence[]>([]);
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';
        const [profData, repoData, skillData, jobData] = await Promise.all([
          githubApi.analyzeProfile(activeUser),
          repositoryApi.getRepositories(activeUser),
          skillsApi.getSkillEvidences(activeUser),
          jobApi.getJobMatches(activeUser),
        ]);
        setProfile(profData);
        setRepos(repoData);
        setSkills(skillData);
        setJobs(jobData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const skillChartData = skills.map((s) => ({
    subject: s.skillName,
    score: s.proficiencyScore,
    fullMark: 100,
  }));

  const techBarData = (profile?.topLanguages && profile.topLanguages.length > 0)
    ? profile.topLanguages.map((lang) => ({ name: lang.name, percentage: lang.percentage }))
    : [
        { name: 'TypeScript', percentage: 49 },
        { name: 'JavaScript', percentage: 26 },
        { name: 'CSS', percentage: 11 },
        { name: 'Python', percentage: 6 },
      ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const displayName = profile?.name || user?.name || localStorage.getItem('gitinsight_active_user') || 'rounak2408';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Good morning, {displayName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here is your current developer & career intelligence overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/analyzer">
            <Button size="sm" icon={<Search className="w-3.5 h-3.5" />}>
              Scan New Profile
            </Button>
          </Link>
          <Link to="/reports">
            <Button variant="outline" size="sm" icon={<Sparkles className="w-3.5 h-3.5 text-indigo-500" />}>
              Generate Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Profile Health"
          value={`${profile?.profileStrengthScore || 92}%`}
          subtitle="Top 5% GitHub Profile Strength"
          icon={<ShieldCheck className="w-5 h-5" />}
          badgeText="Verified GitHub"
          trend={{ value: '8% this month', positive: true }}
        />
        <MetricCard
          title="Demonstrated Skills"
          value="18 Techs"
          subtitle="Backed by 84 source files"
          icon={<Code2 className="w-5 h-5" />}
          badgeText="C# & TS Lead"
          trend={{ value: '4 new evidences', positive: true }}
        />
        <MetricCard
          title="Repository Quality"
          value="91 / 100"
          subtitle="Clean Architecture & CQRS"
          icon={<FolderGit2 className="w-5 h-5" />}
          badgeText="High Maintainability"
          trend={{ value: '12% test delta', positive: true }}
        />
        <MetricCard
          title="Job Alignment"
          value="94% Fit"
          subtitle="Senior .NET / Full-Stack"
          icon={<Briefcase className="w-5 h-5" />}
          badgeText="Top Role Match"
          trend={{ value: '15% boost', positive: true }}
        />
      </div>

      {/* Middle Grid: Technology Distribution & Skill Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Technology Distribution Chart */}
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Technology Evidence Breakdown</h3>
              <p className="text-xs text-slate-500">Language distribution parsed across your 24 public repositories.</p>
            </div>
            <Badge variant="purple">Code Ingestion Active</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={techBarData} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                <XAxis type="number" domain={[0, 50]} tickFormatter={(v) => `${v}%`} stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={120} />
                <Tooltip
                  formatter={(val: any) => [`${val}% code volume`, 'Evidence Share']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="percentage" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skill Radar Card */}
        <Card className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Skill Radar</h3>
              <Badge variant="success">High Confidence</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Proficiency indexed against repository depth.</p>
          </div>

          <div className="h-56 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillChartData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <Radar name="Proficiency" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Primary Core: <strong className="text-slate-700 dark:text-slate-300">C# / .NET 9</strong></span>
            <Link to="/skills" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Inspect Evidence →
            </Link>
          </div>
        </Card>
      </div>

      {/* Repositories & Career Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Repositories */}
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Analyzed Repositories</h3>
            </div>
            <Link to="/repositories" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              View All 24 Repos →
            </Link>
          </div>

          <div className="space-y-3">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link to={`/repositories/${repo.id}`} className="font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                      {repo.name}
                    </Link>
                    <Badge variant="purple" className="text-[10px]">{repo.language}</Badge>
                    <Badge variant="outline" className="text-[10px]">{repo.architectureType}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{repo.description}</p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Star className="w-3.5 h-3.5 text-amber-500" /> {repo.stars}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <GitFork className="w-3.5 h-3.5" /> {repo.forks}
                  </div>
                  <ProgressRing value={repo.qualityScore} size={38} strokeWidth={4} />
                  <Link to={`/repositories/${repo.id}`}>
                    <Button variant="outline" size="sm">
                      Inspect Code
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actionable Recommendations & Career Alignment */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Recommendations</h3>
            </div>
            <Badge variant="purple">Career Intelligence</Badge>
          </div>

          <div className="space-y-3">
            {jobs[0]?.recommendations.map((rec, i) => (
              <div key={i} className="p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20 text-xs space-y-1">
                <div className="flex items-center gap-2 font-semibold text-indigo-900 dark:text-indigo-300">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                  Priority Action #{i + 1}
                </div>
                <p className="text-slate-600 dark:text-slate-400">{rec}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Top Aligned Target Role</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{jobs[0]?.roleTitle}</span>
              <Badge variant="success">{jobs[0]?.overallMatchScore}% Match</Badge>
            </div>
            <Link to="/career">
              <Button variant="ghost" size="sm" className="w-full text-indigo-600 dark:text-indigo-400 text-xs mt-2">
                Open Career Requirements Matrix →
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
