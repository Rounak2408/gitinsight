import {
  GitHubProfile,
  Repository,
  CodeFileNode,
  CodeAnalysis,
  ArchitectureNode,
  SkillEvidence,
  JobMatch,
  SkillGapRoadmapItem,
  InterviewQuestion,
  HistoricalAnalysis,
  ProfileComparison,
  User,
} from '../types';

export const mockUser: User = {
  id: 'usr_99812',
  name: 'Alex Rivera',
  email: 'alex.rivera@dev.io',
  githubUsername: 'alexrivera-dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Senior Frontend & .NET Engineer',
  createdAt: '2024-01-15T09:00:00Z',
};

export const mockGitHubProfile: GitHubProfile = {
  username: 'alexrivera-dev',
  name: 'Alex Rivera',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  bio: 'Full-Stack Software Engineer building high-performance .NET Web APIs, TypeScript micro-frontends, and distributed systems.',
  company: 'Apex Tech Labs',
  location: 'San Francisco, CA',
  blog: 'https://alexrivera.dev',
  followers: 482,
  following: 118,
  publicRepos: 24,
  publicGists: 9,
  createdAt: '2021-03-10T12:00:00Z',
  updatedAt: '2026-09-28T14:30:00Z',
  profileStrengthScore: 92,
  topLanguages: [
    { name: 'C#', percentage: 38, color: '#178600' },
    { name: 'TypeScript', percentage: 32, color: '#3178c6' },
    { name: 'SQL', percentage: 14, color: '#e38c00' },
    { name: 'Python', percentage: 10, color: '#3572A5' },
    { name: 'Docker', percentage: 6, color: '#384d54' },
  ],
  totalStars: 340,
  totalForks: 88,
  contributionStreak: 18,
  contributionHeatmap: Array.from({ length: 60 }, (_, i) => ({
    date: new Date(Date.now() - (59 - i) * 86400000).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 12),
  })),
  improvementSuggestions: [
    'Add automated CI/CD GitHub Actions workflows to 3 secondary repositories.',
    'Include explicit Unit Test coverage badges and code coverage reports in READMEs.',
    'Standardize OpenAPI / Swagger endpoint documentation across .NET API projects.',
    'Add Docker Compose setup scripts to simplify local environment bootstrap.',
  ],
};

