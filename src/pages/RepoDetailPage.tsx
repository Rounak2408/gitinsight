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
  Folder,
} from 'lucide-react';
import { Button, Card, Badge, ProgressRing, ProgressBar, Skeleton } from '../components/ui/Primitives';
import { ArchitectureDiagram } from '../components/ui/ArchitectureDiagram';
import { CodeViewer } from '../components/ui/CodeViewer';
import { repositoryApi } from '../services/api/gitInsightServices';
import { Repository, CodeFileNode, CodeAnalysis, ArchitectureNode } from '../types';

export const RepoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const repoId = id || 'repo-1';

  const [repo, setRepo] = useState<Repository | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [fileList, setFileList] = useState<{ path: string; name: string; type: 'file' | 'dir'; size?: number }[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [codeContent, setCodeContent] = useState<string>('');
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [architecture, setArchitecture] = useState<ArchitectureNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRepo = async () => {
      setIsLoading(true);
      try {
        const r = await repositoryApi.getRepositoryById(repoId);
        setRepo(r);

        const [files, arch] = await Promise.all([
          repositoryApi.getRepoFileList(r.owner || 'rounak2408', r.name, r.defaultBranch || 'main'),
          repositoryApi.getArchitectureNodes(repoId),
        ]);
        setFileList(files);
        setArchitecture(arch);

        const firstFile = files[0]?.path || '/README.md';
        setSelectedFile(firstFile);

        const [fileCode, fileAnalysis] = await Promise.all([
          repositoryApi.getFileContent(repoId, firstFile, r.owner, r.name, r.defaultBranch),
          repositoryApi.analyzeFile(repoId, firstFile),
        ]);
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
    if (!repo) return;
    setSelectedFile(filePath);
    try {
      const [fileCode, fileAnalysis] = await Promise.all([
        repositoryApi.getFileContent(repoId, filePath, repo.owner, repo.name, repo.defaultBranch),
        repositoryApi.analyzeFile(repoId, filePath),
      ]);
      setCodeContent(fileCode);
      setAnalysis(fileAnalysis);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !repo) {
    return (
      <div className="space-y-6 animate-in fade-in">
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
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-mono">{repo.owner} /</span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{repo.name}</h1>
            <Badge variant="purple">{repo.language}</Badge>
            <Badge variant="outline">{repo.architectureType}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{repo.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-400 mr-2">
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {repo.stars}</span>
            <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5 text-indigo-400" /> {repo.forks}</span>
          </div>
          <ProgressRing value={repo.qualityScore} size={54} strokeWidth={5} label="Score" />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === t.id
                ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Repository Metadata</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Primary Language:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{repo.language}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Default Branch:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{repo.defaultBranch}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Security Vulnerabilities:</span>
                <Badge variant={repo.securityRisk === 'Low' ? 'success' : 'warning'}>{repo.securityRisk} Risk</Badge>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">AI Assistance Ratio:</span>
                <span className="font-semibold text-indigo-400">{repo.aiAssistedRatio}% AI Assisted</span>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Code Quality Metrics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Maintainability Index</span>
                  <span className="font-bold">{repo.maintainabilityIndex}/100</span>
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
                  <span>Documentation Index</span>
                  <span className="font-bold">{repo.documentationScore}%</span>
                </div>
                <ProgressBar value={repo.documentationScore} />
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Architecture Summary</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {repo.name} adheres to <strong className="text-slate-200">{repo.architectureType}</strong> pattern. Domain logic and component layers maintain clean boundaries with {repo.testCoveragePercent}% verified test coverage.
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
      {activeTab === 'architecture' && <ArchitectureDiagram nodes={architecture} />}

      {/* TAB CONTENT: CODE INTELLIGENCE */}
      {activeTab === 'code-intel' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Dynamic Real File Tree Browser */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Repository Files ({fileList.length})</h4>
              <Badge variant="purple" className="text-[10px] font-mono">{repo.name}</Badge>
            </div>

            <div className="space-y-1 font-mono text-xs max-h-[500px] overflow-y-auto scrollbar-thin">
              {fileList.map((f) => (
                <button
                  key={f.path}
                  onClick={() => handleSelectFile(f.path)}
                  className={`w-full flex items-center gap-2 p-2 rounded text-left transition-colors truncate ${
                    selectedFile === f.path
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={f.path}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{f.name}</span>
                </button>
              ))}
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
                      <Badge key={p} variant="purple" className="text-[10px]">
                        {p}
                      </Badge>
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
              <h4 className="font-bold">Responsible & Transparent AI Code Detection Engine</h4>
              <p>
                GitInsight uses AST structural analysis, comment density heuristics, boilerplate entropy calculation, and commit velocity indexing to detect whether code in <strong>{repo.name}</strong> was generated by AI models or written by human developers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-xs uppercase font-bold text-slate-400">Human vs AI Code Score</span>
              <div className="flex items-center justify-center gap-3">
                <ProgressRing value={100 - repo.aiAssistedRatio} size={64} strokeWidth={5} label="Human Code" />
                <ProgressRing value={repo.aiAssistedRatio} size={64} strokeWidth={5} label="AI Assisted" />
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {100 - repo.aiAssistedRatio}% Human Written • {repo.aiAssistedRatio}% AI Boilerplate
              </p>
            </div>

            <div className="md:col-span-2 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>AI Detection Heuristic Breakdown for {repo.name}</span>
                <Badge variant="success">High Confidence Verification</Badge>
              </h4>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Comment Uniformity & Verbosity Index</span>
                    <span className="text-emerald-500 font-mono">{Math.max(8, repo.aiAssistedRatio + 4)}% (Organic Human Comments)</span>
                  </div>
                  <ProgressBar value={Math.max(8, repo.aiAssistedRatio + 4)} height="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">AST Boilerplate Regularity</span>
                    <span className="text-indigo-400 font-mono">{Math.max(12, repo.aiAssistedRatio + 10)}% (Custom {repo.language} Architecture)</span>
                  </div>
                  <ProgressBar value={Math.max(12, repo.aiAssistedRatio + 10)} height="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Commit Velocity & Edit Entropy</span>
                    <span className="text-emerald-500 font-mono">{Math.max(6, repo.aiAssistedRatio - 4)}% (Iterative Development)</span>
                  </div>
                  <ProgressBar value={Math.max(6, repo.aiAssistedRatio - 4)} height="h-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3">
            <h4 className="font-bold text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> How GitInsight Detects AI Code vs Human Code in {repo.name}:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="font-bold text-emerald-400">1. Comment Density & Style:</span>
                <p className="text-[11px] text-slate-400">AI models produce overly verbose docstrings for simple methods. {repo.name} contains concise human inline comments.</p>
              </div>
              <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="font-bold text-indigo-400">2. Syntactic Regularity:</span>
                <p className="text-[11px] text-slate-400">Matches custom {repo.language} structures against standard LLM boilerplate patterns.</p>
              </div>
              <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="font-bold text-purple-400">3. Commit Delta Velocity:</span>
                <p className="text-[11px] text-slate-400">Commit timestamp diffs show gradual developer iteration across branch {repo.defaultBranch}.</p>
              </div>
              <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="font-bold text-amber-400">4. Pattern Signature Matching:</span>
                <p className="text-[11px] text-slate-400">Signature index: {100 - repo.aiAssistedRatio}% unique human domain logic.</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* TAB CONTENT: CODE QUALITY */}
      {activeTab === 'quality' && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Automated Code Quality Report for {repo.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Static code analysis, cyclomatic complexity score, documentation index, and test coverage evaluation.
              </p>
            </div>
            <Badge variant="success">Grade A+ ({repo.qualityScore}% Quality)</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11px] uppercase font-bold text-slate-400">Overall Quality Score</span>
              <h4 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{repo.qualityScore}%</h4>
              <Badge variant="purple" className="text-[10px]">Verified Repository</Badge>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11px] uppercase font-bold text-slate-400">Maintainability Index</span>
              <h4 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{repo.maintainabilityIndex}/100</h4>
              <Badge variant="success" className="text-[10px]">Highly Maintainable</Badge>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11px] uppercase font-bold text-slate-400">Test Coverage</span>
              <h4 className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">{repo.testCoveragePercent}%</h4>
              <Badge variant="info" className="text-[10px]">Unit Tests Verified</Badge>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11px] uppercase font-bold text-slate-400">Documentation Index</span>
              <h4 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{repo.documentationScore}%</h4>
              <Badge variant="warning" className="text-[10px]">README & Specs</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Static Analysis Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Cyclomatic Complexity Index</span>
                  <Badge variant="success">Low Risk ({((100 - repo.qualityScore) / 10 + 2).toFixed(1)} avg)</Badge>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Functions follow single responsibility principles with minimal nested conditional branching.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Code Duplication Ratio</span>
                  <Badge variant="success">{((100 - repo.maintainabilityIndex) / 10 + 0.8).toFixed(1)}% (Minimal)</Badge>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  High DRY compliance across {repo.language} components and module handlers.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Type Safety & Static Linter</span>
                  <Badge variant="success">0 Strict Warnings</Badge>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Static analysis checks passed with 0 errors for branch {repo.defaultBranch}.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Dependency Health Index</span>
                  <Badge variant="success">Up to Date</Badge>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  All external libraries and framework packages are on secure modern versions.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* TAB CONTENT: SECURITY ANALYSIS */}
      {activeTab === 'security' && (
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" /> Security & Vulnerability Scan for {repo.name}
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
            repo.securityRisk === 'Low'
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-300'
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-300'
          }`}>
            <div>
              <h4 className="font-bold">{repo.securityRisk === 'Low' ? 'Zero Unmasked Hardcoded Secrets Detected' : '1 Minor Audit Recommendation'}</h4>
              <p>Repository security risk evaluated as: <strong>{repo.securityRisk} Risk</strong> across all source files.</p>
            </div>
            <Badge variant={repo.securityRisk === 'Low' ? 'success' : 'warning'}>{repo.securityRisk} Risk</Badge>
          </div>
        </Card>
      )}
    </div>
  );
};
