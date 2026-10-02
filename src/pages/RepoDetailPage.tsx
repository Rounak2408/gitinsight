import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FolderGit2,
  Layers,
  Code2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Sparkles,
  FileCode,
  Star,
  GitFork,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { Button, Card, Badge, ProgressRing, ProgressBar, Skeleton } from '../components/ui/Primitives';
import { Tabs } from '../components/ui/Tabs';
import { CodeViewer } from '../components/ui/CodeViewer';
import { ArchitectureDiagram } from '../components/ui/ArchitectureDiagram';
import { repositoryApi } from '../services/api/gitInsightServices';
import { Repository, CodeFileNode, CodeAnalysis, ArchitectureNode } from '../types';

export const RepoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const repoId = id || 'repo-1';

  const [repo, setRepo] = useState<Repository | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [tree, setTree] = useState<CodeFileNode | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('/src/Core/Application/CreateOrderCommand.cs');
  const [codeContent, setCodeContent] = useState<string>('');
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [architecture, setArchitecture] = useState<ArchitectureNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRepo = async () => {
      setIsLoading(true);
      try {
        const [r, t, arch] = await Promise.all([
          repositoryApi.getRepositoryById(repoId),
          repositoryApi.getCodeTree(repoId),
          repositoryApi.getArchitectureNodes(repoId),
        ]);
        setRepo(r);
        setTree(t);
        setArchitecture(arch);

        // Load initial file content & analysis
        const fileCode = await repositoryApi.getFileContent(repoId, selectedFile);
        const fileAnalysis = await repositoryApi.analyzeFile(repoId, selectedFile);
        setCodeContent(fileCode);
        setAnalysis(fileAnalysis);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadRepo();
  }, [repoId]);

  const handleSelectFile = async (filePath: string) => {
    setSelectedFile(filePath);
    try {
      const fileCode = await repositoryApi.getFileContent(repoId, filePath);
      const fileAnalysis = await repositoryApi.analyzeFile(repoId, filePath);
      setCodeContent(fileCode);
      setAnalysis(fileAnalysis);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !repo) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture', icon: <Layers className="w-4 h-4" /> },
    { id: 'code-intel', label: 'Code Intelligence', icon: <Code2 className="w-4 h-4" /> },
    { id: 'ai-indicators', label: 'AI Indicators', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'quality', label: 'Code Quality', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'security', label: 'Security Analysis', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-slate-500">{repo.owner} /</span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{repo.name}</h1>
            <Badge variant="purple">{repo.language}</Badge>
            <Badge variant="outline">{repo.architectureType}</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl">{repo.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500" /> {repo.stars}</span>
            <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> {repo.forks}</span>
          </div>
          <ProgressRing value={repo.qualityScore} size={48} strokeWidth={4} label="Score" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Project Maturity</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Maintainability Index</span>
                  <span className="font-bold">{repo.maintainabilityIndex}%</span>
                </div>
                <ProgressBar value={repo.maintainabilityIndex} />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Test Coverage</span>
                  <span className="font-bold">{repo.testCoveragePercent}%</span>
                </div>
                <ProgressBar value={repo.testCoveragePercent} />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Documentation Quality</span>
                  <span className="font-bold">{repo.documentationScore}%</span>
                </div>
                <ProgressBar value={repo.documentationScore} />
              </div>
            </div>
          </Card>

          <Card className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Architecture Summary</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This repository strictly adheres to Clean Architecture principles using ASP.NET Core 9 and MediatR CQRS handlers. Domain models maintain zero dependencies on infrastructure implementations, ensuring robust testability and modular deployment.
            </p>
            <div className="pt-2">
              <Button size="sm" onClick={() => setActiveTab('architecture')} icon={<Layers className="w-4 h-4" />}>
                Open Interactive Architecture Diagram →
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <ArchitectureDiagram nodes={architecture} />
      )}

      {/* TAB CONTENT: CODE INTELLIGENCE */}
      {activeTab === 'code-intel' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: File Tree Browser */}
          <Card className="p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Repository Tree</h4>
            <div className="space-y-1 font-mono text-xs">
              <button
                onClick={() => handleSelectFile('/src/Core/Application/CreateOrderCommand.cs')}
                className={`w-full flex items-center gap-2 p-2 rounded text-left transition-colors ${
                  selectedFile === '/src/Core/Application/CreateOrderCommand.cs'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">CreateOrderCommand.cs</span>
              </button>
              <button
                onClick={() => handleSelectFile('/src/Infrastructure/JwtTokenGenerator.cs')}
                className={`w-full flex items-center gap-2 p-2 rounded text-left transition-colors ${
                  selectedFile === '/src/Infrastructure/JwtTokenGenerator.cs'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">JwtTokenGenerator.cs</span>
              </button>
            </div>
          </Card>

          {/* Center: Code Viewer */}
          <div className="lg:col-span-2">
            <CodeViewer filename={selectedFile} code={codeContent} aiScore={analysis?.aiIndicatorScore} />
          </div>

          {/* Right: AI Analysis Panel */}
          <Card className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> AI File Explanation
            </div>

            {analysis && (
              <div className="space-y-3 text-xs">
                <div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">File Purpose:</h5>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">{analysis.filePurpose}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">Inputs & Outputs:</h5>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">{analysis.inputsOutputs}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">Patterns Detected:</h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.patternsDetected.map((p) => (
                      <Badge key={p} variant="purple" className="text-[10px]">{p}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg text-amber-800 dark:text-amber-300">
                  <span className="font-bold">Potential Issue:</span> {analysis.potentialIssues[0]}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* TAB CONTENT: AI INDICATORS */}
      {activeTab === 'ai-indicators' && (
        <Card className="space-y-6">
          <div className="p-4 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <div className="text-xs text-sky-900 dark:text-sky-300 space-y-1">
              <h4 className="font-bold">Responsible & Transparent AI Indicator Analysis</h4>
              <p>
                GitInsight analyzes code structure consistency, commit timing distribution, and boilerplate ratios to evaluate potential AI assistance patterns. This analysis provides heuristic indicators only and is not definitive proof of code authorship.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
              <span className="text-xs uppercase font-bold text-slate-400">AI Assistance Ratio</span>
              <h3 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{repo.aiAssistedRatio}%</h3>
              <p className="text-xs text-slate-500">Primarily human-written domain logic with standard framework boilerplate.</p>
            </div>

            <div className="md:col-span-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white">Pattern Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Custom CQRS & MediatR Handlers</span>
                  <Badge variant="success">Human Idiomatic</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Standard JWT Token Generator</span>
                  <Badge variant="purple">Standard Boilerplate</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* TAB CONTENT: SECURITY ANALYSIS */}
      {activeTab === 'security' && (
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" /> Security & Vulnerability Scan
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300">
            <div>
              <h4 className="font-bold">Zero Unmasked Hardcoded Secrets Detected</h4>
              <p>All authentication parameters use Options pattern bindings from environment variables.</p>
            </div>
            <Badge variant="success">Pass</Badge>
          </div>
        </Card>
      )}
    </div>
  );
};