export const mockRepositories: Repository[] = [
  {
    id: 'repo-1',
    name: 'enterprise-cqrs-api',
    owner: 'alexrivera-dev',
    description: 'Clean Architecture ASP.NET Core 9 Web API featuring CQRS pattern, MediatR, Entity Framework Core, PostgreSQL, and Redis caching.',
    isPrivate: false,
    stars: 184,
    forks: 42,
    watchers: 29,
    openIssues: 3,
    language: 'C#',
    languages: { 'C#': 82, Dockerfile: 10, PowerShell: 8 },
    updatedAt: '2026-09-29T18:20:00Z',
    sizeKb: 14200,
    defaultBranch: 'main',
    license: 'MIT',
    topics: ['dotnet', 'aspnetcore', 'cqrs', 'mediatr', 'clean-architecture', 'postgresql'],
    qualityScore: 94,
    maintainabilityIndex: 91,
    testCoveragePercent: 88,
    documentationScore: 95,
    architectureType: 'Clean Architecture (CQRS + DDD)',
    securityRisk: 'Low',
    aiAssistedRatio: 12,
  },
  {
    id: 'repo-2',
    name: 'nexus-design-system',
    owner: 'alexrivera-dev',
    description: 'Enterprise React 19 + TypeScript component library built with Tailwind CSS v4, Framer Motion, and Storybook documentation.',
    isPrivate: false,
    stars: 96,
    forks: 24,
    watchers: 15,
    openIssues: 1,
    language: 'TypeScript',
    languages: { TypeScript: 74, CSS: 20, HTML: 6 },
    updatedAt: '2026-09-20T11:45:00Z',
    sizeKb: 8900,
    defaultBranch: 'main',
    license: 'MIT',
    topics: ['react', 'typescript', 'tailwindcss', 'design-system', 'storybook'],
    qualityScore: 91,
    maintainabilityIndex: 89,
    testCoveragePercent: 92,
    documentationScore: 90,
    architectureType: 'Atomic Component Library',
    securityRisk: 'Low',
    aiAssistedRatio: 8,
  },
  {
    id: 'repo-3',
    name: 'distributed-order-service',
    owner: 'alexrivera-dev',
    description: 'Event-driven microservice system using RabbitMQ, Apache Kafka, and Docker containers for real-time inventory synchronization.',
    isPrivate: false,
    stars: 45,
    forks: 12,
    watchers: 8,
    openIssues: 5,
    language: 'C#',
    languages: { 'C#': 65, Python: 25, Dockerfile: 10 },
    updatedAt: '2026-08-14T09:15:00Z',
    sizeKb: 19800,
    defaultBranch: 'main',
    license: 'Apache-2.0',
    topics: ['microservices', 'rabbitmq', 'kafka', 'docker', 'event-driven'],
    qualityScore: 86,
    maintainabilityIndex: 84,
    testCoveragePercent: 74,
    documentationScore: 82,
    architectureType: 'Event-Driven Microservices',
    securityRisk: 'Medium',
    aiAssistedRatio: 18,
  },
  {
    id: 'repo-4',
    name: 'sql-query-optimizer-cli',
    owner: 'alexrivera-dev',
    description: 'Python CLI tool for analyzing PostgreSQL query execution plans, detecting missing indexes, and proposing structural schema fixes.',
    isPrivate: false,
    stars: 15,
    forks: 10,
    watchers: 4,
    openIssues: 0,
    language: 'Python',
    languages: { Python: 92, Shell: 8 },
    updatedAt: '2026-07-02T16:30:00Z',
    sizeKb: 3400,
    defaultBranch: 'main',
    license: 'MIT',
    topics: ['python', 'postgresql', 'database-optimization', 'cli'],
    qualityScore: 89,
    maintainabilityIndex: 88,
    testCoveragePercent: 85,
    documentationScore: 88,
    architectureType: 'Modular CLI Tool',
    securityRisk: 'Low',
    aiAssistedRatio: 5,
  },
];

export const mockCodeFileTree: CodeFileNode = {
  name: 'enterprise-cqrs-api',
  path: '/',
  type: 'directory',
  children: [
    {
      name: 'src',
      path: '/src',
      type: 'directory',
      children: [
        {
          name: 'Core',
          path: '/src/Core',
          type: 'directory',
          children: [
            {
              name: 'Application',
              path: '/src/Core/Application',
              type: 'directory',
              children: [
                { name: 'CreateOrderCommand.cs', path: '/src/Core/Application/CreateOrderCommand.cs', type: 'file', size: 2450, language: 'csharp' },
                { name: 'GetOrderByIdQuery.cs', path: '/src/Core/Application/GetOrderByIdQuery.cs', type: 'file', size: 1890, language: 'csharp' },
              ]
            },
            {
              name: 'Domain',
              path: '/src/Core/Domain',
              type: 'directory',
              children: [
                { name: 'Order.cs', path: '/src/Core/Domain/Order.cs', type: 'file', size: 3100, language: 'csharp' },
                { name: 'OrderItem.cs', path: '/src/Core/Domain/OrderItem.cs', type: 'file', size: 1420, language: 'csharp' },
              ]
            }
          ]
        },
        {
          name: 'Infrastructure',
          path: '/src/Infrastructure',
          type: 'directory',
          children: [
            { name: 'AppDbContext.cs', path: '/src/Infrastructure/AppDbContext.cs', type: 'file', size: 4200, language: 'csharp' },
            { name: 'JwtTokenGenerator.cs', path: '/src/Infrastructure/JwtTokenGenerator.cs', type: 'file', size: 2800, language: 'csharp' },
          ]
        },
        {
          name: 'WebApi',
          path: '/src/WebApi',
          type: 'directory',
          children: [
            { name: 'OrdersController.cs', path: '/src/WebApi/OrdersController.cs', type: 'file', size: 3650, language: 'csharp' },
            { name: 'Program.cs', path: '/src/WebApi/Program.cs', type: 'file', size: 2900, language: 'csharp' },
          ]
        }
      ]
    },
    { name: 'docker-compose.yml', path: '/docker-compose.yml', type: 'file', size: 1250, language: 'yaml' },
    { name: 'README.md', path: '/README.md', type: 'file', size: 4800, language: 'markdown' },
  ]
};

