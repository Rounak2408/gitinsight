import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Briefcase,
  Compass,
  Sparkles,
  Search,
  CheckCircle2,
  Star,
  ChevronDown,
  Layers,
  FileCode,
  FolderGit2,
  Sun,
  Moon,
} from 'lucide-react';
import { Github } from '../components/ui/GithubIcon';
import { Button, Badge, Card } from '../components/ui/Primitives';
import { useTheme } from '../hooks/useTheme';

export const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoTab, setDemoTab] = useState<'profile' | 'repo' | 'skills' | 'career'>('profile');

  const faqs = [
    {
      q: 'How does GitInsight analyze GitHub activity?',
      a: 'GitInsight inspects public GitHub repositories, project tree structures, source code files, commit histories, dependencies, and README documentation. It processes this data into technical, structural, and career intelligence.',
    },
    {
      q: 'Does GitInsight store my private GitHub access tokens?',
      a: 'No. GitInsight never stores private access tokens or API keys on the frontend or third-party servers. All communications use secure HTTPS and adhere to strict security best practices.',
    },
    {
      q: 'How are AI Code Indicators calculated?',
      a: 'GitInsight identifies structural patterns, repetitive boilerplate signatures, and commit distribution. It presents transparent indicators with confidence levels without making false claims of absolute proof.',
    },
    {
      q: 'Can I export a PDF report for recruiters and faculty?',
      a: 'Yes! GitInsight features an Executive Report Generator that generates print-ready PDF reports summarizing your engineering skills, repository architecture, code quality, and job alignment.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* --- MARKETING NAVBAR --- */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              Git<span className="text-indigo-600 dark:text-indigo-400">Insight</span>
            </span>
            <Badge variant="purple" className="hidden sm:inline-flex text-[10px]">
              v2.0 Developer SaaS
            </Badge>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</a>
            <a href="#intelligence" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Intelligence</a>
            <a href="#career" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Career Fit</a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <Link to="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden bg-radial-gradient">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <Badge variant="purple" className="px-3 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5" /> AI-Powered Developer Intelligence Platform
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Understand Your Code.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 dark:from-indigo-400 dark:via-purple-400 dark:to-sky-400">
              Discover Your Career.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            GitInsight transforms raw GitHub activity into deep engineering intelligence, project architecture maps, demonstrated skill evidence, and career readiness roadmaps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/analyzer">
              <Button size="lg" className="w-full sm:w-auto" icon={<Search className="w-4 h-4" />}>
                Analyze GitHub Profile
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Live Demo
              </Button>
            </Link>
          </div>

          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credentials required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ASP.NET Core & React API Ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Print-Ready PDF Reports</span>
          </div>
        </div>

        {/* --- INTERACTIVE DASHBOARD PREVIEW --- */}
        <div className="max-w-6xl mx-auto mt-12 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden bg-grid-pattern">
          {/* Mock Window Controls */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">gitinsight.dev/alexrivera-dev</span>
            </div>
            <div className="flex items-center gap-2">
              {(['profile', 'repo', 'skills', 'career'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDemoTab(tab)}
                  className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-colors ${
                    demoTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Preview Content */}
          <div className="p-6 text-left text-slate-200">
            {demoTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120" alt="Avatar" className="w-12 h-12 rounded-full border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Alex Rivera</h4>
                      <p className="text-xs text-slate-400">@alexrivera-dev</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">Full-Stack .NET & TypeScript Engineer.</p>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
                    <span>Profile Score</span>
                    <span className="font-bold text-emerald-400">92%</span>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Demonstrated Tech Distribution</h4>
                    <Badge variant="purple">Verified GitHub Evidence</Badge>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>C# / .NET 9</span>
                        <span className="font-bold">38%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[38%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>TypeScript & React 19</span>
                        <span className="font-bold">32%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[32%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>PostgreSQL & SQL</span>
                        <span className="font-bold">14%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[14%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {demoTab === 'repo' && (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-indigo-400" />
                    <span className="font-bold text-sm text-white">enterprise-cqrs-api</span>
                    <Badge variant="success">94% Quality Score</Badge>
                  </div>
                  <span className="text-xs font-mono text-slate-400">ASP.NET Core 9 + MediatR</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Architecture</span>
                    <span className="text-xs font-bold text-indigo-400">Clean CQRS</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Test Coverage</span>
                    <span className="text-xs font-bold text-emerald-400">88%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Doc Score</span>
                    <span className="text-xs font-bold text-sky-400">95%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Security</span>
                    <span className="text-xs font-bold text-emerald-400">Pass (Low Risk)</span>
                  </div>
                </div>
              </div>
            )}

            {demoTab === 'skills' && (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Skill Evidence Inspector</h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                  <span className="text-purple-400">C# / .NET 9</span> — Proven in 12 repositories across 84 source files.
                  <br />
                  <span className="text-slate-500">// Sample snippet from CreateOrderCommand.cs</span>
                  <br />
                  <span className="text-emerald-400">public class CreateOrderCommandHandler : IRequestHandler&lt;CreateOrderCommand, OrderResponseDto&gt;</span>
                </div>
              </div>
            )}

            {demoTab === 'career' && (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-white">Target Role: Senior .NET / Full-Stack Engineer</span>
                  <Badge variant="success">94% Match Alignment</Badge>
                </div>
                <p className="text-xs text-slate-400">Strong GitHub evidence matching FinTech JD backend requirement matrix.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">How GitInsight Works</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            From raw GitHub commits to actionable career readiness in 3 transparent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">GitHub Data Ingestion</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Connect your public GitHub username. GitInsight fetches repository file trees, commit logs, language ratios, and code structure.
            </p>
          </Card>

          <Card className="space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-base">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Engineering Intelligence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              AI analyzers construct visual architecture maps, evaluate code maintainability, scan security configuration risks, and extract skill evidence.
            </p>
          </Card>

          <Card className="space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Career Intelligence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Compare your evidence against real job descriptions, generate customized skill-gap roadmaps, and practice code-aware mock interviews.
            </p>
          </Card>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800/80">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Everything you need to know about GitInsight.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-900 dark:text-slate-100"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'transform rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <Card className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 border-indigo-500/40 p-10 text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Unlock Your Developer Intelligence?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Analyze your GitHub profile today and transform your project activity into career opportunity.
          </p>
          <div className="pt-2">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-none font-bold">
                Launch GitInsight Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-900 dark:text-slate-200">GitInsight Platform</span>
          </div>
          <p>© 2026 GitInsight Developer & Career Intelligence. Academic & Engineering Major Project.</p>
          <div className="flex gap-4">
            <Link to="/settings" className="hover:underline">Settings</Link>
            <Link to="/reports" className="hover:underline">Reports</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
