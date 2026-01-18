import { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Raveen's AI assistant. Ask me about his skills, education, or projects!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // NOTE: In production, use import.meta.env.VITE_AI_API_KEY
  const apiKey = "AIzaSyDbqFBeX-XllGo057RCkhioZx2QrHrCrt0"; 

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMsg }] }],
            systemInstruction: {
                parts: [{ text: `You are a professional AI assistant for Raveen Abeydeera.
                Data:
                - Role: Software Engineering Student at ICBT Campus.
                - Email: raveen.s.abeydeera@gmail.com
                - Skills: React, Vue.js, Tailwind, Java, PHP.
                - Projects: Greenlife Wellness, LuxeVista Resort.` }]
           }
          })
        }
      );

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setMessages(prev => [...prev, { text: data.candidates[0].content.parts[0].text, sender: 'bot' }]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      setError("Sorry, connection failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIXED: Removed hardcoded colors, using 'bg-card-light' and 'dark:bg-card-dark'
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-[600px] transition-colors duration-300">
      <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4 flex items-center">
        <Bot className="mr-2 text-accent-primary w-6 h-6" /> AI Assistant
      </h3>
      
      {/* Chat Window Background */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto mb-4 pr-2 space-y-3 bg-white/50 dark:bg-bg-dark/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`chat-bubble p-3 rounded-lg text-sm shadow-sm ${
              msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
            }`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start">
             <div className="chat-bubble chat-bubble-bot p-3 rounded-lg">
               <div className="loading-dots text-sm"><span></span><span></span><span></span></div>
             </div>
           </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mb-2 text-center">{error}</p>}

      <div className="flex items-center mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow px-4 py-2 rounded-l-lg border bg-bg-light dark:bg-bg-dark border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
          placeholder="Ask a question..."
          disabled={loading}
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-accent-primary text-accent-text-on-primary px-5 py-2 rounded-r-lg hover:bg-accent-hover transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}