export const mockCodeContentSample: Record<string, string> = {
  '/src/Core/Application/CreateOrderCommand.cs': `using MediatR;
using EnterpriseCqrs.Domain;
using EnterpriseCqrs.Infrastructure;

namespace EnterpriseCqrs.Application.Orders.Commands;

public record CreateOrderCommand(
    string CustomerId,
    List<OrderItemDto> Items,
    string ShippingAddress
) : IRequest<OrderResponseDto>;

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, OrderResponseDto>
{
    private readonly IAppDbContext _context;
    private readonly IEventPublisher _publisher;

    public CreateOrderCommandHandler(IAppDbContext context, IEventPublisher publisher)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _publisher = publisher ?? throw new ArgumentNullException(nameof(publisher));
    }

    public async Task<OrderResponseDto> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var order = new Order(request.CustomerId, request.ShippingAddress);
        foreach (var item in request.Items)
        {
            order.AddItem(item.ProductId, item.Quantity, item.UnitPrice);
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync(cancellationToken);

        await _publisher.PublishAsync(new OrderCreatedEvent(order.Id, order.CustomerId), cancellationToken);

        return new OrderResponseDto(order.Id, order.Status.ToString(), order.TotalAmount);
    }
}`,
  '/src/Infrastructure/JwtTokenGenerator.cs': `using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace EnterpriseCqrs.Infrastructure.Auth;

public class JwtTokenGenerator : ITokenGenerator
{
    private readonly JwtSettings _jwtSettings;

    public JwtTokenGenerator(Microsoft.Extensions.Options.IOptions<JwtSettings> jwtOptions)
    {
        _jwtSettings = jwtOptions.Value;
    }

    public string GenerateToken(User user, IEnumerable<string> roles)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(_jwtSettings.ExpiryHours),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            ),
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}`
};

export const mockCodeAnalysisSample: Record<string, CodeAnalysis> = {
  '/src/Core/Application/CreateOrderCommand.cs': {
    filePath: '/src/Core/Application/CreateOrderCommand.cs',
    filePurpose: 'Encapsulates the CQRS Command and Command Handler for creating new customer orders in the system.',
    primaryFunctions: [
      'CreateOrderCommand: Immutable record defining input parameters for order creation.',
      'CreateOrderCommandHandler.Handle: Orchestrates database entity persistence and event publishing in a transaction boundary.'
    ],
    inputsOutputs: 'Input: Customer ID, Order Items array, Shipping Address. Output: OrderResponseDto containing generated Order ID, Status, and Total.',
    dependencies: ['MediatR', 'EnterpriseCqrs.Domain', 'IAppDbContext', 'IEventPublisher'],
    logicFlow: '1. Validate dependencies -> 2. Instantiate domain Order -> 3. Add item lines -> 4. Persist via EF Core -> 5. Emit OrderCreated domain event -> 6. Return DTO',
    potentialIssues: [
      'Database transaction is not explicitly wrapped around EF Core save and Event Publisher; if event publishing fails after save, domain state might desynchronize.',
      'Consider using MediatR FluentValidation Pipeline Behavior for input validation before handler entry.'
    ],
    refactoringSuggestions: [
      'Implement Outbox Pattern for domain event publishing to ensure transactional consistency.',
      'Inject explicit IDateTimeProvider for deterministic unit testing of order timestamps.'
    ],
    aiIndicatorScore: 14,
    aiIndicatorReasoning: 'Code exhibits high human engineering intent: customized domain logic, defensive null guards, domain event dispatching, and standard .NET MediatR conventions.',
    patternsDetected: ['CQRS Pattern', 'Domain-Driven Design (DDD)', 'Dependency Injection Guard', 'Event-Driven Dispatch']
  },
  '/src/Infrastructure/JwtTokenGenerator.cs': {
    filePath: '/src/Infrastructure/JwtTokenGenerator.cs',
    filePurpose: 'Provides cryptographically signed JWT bearer tokens for authenticated API sessions.',
    primaryFunctions: [
      'GenerateToken: Constructs ClaimsIdentity with user roles and signs HMAC-SHA256 bearer token.'
    ],
    inputsOutputs: 'Input: User entity, collection of role strings. Output: Signed JWT String token.',
    dependencies: ['System.IdentityModel.Tokens.Jwt', 'Microsoft.IdentityModel.Tokens'],
    logicFlow: '1. Load secret key from options -> 2. Construct claims list -> 3. Set expiration time -> 4. Sign with HMAC-SHA256 -> 5. Return JWT string',
    potentialIssues: [
      'Ensure JwtSettings.SecretKey is fetched strictly from environment variables or Azure Key Vault, never hardcoded in appsettings.json.'
    ],
    refactoringSuggestions: [
      'Add Refresh Token generation method to handle token renewal without forcing user re-authentication.'
    ],
    aiIndicatorScore: 8,
    aiIndicatorReasoning: 'Standard security implementation adhering strictly to ASP.NET Core authentication standards.',
    patternsDetected: ['Options Pattern', 'Security Token Handler', 'Role-Based Access Control']
  }
};

