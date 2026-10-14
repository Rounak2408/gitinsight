import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Mic,
  ArrowRight,
  Minimize2,
  Maximize2,
  Trash2,
  Code2,
  Briefcase,
  Compass,
  FileText,
  Search,
  CheckCircle2,
  CornerDownLeft,
  ChevronRight,
  Terminal,
  Zap,
} from 'lucide-react';
import { Badge, Button } from './Primitives';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    path: string;
    icon?: string;
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    sender: 'assistant',
    text: "Namaste! Main hoon aapka **GitAssistant AI** 🤖\n\nAap mujhse codebase architecture, skills intelligence, GitHub scanning, ya **AI Mock Interview** ke baare me kuch bhi pooch sakte hain. Boliye, main aapki kya madad karoon?",
    timestamp: 'Just now',
    action: {
      label: '🎙️ Start AI Mock Interview',
      path: '/interview',
      icon: 'mic',
    },
  },
];

const SUGGESTIONS = [
  '🎙️ Hme interview dena h',
  '🔍 Mera profile scan kro',
  '🚀 Code quality score kaise badhaye?',
  '💼 Best career fit job kaun si h?',
  '📄 Executive PDF report kaise nikale?',
];

export const GitAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('gitinsight_assistant_chat');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MESSAGES;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('gitinsight_assistant_chat', JSON.stringify(messages));
    } catch {}
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';

  // Smart Response & Autonomous Control Generator
  const generateAssistantResponse = (userPrompt: string): { text: string; action?: { label: string; path: string; icon?: string } } => {
    const prompt = userPrompt.toLowerCase().trim();

    // 1. Interview Intent (English, Hindi, Hinglish)
    if (
      prompt.includes('interview') ||
      prompt.includes('intreview') ||
      prompt.includes('intervew') ||
      prompt.includes('mock') ||
      prompt.includes('viva') ||
      prompt.includes('dena h') ||
      prompt.includes('dena hai') ||
      prompt.includes('test dena')
    ) {
      setTimeout(() => {
        // Offer quick navigation
      }, 500);

      return {
        text: `🎯 **AI Mock Interview Engine Ready!**\n\nGitInsight ka AI Interview Preparation section aapke actual GitHub repositories (jaise *gitinsight*, *odoo-HR-mangment-System*, *NEXUS-OBSERVE*) ke source code aur CQRS architecture se real-time technical questions generate karta hai!\n\n🎙️ **Kaise kaam karta hai:**\n1. **Voice-to-Voice AI:** Aap microphone se bol kar answer de sakte hain.\n2. **Live Code Context:** Question ke sath aapka actual repository snippet attach hota hai.\n3. **Real-Time Evaluation:** AI aapki clarity, technical depth, aur architectural accuracy ko evaluate karke scorecard banata hai.\n\nNeeche diye gaye button par click karein, main direct aapko Interview section me le chal raha hoon! 👇`,
        action: {
          label: '🎙️ Go to AI Mock Interview Session',
          path: '/interview',
          icon: 'mic',
        },
      };
    }

    // 2. Scan / Analyze Profile Intent
    if (
      prompt.includes('scan') ||
      prompt.includes('analyze') ||
      prompt.includes('analise') ||
      prompt.includes('github profile') ||
      prompt.includes('check profile')
    ) {
      return {
        text: `🔍 **GitHub Analyzer Controller:**\n\nAap kisi bhi public GitHub username ya repository URL ko instant ingest kar sakte hain. Hum live commit history, repository language ratios, aur code complexity trees extract karte hain.\n\nAapka active user profile: **@${activeUser}** hai.`,
        action: {
          label: '🔍 Open GitHub Profile Analyzer',
          path: '/analyzer',
          icon: 'search',
        },
      };
    }

    // 3. Repositories & Code Quality
    if (
      prompt.includes('repo') ||
      prompt.includes('code quality') ||
      prompt.includes('maintainability') ||
      prompt.includes('security') ||
      prompt.includes('inspect')
    ) {
      return {
        text: `📁 **Repository Intelligence Inspector:**\n\nAapke pass **24 Public Repositories** hain jinme top projects: **gitinsight** (80%), **odoo-HR-mangment-System** (93%), aur **NEXUS-OBSERVE** (94% score) verified hain!\n\nOverall repository quality score **91/100** hai with Clean Architecture & CQRS standards.`,
        action: {
          label: '📁 View All Repositories',
          path: '/repositories',
          icon: 'code',
        },
      };
    }

    // 4. Skills & Technologies Intent
    if (
      prompt.includes('skill') ||
      prompt.includes('tech') ||
      prompt.includes('language') ||
      prompt.includes('typescript') ||
      prompt.includes('c#') ||
      prompt.includes('python')
    ) {
      return {
        text: `⚡ **Demonstrated Skills Intelligence:**\n\nAapke repositories se **18 verified technologies** extract hui hain:\n- **TypeScript:** 45% evidence distribution (Primary Stack)\n- **JavaScript:** 28% codebase\n- **CSS & Frontend UI:** 12%\n- **Python & C#:** 15%\n\nFull Skills Radar aur verified code proofs dekhne ke liye Skills section open karein:`,
        action: {
          label: '⚡ Open Skills Intelligence Radar',
          path: '/skills',
          icon: 'compass',
        },
      };
    }

    // 5. Career Fit & Jobs Intent
    if (
      prompt.includes('career') ||
      prompt.includes('job') ||
      prompt.includes('role') ||
      prompt.includes('fit') ||
      prompt.includes('placement') ||
      prompt.includes('hire')
    ) {
      return {
        text: `💼 **Career Fit & Job Alignment:**\n\nAapka GitHub code evidence **Full Stack TypeScript / Web Application Engineer** role ke sath **98% Match** karta hai!\n\nAI Recommendations:\n- Automated CI/CD GitHub Actions add karein.\n- Docker Compose containers include karein rapid local testing ke liye.`,
        action: {
          label: '💼 Check Job Fit Alignment Matrix',
          path: '/career',
          icon: 'briefcase',
        },
      };
    }

    // 6. Resume / JD Analyzer Intent
    if (
      prompt.includes('jd') ||
      prompt.includes('job description') ||
      prompt.includes('resume') ||
      prompt.includes('cv') ||
      prompt.includes('match score')
    ) {
      return {
        text: `📄 **JD & Resume Match Analyzer:**\n\nAap kisi bhi company ki Job Description paste karke dekh sakte hain ki aapke actual GitHub code me kaun se skills match ho rahe hain aur kaun se skill gaps hain.`,
        action: {
          label: '📄 Open JD Analyzer',
          path: '/jd-analyzer',
          icon: 'file',
        },
      };
    }

    // 7. Career Roadmap Intent
    if (
      prompt.includes('roadmap') ||
      prompt.includes('future') ||
      prompt.includes('plan') ||
      prompt.includes('kaise sikhe')
    ) {
      return {
        text: `🧭 **Personalized Career Roadmap:**\n\nAI ne aapke gap analysis ke basis par step-by-step milestones generate kiye hain taaki aap Tier-1 companies aur High-Paying Engineering roles ke liye 100% ready ho sakein.`,
        action: {
          label: '🧭 View Career Roadmap Milestones',
          path: '/roadmap',
          icon: 'compass',
        },
      };
    }

    // 8. PDF / Executive Report Intent
    if (
      prompt.includes('report') ||
      prompt.includes('pdf') ||
      prompt.includes('print') ||
      prompt.includes('download') ||
      prompt.includes('export')
    ) {
      return {
        text: `📊 **Executive Intelligence Report:**\n\nAap recruiters, hiring managers, ya faculty review ke liye **Print-Ready PDF Reports** generate kar sakte hain with architecture diagrams, radar charts, and code quality breakdown.`,
        action: {
          label: '📊 Open Executive Report Generator',
          path: '/reports',
          icon: 'file',
        },
      };
    }

    // 9. General Technical / AI Assistant Query
    return {
      text: `🤖 **GitAssistant Intelligence:**\n\nAapka sawal tha: "*${userPrompt}*"\n\nMain aapke pure GitInsight platform ko monitor kar raha hoon:\n- **Active Developer:** ${activeUser}\n- **Current View:** ${location.pathname}\n- **Engine Status:** Ingestion active, Mock/Live AI fallback healthy.\n\nAap mujhse kisi bhi section ke baare me pooch sakte hain ya direct command de sakte hain jaise *"Take my interview"*, *"Scan profile"*, ya *"Show my career matches"*.`,
      action: {
        label: '🏠 Explore Overview Dashboard',
        path: '/dashboard',
      },
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const response = generateAssistantResponse(query);
      const assistantMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        action: response.action,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (path: string) => {
    navigate(path);
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('gitinsight_assistant_chat');
  };

  return (
    <>
      {/* --- FLOATING CHATBOT LAUNCHER BUTTON --- */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-xl shadow-indigo-600/35 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
            <Bot className="w-5 h-5 text-white" />
            <span className="font-bold text-xs tracking-wide">Ask GitAssistant</span>
            <Badge variant="purple" className="bg-white/20 text-white border-none text-[10px] py-0 px-1.5 ml-1">
              AI 2.5
            </Badge>
          </button>
        )}
      </div>

      {/* --- EXPANDABLE CHATBOT WINDOW --- */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 ${
            isExpanded
              ? 'w-[90vw] sm:w-[560px] h-[85vh] max-h-[750px]'
              : 'w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm tracking-tight text-white">GitAssistant AI</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-400">Autonomous Developer & Career Copilot</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={clearChat}
                title="Clear conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Shrink window' : 'Expand window'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Pill */}
          <div className="px-4 py-1.5 bg-indigo-50/80 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-500" />
              Monitoring: <strong className="text-indigo-600 dark:text-indigo-400">@{activeUser}</strong>
            </span>
            <span className="text-[10px] text-slate-400">Current page: {location.pathname}</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/80 dark:border-slate-700/60 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  {/* Interactive Action Button (e.g. Navigation) */}
                  {msg.action && (
                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                      <button
                        onClick={() => handleActionClick(msg.action!.path)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                      >
                        {msg.action.icon === 'mic' && <Mic className="w-3.5 h-3.5 text-emerald-300" />}
                        {msg.action.icon === 'search' && <Search className="w-3.5 h-3.5" />}
                        {msg.action.icon === 'code' && <Code2 className="w-3.5 h-3.5" />}
                        {msg.action.icon === 'compass' && <Compass className="w-3.5 h-3.5" />}
                        {msg.action.icon === 'file' && <FileText className="w-3.5 h-3.5" />}
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/90 w-24 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            {SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSend(sug)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything or say 'hme interview dena h'..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/50 border border-transparent dark:focus:border-indigo-500 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
