export type ThemeMode = 'light' | 'dark' | 'system';

export interface User {
  id: string;
  name: string;
  email: string;
  githubUsername?: string;
  avatarUrl?: string;
  role?: string;
  createdAt: string;
}

export interface GitHubProfile {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  followers: number;
  following: number;
  publicRepos: number;
  publicGists: number;
  createdAt: string;
  updatedAt: string;
  profileStrengthScore: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  totalStars: number;
  totalForks: number;
  contributionStreak: number;
  contributionHeatmap: { date: string; count: number }[];
  improvementSuggestions: string[];
}

export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  isPrivate: boolean;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string;
  languages: Record<string, number>;
  updatedAt: string;
  sizeKb: number;
  defaultBranch: string;
  license?: string;
  homepage?: string;
  htmlUrl?: string;
  topics: string[];
  qualityScore: number;
  maintainabilityIndex: number;
  testCoveragePercent: number;
  documentationScore: number;
  architectureType: string;
  securityRisk: 'Low' | 'Medium' | 'High';
  aiAssistedRatio: number;
}

export interface CodeFileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  language?: string;
  children?: CodeFileNode[];
}

export interface CodeAnalysis {
  filePath: string;
  filePurpose: string;
  primaryFunctions: string[];
  inputsOutputs: string;
  dependencies: string[];
  logicFlow: string;
  potentialIssues: string[];
  refactoringSuggestions: string[];
  aiIndicatorScore: number; // 0-100
  aiIndicatorReasoning: string;
  patternsDetected: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'frontend' | 'api' | 'business' | 'data' | 'database' | 'external';
  description: string;
  technologies: string[];
  connectedTo: string[];
}

export interface SkillEvidence {
  skillName: string;
  category: 'Languages' | 'Frameworks' | 'Databases' | 'Cloud' | 'DevOps' | 'Testing' | 'Architecture' | 'Tools';
  proficiencyScore: number; // 0-100
  confidence: 'High' | 'Medium' | 'Low';
  repositoriesCount: number;
  filesCount: number;
  recentUsageDate: string;
  sampleEvidence: {
    repoName: string;
    filePath: string;
    snippet: string;
    description: string;
  }[];
}

export interface JobMatch {
  id: string;
  roleTitle: string;
  companyName: string;
  targetSeniority: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
  overallMatchScore: number; // 0-100
  whyAligned: string;
  requirements: {
    skill: string;
    isRequired: boolean;
    evidenceFound: boolean;
    evidenceStrength: 'Strong' | 'Moderate' | 'Weak' | 'None';
    evidenceDetails: string;
    gapAnalysis: string;
  }[];
  recommendations: string[];
}

export interface SkillGapRoadmapItem {
  id: string;
  weekNumber: number;
  phaseTitle: string;
  targetSkill: string;
  objective: string;
  suggestedProject: string;
  learningResources: { title: string; url: string; type: 'doc' | 'video' | 'course' }[];
  isCompleted: boolean;
}

export interface InterviewQuestion {
  id: string;
  category: 'Project Architecture' | 'Technical Stack' | 'Database & ORM' | 'System Design' | 'Behavioral';
  question: string;
  contextRepo: string;
  contextSnippet?: string;
  sampleAnswerGuidance: string;
}

export interface MockInterviewResult {
  questionId: string;
  userAnswer: string;
  technicalAccuracy: number; // 0-100
  projectUnderstanding: number;
  completeness: number;
  clarity: number;
  aiFeedback: string;
  suggestedImprovement: string;
  followUpQuestion: string;
}

export interface HistoricalAnalysis {
  id: string;
  type: 'profile' | 'repository' | 'job_fit';
  targetName: string;
  timestamp: string;
  qualityScore: number;
  matchedSkillsCount: number;
  summary: string;
}

export interface ProfileComparison {
  beforeDate: string;
  afterDate: string;
  skillsGained: string[];
  reposAdded: number;
  qualityScoreDelta: number;
  docScoreDelta: number;
  jobAlignmentDelta: number;
  resolvedGaps: string[];
}