export const mockArchitectureNodes: ArchitectureNode[] = [
  {
    id: 'arch-1',
    label: 'React Micro-Frontend',
    type: 'frontend',
    description: 'Single Page Application written in React 19 + TypeScript, consuming REST endpoints with TanStack Query.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
    connectedTo: ['arch-2']
  },
  {
    id: 'arch-2',
    label: 'API Gateway / Web API',
    type: 'api',
    description: 'ASP.NET Core Web API exposing RESTful controllers, rate limiting, and JWT authentication middleware.',
    technologies: ['ASP.NET Core 9', 'C#', 'Swagger', 'JWT Auth'],
    connectedTo: ['arch-3']
  },
  {
    id: 'arch-3',
    label: 'Application & CQRS Layer',
    type: 'business',
    description: 'MediatR pipeline handling CQRS commands, domain validations, and event dispatches.',
    technologies: ['MediatR', 'FluentValidation', 'AutoMapper'],
    connectedTo: ['arch-4', 'arch-6']
  },
  {
    id: 'arch-4',
    label: 'EF Core Data Access',
    type: 'data',
    description: 'Entity Framework Core 9 repository abstractions and PostgreSQL DbContext mapping.',
    technologies: ['EF Core 9', 'PostgreSQL Provider', 'Dapper'],
    connectedTo: ['arch-5']
  },
  {
    id: 'arch-5',
    label: 'PostgreSQL Database',
    type: 'database',
    description: 'Relational database housing normalized orders, users, and audit trail tables.',
    technologies: ['PostgreSQL 16', 'TimescaleDB'],
    connectedTo: []
  },
  {
    id: 'arch-6',
    label: 'Distributed Redis Cache & Event Bus',
    type: 'external',
    description: 'Redis cluster for high-speed query response caching and RabbitMQ broker for domain events.',
    technologies: ['Redis', 'RabbitMQ', 'MassTransit'],
    connectedTo: []
  }
];

