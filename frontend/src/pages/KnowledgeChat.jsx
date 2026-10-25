import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareText,
  Send,
  BookOpen,
  Sparkles,
  Bot,
  User,
  Code2,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';

export default function KnowledgeChat({ openJsonModal }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your AI Construction Standards & Engineering Assistant. Ask me anything about OSHA regulations, ACI concrete standards, curing times, rebar detailing, or building codes.',
      refs: ['OSHA 29 CFR 1926', 'ACI 318-19', 'International Building Code (IBC)'],
      followups: [
        'What is the minimum curing time for slab formwork?',
        'What are the OSHA trigger height rules for fall protection?',
        'What is the standard clear cover for foundation footings?'
      ],
      timestamp: 'Ready'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const resp = await api.sendChatMessage(textToSend);
      const botMsg = {
        sender: 'bot',
        text: resp.reply,
        refs: resp.code_references || [],
        followups: resp.suggested_followups || [],
        rawJson: resp,
        timestamp: resp.timestamp
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Error processing inquiry. Please verify the backend service is running.',
          refs: [],
          followups: [],
          timestamp: 'Failed'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <span>Epic 5 : Activity 5.1</span>
            <span>•</span>
            <span>Knowledge Assistant</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Construction Standards & Safety Chatbot</h2>
          <p className="text-xs text-slate-400 mt-1">
            Instant technical guidance on ACI concrete curing schedules, ASTM testing, and OSHA 1926 compliance.
          </p>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-y-auto space-y-5 shadow-xl">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'bot' && (
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>

              {m.refs && m.refs.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] uppercase font-semibold text-amber-400 mb-1 flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Statutory Code & Standard Citations</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {m.refs.map((r, i) => (
                      <span key={i} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {m.followups && m.followups.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1.5 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Suggested Technical Inquiries</span>
                  </div>
                  <div className="space-y-1">
                    {m.followups.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="block text-left text-[11px] text-amber-300 hover:text-amber-200 hover:underline transition"
                      >
                        → {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {m.rawJson && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => openJsonModal('Assistant Chat Contract', m.rawJson)}
                    className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center space-x-1"
                  >
                    <Code2 className="w-3 h-3" />
                    <span>Contract JSON</span>
                  </button>
                </div>
              )}
            </div>

            {m.sender === 'user' && (
              <div className="p-2 bg-slate-800 text-slate-300 rounded-xl flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="flex-shrink-0 bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about concrete curing, slump tests, scaffolding tie-ins, OSHA rules..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
