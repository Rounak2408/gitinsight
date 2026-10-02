import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX, ChevronRight, ChevronLeft, Bot, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Textarea, Card, Badge, ProgressRing } from '../components/ui/Primitives';
import { interviewApi } from '../services/api/gitInsightServices';
import { InterviewQuestion, MockInterviewResult } from '../types';

export const MockInterviewSessionPage: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<MockInterviewResult | null>(null);

  // Speech Recognition & Synthesis states
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [autoSpeechEnabled, setAutoSpeechEnabled] = useState<boolean>(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const activeUser = localStorage.getItem('gitinsight_active_user') || 'rounak2408';
    interviewApi.getQuestions(activeUser).then((data) => setQuestions(data));
  }, []);

  // Initialize Speech Recognition if supported by browser
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (currentTranscript) {
          setUserAnswer((prev) => prev ? `${prev.trim()} ${currentTranscript.trim()}` : currentTranscript.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const currentQ = questions[currentIndex] || {
    id: 'q-1',
    category: 'Project Architecture',
    question: 'In your enterprise-cqrs-api project, how did you decouple Command Handlers from the HTTP Controllers, and what benefits did MediatR provide?',
    contextRepo: 'enterprise-cqrs-api',
    contextSnippet: 'public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, OrderResponseDto>',
    sampleAnswerGuidance: 'Explain in-process mediator pattern.'
  };

  // Toggle Voice Input (Mic)
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Voice Speech Recognition is not supported by your browser. Please try Google Chrome or MS Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  // Speak Question / Feedback using SpeechSynthesis
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setIsEvaluating(true);
    try {
      const res = await interviewApi.submitAnswer(currentQ.id, userAnswer);
      setResult(res);
      if (autoSpeechEnabled && res?.aiFeedback) {
        speakText(`Technical score ${res.technicalAccuracy} percent. ${res.aiFeedback}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setResult(null);
      if (isSpeaking) window.speechSynthesis.cancel();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setUserAnswer('');
      setResult(null);
      if (isSpeaking) window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <Link to="/interview" className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Questions
        </Link>
        <div className="flex items-center gap-3">
          <Badge variant="purple">Question {currentIndex + 1} of {questions.length || 4}</Badge>
          <div className="flex items-center gap-1">
            <Button size="xs" variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button size="xs" variant="outline" onClick={handleNext} disabled={currentIndex >= questions.length - 1}>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Voice-to-Voice Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Voice-to-Voice AI Mock Interview Mode <Badge variant="green">Active 🎙️</Badge>
            </h3>
            <p className="text-xs text-slate-400">
              Listen to AI interviewer speak questions & speak your technical answers using your microphone in real-time.
            </p>
          </div>
        </div>

        <button
          onClick={() => setAutoSpeechEnabled(!autoSpeechEnabled)}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 ${
            autoSpeechEnabled
              ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {autoSpeechEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          Auto AI Voice Feedback: {autoSpeechEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Center: Question & Voice Answer Area */}
        <Card className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="purple">{currentQ.category}</Badge>
              <Button
                size="sm"
                variant={isSpeaking ? 'secondary' : 'outline'}
                onClick={() => speakText(currentQ.question)}
                icon={isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
              >
                {isSpeaking ? 'Stop AI Voice' : 'Listen Question 🔊'}
              </Button>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h2>

            {currentQ.contextSnippet && (
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                {currentQ.contextSnippet}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-indigo-500" /> Your Technical Answer:
                </label>

                {/* Microphone Toggle Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isListening
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse'
                      : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening ? 'Stop Mic (Listening...)' : 'Speak Answer (Mic 🎙️)'}
                </button>
              </div>

              <Textarea
                value={userAnswer}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserAnswer(e.target.value)}
                placeholder="Click 'Speak Answer (Mic)' to dictate your answer by voice, or type your response here..."
                className="h-44 text-xs font-sans"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button type="submit" isLoading={isEvaluating} icon={<Send className="w-4 h-4" />}>
                Submit Answer for Voice AI Evaluation
              </Button>

              {questions.length > 0 && currentIndex < questions.length - 1 && (
                <Button type="button" variant="outline" onClick={handleNext}>
                  Next Question <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Right: Real-time AI Evaluation Panel */}
        <div>
          {result ? (
            <Card className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4" /> AI Voice Feedback
                </div>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => speakText(result.aiFeedback)}
                  icon={<Volume2 className="w-3.5 h-3.5" />}
                >
                  Read Feedback
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-slate-200 dark:border-slate-800">
                <ProgressRing value={result.technicalAccuracy} size={45} strokeWidth={4} label="Accuracy" />
                <ProgressRing value={result.completeness} size={45} strokeWidth={4} label="Complete" />
                <ProgressRing value={result.clarity} size={45} strokeWidth={4} label="Clarity" />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">AI Evaluation Feedback:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{result.aiFeedback}</p>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs space-y-1 text-amber-900 dark:text-amber-300">
                <span className="font-bold">Suggested Improvement:</span>
                <p>{result.suggestedImprovement}</p>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-xs space-y-1 text-indigo-900 dark:text-indigo-300">
                <span className="font-bold">Follow-Up Technical Question:</span>
                <p>{result.followUpQuestion}</p>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center p-8 text-center text-xs text-slate-400 space-y-3 min-h-[300px]">
              <div className="p-3 rounded-full bg-slate-800/50 text-indigo-400">
                <Mic className="w-6 h-6" />
              </div>
              <p>
                Use the <strong className="text-slate-300">Speak Answer (Mic 🎙️)</strong> button to dictate your answer by voice, or type it in the text area.
              </p>
              <p className="text-[11px] text-slate-500">
                The AI will evaluate technical accuracy, completeness, and speak back real-time feedback.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