export const mockSkillEvidences: SkillEvidence[] = [
  {
    skillName: 'C# / .NET 9',
    category: 'Languages',
    proficiencyScore: 94,
    confidence: 'High',
    repositoriesCount: 12,
    filesCount: 84,
    recentUsageDate: '2026-09-29',
    sampleEvidence: [
      {
        repoName: 'enterprise-cqrs-api',
        filePath: '/src/Core/Application/CreateOrderCommand.cs',
        snippet: 'public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, OrderResponseDto>',
        description: 'Implements CQRS command pipeline with async MediatR handlers.'
      },
      {
        repoName: 'distributed-order-service',
        filePath: '/src/Services/InventoryService.cs',
        snippet: 'public async Task SyncInventoryAsync(CancellationToken cancellationToken)',
        description: 'Handles asynchronous worker background services.'
      }
    ]
  },
  {
    skillName: 'TypeScript & React',
    category: 'Frameworks',
    proficiencyScore: 90,
    confidence: 'High',
    repositoriesCount: 8,
    filesCount: 62,
    recentUsageDate: '2026-09-20',
    sampleEvidence: [
      {
        repoName: 'nexus-design-system',
        filePath: '/src/components/DataTable.tsx',
        snippet: 'export const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {',
        description: 'Generic strongly-typed reusable data table component with custom sorting.'
      }
    ]
  },
  {
    skillName: 'PostgreSQL & SQL',
    category: 'Databases',
    proficiencyScore: 88,
    confidence: 'High',
    repositoriesCount: 9,
    filesCount: 45,
    recentUsageDate: '2026-09-28',
    sampleEvidence: [
      {
        repoName: 'enterprise-cqrs-api',
        filePath: '/src/Infrastructure/AppDbContext.cs',
        snippet: 'modelBuilder.Entity<Order>().HasIndex(o => o.CustomerId).HasDatabaseName("IX_Orders_CustomerId");',
        description: 'Fluent API database schema mapping and index optimizations.'
      }
    ]
  },
  {
    skillName: 'Docker & Containerization',
    category: 'DevOps',
    proficiencyScore: 82,
    confidence: 'High',
    repositoriesCount: 6,
    filesCount: 14,
    recentUsageDate: '2026-08-14',
    sampleEvidence: [
      {
        repoName: 'distributed-order-service',
        filePath: '/docker-compose.yml',
        snippet: 'services:\n  rabbitmq:\n    image: rabbitmq:3-management-alpine\n    ports:\n      - "5672:5672"',
        description: 'Multi-container orchestration setup with volume mounts and network bridges.'
      }
    ]
  },
  {
    skillName: 'Python & Data Tools',
    category: 'Languages',
    proficiencyScore: 78,
    confidence: 'Medium',
    repositoriesCount: 4,
    filesCount: 18,
    recentUsageDate: '2026-07-02',
    sampleEvidence: [
      {
        repoName: 'sql-query-optimizer-cli',
        filePath: '/optimizer/cli.py',
        snippet: 'def analyze_explain_plan(plan_json: dict) -> List[Recommendation]:',
        description: 'Parses JSON execution trees and constructs tuning recommendations.'
      }
    ]
  }
];

