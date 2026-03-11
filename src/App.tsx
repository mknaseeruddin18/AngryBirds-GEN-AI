import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Megaphone, 
  Presentation, 
  Target,
  Loader2,
  Sparkles,
  TrendingUp,
  Zap,
  Users,
  IndianRupee,
  Briefcase,
  Clock,
  Network,
  ChevronRight,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Tab = 'dashboard' | 'campaign' | 'pitch' | 'scoring';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-slate-800">
      {/* Vibrant Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop" 
          alt="Vibrant Background" 
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-rose-900/60 mix-blend-multiply" />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Glassy Sidebar */}
        <aside className="w-full md:w-72 glass-sidebar text-slate-200 flex-shrink-0 flex flex-col shadow-2xl z-20">
          <div className="p-8 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg relative">
              <TrendingUp className="w-6 h-6 text-white" />
              <Sparkles className="w-3 h-3 text-pink-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold font-display text-white tracking-tight">
                MarketSuite<span className="text-pink-400">AI</span>
              </h1>
            </div>
          </div>
          
          <nav className="px-4 pb-6 space-y-2 flex-1 overflow-y-auto">
            <NavItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Dashboard" 
              isActive={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
            />
            <NavItem 
              icon={<Megaphone className="w-5 h-5" />} 
              label="Campaign Generator" 
              isActive={activeTab === 'campaign'} 
              onClick={() => setActiveTab('campaign')} 
            />
            <NavItem 
              icon={<Presentation className="w-5 h-5" />} 
              label="Sales Pitch" 
              isActive={activeTab === 'pitch'} 
              onClick={() => setActiveTab('pitch')} 
            />
            <NavItem 
              icon={<Target className="w-5 h-5" />} 
              label="Lead Scoring" 
              isActive={activeTab === 'scoring'} 
              onClick={() => setActiveTab('scoring')} 
            />
          </nav>
          
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              System Online
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
                {activeTab === 'campaign' && <CampaignGenerator />}
                {activeTab === 'pitch' && <SalesPitchGenerator />}
                {activeTab === 'scoring' && <LeadScoringSystem />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-semibold relative overflow-hidden group ${
        isActive 
          ? 'text-white bg-white/10 shadow-inner border border-white/10' 
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      {isActive && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-purple-600"
        />
      )}
      <div className={`${isActive ? 'text-pink-400' : 'group-hover:text-purple-400'} transition-colors`}>
        {icon}
      </div>
      {label}
    </button>
  );
}

function Dashboard({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <div className="space-y-8">
      {/* Hero Preview Section */}
      <div className="glass-panel rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl border-white/50">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-white/80 to-white/30 rounded-3xl shadow-xl backdrop-blur-md border border-white/60 mb-8 relative group"
        >
          <TrendingUp className="w-16 h-16 text-purple-600 group-hover:scale-110 transition-transform duration-500" />
          <Sparkles className="w-8 h-8 text-pink-500 absolute -top-3 -right-3 animate-pulse" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-pink-700 tracking-tight mb-6 drop-shadow-sm"
        >
          MarketSuiteAI
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto font-medium leading-relaxed"
        >
          Your intelligent sales and marketing platform, ready to optimize your business operations with vibrant precision.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          icon={<Megaphone className="w-8 h-8 text-pink-600" />}
          title="Campaign Generator"
          description="Process product and audience data into high-converting marketing strategies."
          onClick={() => setActiveTab('campaign')}
          gradient="from-pink-100 to-rose-50"
          delay={0.4}
        />
        <DashboardCard 
          icon={<Presentation className="w-8 h-8 text-purple-600" />}
          title="Sales Pitch Generator"
          description="Produce personalized 30-second pitches and value propositions."
          onClick={() => setActiveTab('pitch')}
          gradient="from-purple-100 to-fuchsia-50"
          delay={0.5}
        />
        <DashboardCard 
          icon={<Target className="w-8 h-8 text-indigo-600" />}
          title="Lead Scoring System"
          description="Quantify leads (0-100) based on Budget, Need, Urgency, and Authority metrics."
          onClick={() => setActiveTab('scoring')}
          gradient="from-indigo-100 to-blue-50"
          delay={0.6}
        />
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, description, onClick, gradient, delay }: { icon: React.ReactNode, title: string, description: string, onClick: () => void, gradient: string, delay: number }) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      onClick={onClick}
      className="glass-panel p-8 rounded-3xl shadow-xl border-white/50 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity`} />
      
      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white/60`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold font-display text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 text-base leading-relaxed">{description}</p>
        
        <div className="mt-6 flex items-center text-sm font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
          Launch Tool <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  );
}

function CampaignGenerator() {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [valueProp, setValueProp] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const prompt = `
Act as a Senior Marketing Strategist. Generate a marketing campaign for the following:
Product: ${product}
Target Audience: ${audience}
Key Value Proposition: ${valueProp}

