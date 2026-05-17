import { MessageSquare, Bot, ToggleLeft, ToggleRight, Settings as SettingsIcon, Save } from 'lucide-react';
import { useState } from 'react';

export function ChatbotManagement() {
  const [aiEnabled, setAiEnabled] = useState(true);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Customer Support & AI Bot</h1>
        <p className="text-black/50 text-sm font-medium mt-2">Manage live chats, Telegram integration, and Gemini AI fallback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Column */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-black/5">
              <Bot className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest">AI & Bot Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest">Enable Gemini AI</p>
                  <p className="text-[10px] text-black/50 mt-1">AI replies when you are offline</p>
                </div>
                <button onClick={() => setAiEnabled(!aiEnabled)} className="text-black">
                  {aiEnabled ? <ToggleRight className="w-8 h-8 text-green-500" /> : <ToggleLeft className="w-8 h-8 text-black/30" />}
                </button>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Bot Persona Instructions</label>
                <textarea rows={4} className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-black transition-colors resize-none" defaultValue="You are the FHS Fashion AI Assistant. Help customers with size guides, order tracking, and style advice. Be professional and premium in your tone."></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-black/5">
              <MessageSquare className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Telegram Integration</h3>
            </div>
            <p className="text-xs text-black/50 mb-4 leading-relaxed">Connect your Telegram account to reply to website customer messages directly from your phone.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Telegram Bot Token</label>
                <input type="password" placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-black transition-colors" />
              </div>
              <button className="w-full bg-black text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors flex items-center justify-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Configuration</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Chat Column */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl border border-black/5 shadow-sm flex flex-col overflow-hidden h-[600px]">
          <div className="p-6 border-b border-black/5 bg-[#FBFBFB] flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Active Conversations</span>
              </h3>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-0 flex">
            {/* Chat List Sidebar */}
            <div className="w-1/3 border-r border-black/5">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`p-4 border-b border-black/5 cursor-pointer transition-colors ${i === 1 ? 'bg-black/5' : 'hover:bg-[#F9F9F9]'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold font-mono">Visitor_{1048 + i}</p>
                    <span className="text-[9px] text-black/40">2m ago</span>
                  </div>
                  <p className="text-[10px] text-black/60 truncate">
                    {i === 1 ? "Do you have this shirt in XL?" : i === 2 ? "Tracking number doesn't work" : "What is the return policy?"}
                  </p>
                  {i === 1 && <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-[8px] uppercase tracking-widest font-bold rounded-sm">AI Handled</span>}
                </div>
              ))}
            </div>
            
            {/* Chat View */}
            <div className="w-2/3 flex flex-col bg-[#F9F9F9]">
              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="w-full text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-black/30">Today</span>
                </div>
                {/* Customer Message */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-white border border-black/10 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <p className="text-sm">Hi, I'm looking at the Premium Oxford Shirt. Do you have it in XL?</p>
                    <p className="text-[9px] text-black/30 mt-1 text-right">10:42 AM</p>
                  </div>
                </div>
                {/* AI / Admin Message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-black text-white p-3 rounded-2xl rounded-tr-sm shadow-sm">
                    <p className="text-sm text-white/90">Hello! Yes, the Premium Oxford Shirt is currently available in XL. We offer fast shipping on that item. Would you like a link to the sizes available?</p>
                    <p className="text-[9px] text-white/40 mt-1 text-right">10:43 AM (AI)</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-black/5">
                <div className="flex gap-2">
                  <input type="text" placeholder="Type a message (Overrides AI)..." className="flex-1 bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors" />
                  <button className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