export const mockJobMatches: JobMatch[] = [
  {
    id: 'job-1',
    roleTitle: 'Senior .NET / Full-Stack Engineer',
    companyName: 'FinTech Cloud Technologies',
    targetSeniority: 'Senior',
    overallMatchScore: 94,
    whyAligned: 'Your GitHub profile demonstrates exceptional mastery of ASP.NET Core CQRS APIs, Entity Framework Core, Redis, PostgreSQL, and TypeScript frontends.',
    requirements: [
      { skill: 'C# & ASP.NET Core', isRequired: true, evidenceFound: true, evidenceStrength: 'Strong', evidenceDetails: 'Demonstrated in enterprise-cqrs-api & distributed-order-service with clean CQRS architecture.', gapAnalysis: 'No gap identified.' },
      { skill: 'TypeScript & React', isRequired: true, evidenceFound: true, evidenceStrength: 'Strong', evidenceDetails: 'Demonstrated in nexus-design-system with generic custom components.', gapAnalysis: 'No gap identified.' },
      { skill: 'SQL & PostgreSQL', isRequired: true, evidenceFound: true, evidenceStrength: 'Strong', evidenceDetails: 'Optimized EF Core DbContext mappings & index configurations.', gapAnalysis: 'No gap identified.' },
      { skill: 'Docker & Microservices', isRequired: true, evidenceFound: true, evidenceStrength: 'Moderate', evidenceDetails: 'Docker compose and RabbitMQ event streaming in distributed-order-service.', gapAnalysis: 'Could benefit from Kubernetes (k8s) cluster config files.' },
      { skill: 'AWS / Cloud Architecture', isRequired: false, evidenceFound: false, evidenceStrength: 'None', evidenceDetails: 'No direct AWS infrastructure terraform/bicep templates found.', gapAnalysis: 'Target Cloud IaC skills like Terraform or AWS CDK.' },
    ],
    recommendations: [
      'Add a Terraform or Bicep infrastructure-as-code repository to demonstrate Cloud deployment experience.',
      'Document Kubernetes manifest files (.yaml) alongside Docker Compose setups.'
    ]
  },
  {
    id: 'job-2',
    roleTitle: 'Lead Frontend Architect (React + TS)',
    companyName: 'Vanguard SaaS Solutions',
    targetSeniority: 'Senior',
    overallMatchScore: 86,
    whyAligned: 'Strong React 19 and TypeScript architectural evidence in nexus-design-system.',
    requirements: [
      { skill: 'TypeScript', isRequired: true, evidenceFound: true, evidenceStrength: 'Strong', evidenceDetails: 'nexus-design-system library.', gapAnalysis: 'No gap.' },
      { skill: 'React 19 & State Management', isRequired: true, evidenceFound: true, evidenceStrength: 'Strong', evidenceDetails: 'React hooks and query state integration.', gapAnalysis: 'No gap.' },
      { skill: 'Micro-frontends / Webpack Module Federation', isRequired: true, evidenceFound: false, evidenceStrength: 'None', evidenceDetails: 'Vite single app build present, no Module Federation configuration.', gapAnalysis: 'Build a small multi-app module federation proof of concept.' },
    ],
    recommendations: [
      'Include performance auditing benchmark reports in your design system repo.'
    ]
  }
];

export const mockRoadmapItems: SkillGapRoadmapItem[] = [
  {
    id: 'rd-1',
    weekNumber: 1,
    phaseTitle: 'Cloud Infrastructure & IaC',
    targetSkill: 'Terraform & AWS / Azure IaC',
    objective: 'Create declarative infrastructure scripts to automatically provision PostgreSQL, Redis, and Web API containers on Azure App Services or AWS ECS.',
    suggestedProject: 'cloud-infrastructure-template: Provision Azure Container Apps & PostgreSQL via Terraform',
    learningResources: [
      { title: 'HashiCorp Terraform Documentation for Azure', url: 'https://registry.terraform.io/', type: 'doc' },
      { title: 'ASP.NET Core Deployment to Azure App Service', url: 'https://learn.microsoft.com', type: 'video' }
    ],
    isCompleted: true,
  },
  {
    id: 'rd-2',
    weekNumber: 2,
    phaseTitle: 'Container Orchestration',
    targetSkill: 'Kubernetes (K8s) & Helm',
    objective: 'Write Kubernetes deployment manifests, secrets, ingress controllers, and Helm charts for your microservice APIs.',
    suggestedProject: 'k8s-microservices-helm: Local Minikube deployment manifest for distributed-order-service',
    learningResources: [
      { title: 'Kubernetes Official Documentation for Developers', url: 'https://kubernetes.io/docs/', type: 'doc' }
    ],
    isCompleted: false,
  },
  {
    id: 'rd-3',
    weekNumber: 3,
    phaseTitle: 'Advanced Observability',
    targetSkill: 'OpenTelemetry, Prometheus & Grafana',
    objective: 'Integrate distributed tracing and metric collection across ASP.NET Core APIs and background workers.',
    suggestedProject: 'opentelemetry-net-sample: Prometheus metrics exporter & Grafana dashboard config',
    learningResources: [
      { title: 'OpenTelemetry .NET Instrumentation Guide', url: 'https://opentelemetry.io/docs/languages/net/', type: 'doc' }
    ],
    isCompleted: false,
  },
  {
    id: 'rd-4',
    weekNumber: 4,
    phaseTitle: 'System Design & High Availability',
    targetSkill: 'Distributed System Resilience',
    objective: 'Implement Polly circuit breaker policies and retry mechanisms in HTTP client pipelines.',
    suggestedProject: 'resilient-http-pipeline: ASP.NET Core Polly integration demo with fault injection tests',
    learningResources: [
      { title: 'Polly Resilience Strategies in .NET 9', url: 'https://github.com/App-vNext/Polly', type: 'doc' }
    ],
    isCompleted: false,
  }
];