Tone: Professional, high-energy, and results-oriented.
Format: Use Markdown headers, bold text for key metrics, and bullet points for readability.
      `;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
      });
      
      setResult(response.text || '');
    } catch (error) {
      console.error(error);
      setResult('An error occurred while generating the campaign.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-3xl p-8 border-white/50 shadow-xl flex items-center gap-6">
        <div className="p-4 bg-pink-100 rounded-2xl shadow-sm border border-white/60">
          <Megaphone className="w-8 h-8 text-pink-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold font-display text-slate-900">Campaign Generator</h2>
          <p className="text-slate-600 mt-2 text-lg">Process product and audience data into high-converting marketing strategies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <form onSubmit={handleGenerate} className="glass-panel p-6 rounded-3xl shadow-xl border-white/50 space-y-5 sticky top-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600"/> Product/Service Name
              </label>
              <input 
                required
                type="text" 
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. CloudSync Pro"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600"/> Target Audience
              </label>
              <input 
                required
                type="text" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. Mid-market IT Directors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600"/> Key Value Proposition
              </label>
              <textarea 
                required
                value={valueProp}
                onChange={(e) => setValueProp(e.target.value)}
                rows={4}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. Cuts data migration time by 40% with zero downtime."
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {loading ? 'Generating Magic...' : 'Generate Campaign'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-8">
          <div className="glass-panel p-8 rounded-3xl shadow-xl border-white/50 min-h-[600px]">
            {result ? (
              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:text-purple-950 prose-a:text-pink-600 prose-strong:text-purple-900">
                <Markdown>{result}</Markdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6 py-32">
                <div className="relative">
                  <Sparkles className="w-24 h-24 text-purple-300 opacity-50 animate-pulse" />
                  <Megaphone className="w-12 h-12 text-pink-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-xl font-medium text-center max-w-md">Fill out the form to generate a data-backed marketing strategy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesPitchGenerator() {
  const [product, setProduct] = useState('');
  const [lead, setLead] = useState('');
  const [differentiator, setDifferentiator] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const prompt = `
Act as a Sales Operations Director. Generate a personalized sales pitch for the following:
Product/Service: ${product}
Lead Persona/Company: ${lead}
Key Differentiator: ${differentiator}

