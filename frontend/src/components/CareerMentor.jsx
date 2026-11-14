import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Cpu, 
  HelpCircle, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import api from '../services/api';

const QUICK_PROMPTS = [
  "What is the difference between Docker images and containers?",
  "Why is FastAPI ideal for AI engineering?",
  "How should I bridge my current skill gaps?",
  "What projects will make my portfolio stand out?"
];

export default function CareerMentor({ profile, roadmap }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [suggestedFollowups, setSuggestedFollowups] = useState([]);
  const messagesEndRef = useRef(null);

  // Fetch initial history
  useEffect(() => {
    async function loadHistory() {
      try {
        const hist = await api.getMentorHistory();
        if (hist && hist.length > 0) {
          setMessages(hist);
        }
      } catch (err) {
        console.error('Failed to load chat history:', err);
      }
    }
    loadHistory();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSend = async (textToSend = inputText) => {
    const text = textToSend.trim();
    if (!text || isSending) return;

    // Optimistically add student message
    const tempUserMsg = {
      id: `user-${Date.now()}`,
      sender: 'student',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source_type: 'user'
    };

    setMessages(prev => [...prev, tempUserMsg]);
    setInputText('');
    setIsSending(true);

    try {
      const response = await api.sendMentorMessage(text, {
        target_career: profile?.target_career,
        student_name: profile?.full_name,
        progress_pct: roadmap?.overall_progress_percentage
      });

      const mentorMsg = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_type: response.source_type || 'rule-based'
      };

      setMessages(prev => [...prev, mentorMsg]);
      setSuggestedFollowups(response.suggested_followups || []);
    } catch (err) {
      const errorMsg = {
        id: `error-${Date.now()}`,
        sender: 'mentor',
        text: "I'm having trouble analyzing your request at the moment. Please verify the backend connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_type: 'error'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-xs font-semibold mb-1.5">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Career Mentor (Agent H)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Engineering & Career Guidance
          </h2>
          <p className="text-xs text-slate-400">
            Contextual mentorship attuned to your target role: <strong className="text-brand-cyan">{profile?.target_career}</strong>.
          </p>
        </div>

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-navy-800 border border-white/5 text-xs text-slate-400">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>Profile-Aware Context</span>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 glass-panel p-4 sm:p-6 rounded-2xl overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'student';
          return (
            <div 
              key={msg.id} 
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                isUser 
                  ? 'bg-brand-violet text-white' 
                  : 'bg-navy-800 text-brand-cyan border border-white/10 ring-2 ring-brand-cyan/20'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`space-y-1 max-w-[85%] sm:max-w-[75%]`}>
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser 
                    ? 'bg-gradient-to-r from-brand-blue to-brand-indigo text-white rounded-tr-none' 
                    : 'bg-navy-800/90 text-slate-100 border border-white/5 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>

                <div className={`flex items-center space-x-2 text-[10px] text-slate-400 px-1 ${isUser ? 'justify-end' : ''}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.source_type && (
                    <span className="px-1.5 py-0.2 rounded bg-navy-750 text-slate-400 font-medium">
                      {msg.source_type === 'llm' ? '✨ LLM Engine' : '⚙️ Rule-Based Intelligence'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-navy-800 flex items-center justify-center text-brand-cyan border border-white/10">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="p-3.5 rounded-2xl bg-navy-800/80 border border-white/5 text-xs text-slate-400 flex items-center space-x-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-indigo" />
              <span>Mentor Agent synthesizing advice from your roadmap & profile...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Followups */}
      {suggestedFollowups.length > 0 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Suggested:</span>
          {suggestedFollowups.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-navy-800 hover:bg-navy-750 border border-white/10 text-slate-300 hover:text-white text-xs whitespace-nowrap transition"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Quick Prompts (if chat is short) */}
      {messages.length <= 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="p-2.5 rounded-xl bg-navy-800/60 hover:bg-navy-800 border border-white/5 text-left text-xs text-slate-300 hover:text-white transition line-clamp-1"
            >
              💬 {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex items-center space-x-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask about ${profile?.target_career || 'careers'}, skill gaps, or code...`}
          className="flex-1 px-4 py-3 rounded-xl bg-navy-800 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-violet transition placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet hover:from-brand-indigo hover:to-brand-purple text-white font-bold text-xs sm:text-sm shadow-glow-sm transition flex items-center space-x-1.5 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

    </div>
  );
}