export const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'q-1',
    category: 'Project Architecture',
    question: 'In your enterprise-cqrs-api project, how did you decouple Command Handlers from the HTTP Controllers, and what benefits did MediatR provide?',
    contextRepo: 'enterprise-cqrs-api',
    contextSnippet: 'public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, OrderResponseDto>',
    sampleAnswerGuidance: 'Explain that MediatR serves as an in-process messaging mediator. Controllers simply dispatch command records without knowing handler implementation details. This achieves single responsibility and easy unit testing.'
  },
  {
    id: 'q-2',
    category: 'Technical Stack',
    question: 'You generated JWT bearer tokens in JwtTokenGenerator.cs. How do you handle token revocation and secret key management securely in production?',
    contextRepo: 'enterprise-cqrs-api',
    contextSnippet: 'var tokenDescriptor = new SecurityTokenDescriptor { Subject = new ClaimsIdentity(claims), ... };',
    sampleAnswerGuidance: 'Discuss storing secrets in Azure Key Vault or AWS Secrets Manager. For revocation, mention short-lived JWT access tokens paired with refresh tokens stored in Redis for immediate invalidation.'
  },
  {
    id: 'q-3',
    category: 'Database & ORM',
    question: 'How do you prevent N+1 query problems in Entity Framework Core when loading related domain entities in your Order queries?',
    contextRepo: 'enterprise-cqrs-api',
    sampleAnswerGuidance: 'Mention using .Include() and .ThenInclude() for explicit eager loading, or projecting directly into DTOs via .Select() so EF Core emits optimal SQL JOIN statements.'
  },
  {
    id: 'q-4',
    category: 'System Design',
    question: 'How would you scale your distributed-order-service to handle a 10x surge in concurrent order creation traffic?',
    contextRepo: 'distributed-order-service',
    sampleAnswerGuidance: 'Propose asynchronous queueing via RabbitMQ/Kafka, decoupling HTTP acceptance from order processing, horizontal pod autoscaling in Kubernetes, and Redis caching for product inventory.'
  }
];

export const mockHistoryLogs: HistoricalAnalysis[] = [
  {
    id: 'hist-1',
    type: 'repository',
    targetName: 'alexrivera-dev/enterprise-cqrs-api',
    timestamp: '2026-09-29T18:30:00Z',
    qualityScore: 94,
    matchedSkillsCount: 6,
    summary: 'Analyzed ASP.NET Core CQRS architecture, EF Core database models, and MediatR command pipeline.',
  },
  {
    id: 'hist-2',
    type: 'profile',
    targetName: 'alexrivera-dev',
    timestamp: '2026-09-28T14:30:00Z',
    qualityScore: 92,
    matchedSkillsCount: 12,
    summary: 'Full profile analysis completed across 24 public repositories. High skill alignment in .NET & React.',
  },
  {
    id: 'hist-3',
    type: 'job_fit',
    targetName: 'FinTech Cloud Technologies - Senior .NET Engineer',
    timestamp: '2026-09-25T10:15:00Z',
    qualityScore: 94,
    matchedSkillsCount: 5,
    summary: 'Matched profile skills against FinTech JD requirements with 94% alignment score.',
  },
];

export const mockProfileComparison: ProfileComparison = {
  beforeDate: '2026-06-01',
  afterDate: '2026-09-30',
  skillsGained: ['PostgreSQL Index Optimization', 'Redis Caching Strategy', 'Tailwind CSS v4 Engine', 'MediatR Pipeline Behaviors'],
  reposAdded: 3,
  qualityScoreDelta: +8,
  docScoreDelta: +12,
  jobAlignmentDelta: +15,
  resolvedGaps: ['Demonstrated CQRS pattern', 'Added comprehensive README setup instructions'],
};