Tone: Professional, high-energy, and results-oriented.
Format: Use Markdown headers, bold text for key metrics, and bullet points for readability.
      `;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
      });
      
      setResult(response.text || '');
    } catch (error) {
      console.error(error);
      setResult('An error occurred while generating the pitch.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-3xl p-8 border-white/50 shadow-xl flex items-center gap-6">
        <div className="p-4 bg-purple-100 rounded-2xl shadow-sm border border-white/60">
          <Presentation className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold font-display text-slate-900">Sales Pitch Generator</h2>
          <p className="text-slate-600 mt-2 text-lg">Produce personalized 30-second pitches and value propositions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <form onSubmit={handleGenerate} className="glass-panel p-6 rounded-3xl shadow-xl border-white/50 space-y-5 sticky top-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600"/> Product/Service
              </label>
              <input 
                required
                type="text" 
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. MarketSuiteAI"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600"/> Lead Persona/Company
              </label>
              <input 
                required
                type="text" 
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. VP of Sales at Acme Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600"/> Key Differentiator
              </label>
              <textarea 
                required
                value={differentiator}
                onChange={(e) => setDifferentiator(e.target.value)}
                rows={4}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. Powered by advanced AI for high-speed analysis."
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Presentation className="w-5 h-5" />}
              {loading ? 'Crafting Pitch...' : 'Generate Pitch'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-8">
          <div className="glass-panel p-8 rounded-3xl shadow-xl border-white/50 min-h-[600px]">
            {result ? (
              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:text-purple-950 prose-a:text-indigo-600 prose-strong:text-purple-900">
                <Markdown>{result}</Markdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6 py-32">
                <div className="relative">
                  <Sparkles className="w-24 h-24 text-purple-300 opacity-50 animate-pulse" />
                  <Presentation className="w-12 h-12 text-purple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-xl font-medium text-center max-w-md">Fill out the form to generate a personalized sales toolkit.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadScoringSystem() {
  const [leadName, setLeadName] = useState('');
  const [budget, setBudget] = useState('');
  const [authority, setAuthority] = useState('');
  const [need, setNeed] = useState('');
  const [timeline, setTimeline] = useState('');
  const [connections, setConnections] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const prompt = `
Act as a Sales Operations Director. Evaluate and score the following lead:
Lead/Company: ${leadName}
Budget: ${budget} (in INR)
Authority: ${authority}
Need: ${need}
Timeline: ${timeline}
Common Connections: ${connections}

Tone: Professional, high-energy, and results-oriented.
Format: Use Markdown headers, bold text for key metrics, and bullet points for readability.
      `;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
      });
      
      setResult(response.text || '');
    } catch (error) {
      console.error(error);
      setResult('An error occurred while scoring the lead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-3xl p-8 border-white/50 shadow-xl flex items-center gap-6">
        <div className="p-4 bg-indigo-100 rounded-2xl shadow-sm border border-white/60">
          <Target className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold font-display text-slate-900">Lead Scoring System</h2>
          <p className="text-slate-600 mt-2 text-lg">Quantify leads based on BANT and Relationship metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <form onSubmit={handleScore} className="glass-panel p-6 rounded-3xl shadow-xl border-white/50 space-y-5 sticky top-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600"/> Lead/Company Name
              </label>
              <input 
                required
                type="text" 
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. Globex Corp"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-purple-600"/> Budget (INR)
                </label>
                <input 
                  required
                  type="text" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="e.g. ₹15,00,000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600"/> Timeline
                </label>
                <input 
                  required
                  type="text" 
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="e.g. Q3"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600"/> Authority
              </label>
              <input 
                required
                type="text" 
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. Yes, VP of IT"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-600"/> Need / Pain Point
              </label>
              <input 
                required
                type="text" 
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. Legacy system is too slow"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-600"/> Common Connections
              </label>
              <input 
                required
                type="text" 
                value={connections}
                onChange={(e) => setConnections(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. 2 mutuals on LinkedIn"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Target className="w-5 h-5" />}
              {loading ? 'Analyzing...' : 'Score Lead'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-8">
          <div className="glass-panel p-8 rounded-3xl shadow-xl border-white/50 min-h-[600px]">
            {result ? (
              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:text-indigo-950 prose-a:text-indigo-600 prose-strong:text-indigo-900">
                <Markdown>{result}</Markdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6 py-32">
                <div className="relative">
                  <Sparkles className="w-24 h-24 text-indigo-300 opacity-50 animate-pulse" />
                  <Target className="w-12 h-12 text-indigo-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-xl font-medium text-center max-w-md">Fill out the BANT details to generate a quantified lead assessment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
