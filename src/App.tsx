/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  Heart, 
  Zap, 
  Cpu, 
  Rocket, 
  Settings, 
  Briefcase, 
  Award, 
  Smile, 
  Globe,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Code2,
  Database,
  Search,
  CheckCircle2,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

// --- Data & Types ---

const NAVBAR_LINKS = [
  { name: 'Overview', href: '#overview' },
  { name: 'AI Highlights', href: '#ai' },
  { name: 'Go Lives', href: '#golives' },
  { name: 'Tools & Automation', href: '#tools' },
  { name: 'Offerings', href: '#offerings' },
  { name: 'Wins', href: '#wins' },
  { name: 'Leadership', href: '#people' },
  { name: 'Awards', href: '#awards' },
  { name: 'Culture', href: '#culture' },
  { name: 'Community', href: '#community' },
];

const STATS = [
  { label: 'Headcount', value: '329', icon: Users, insight: 'Empowered professionals' },
  { label: 'New Joiners', value: '54', icon: Target, insight: 'Growing our ranks' },
  { label: 'Diversity', value: '49.24%', icon: Heart, insight: 'Inclusive excellence' },
  { label: 'Growth', value: '20%', icon: TrendingUp, insight: 'Quarterly expansion' },
  { label: 'Utilization', value: '98.40%', icon: Zap, insight: 'Peak efficiency' },
  { label: 'Chargeability', value: '92.55%', icon: BarChart3, insight: 'High-value focus' },
];

const AI_OFFERINGS = [
  { title: 'Joule for Developers', icon: Code2 },
  { title: 'Joule for Consultants', icon: Search },
  { title: 'POVs Created', icon: ShieldCheck },
];

const GENWIZARD_MILESTONES = [
  { title: 'Classical ABAP → Cloud Bot', description: 'Seamless migration pathway' },
  { title: 'RAP TD Generation', description: 'Automated test data excellence' },
  { title: 'Agentic Architecture', description: 'Future-ready implementation' },
];

const FUTURE_ROADMAP = [
  { title: 'S4 Code Generation Bot' },
  { title: 'Agentic RAP' },
  { title: 'GenAI Tools POV', subtitle: 'Claude, GitHub Copilot, MS Copilot, Enterprise GPT' },
];

const ENGAGEMENTS = {
  pilots: ['Zespri', 'PTTEP', 'Dyson', 'BASF', 'GSK', 'PPL', 'RL'],
  demos: ['Philips', 'JDM', 'Total Energy'],
};

const MILESTONES = [
  {
    title: 'Klepierre',
    revenue: '$4.1M',
    description: '13 countries go-live, S/4HANA transformation, Compliance & e-invoicing.',
    leads: ['Kanika Datta', 'Indrajit Kumar'],
    teamSize: 5,
    asset: 'S/4 Profiler',
  },
  {
    title: 'Barry Callebaut',
    revenue: '$813K',
    description: 'SAP DevOps transformation, advanced tool integrations (ADO, SNOW, Tosca).',
    leads: ['Jyoti Derawal'],
    teamSize: 4,
    asset: 'DevOps Tooling',
  }
];

const TOOLS = [
  { name: 'S/4 Profiler', clients: 13, executions: 18, revenue: '$126K' },
  { name: 'PRIME', clients: 4, executions: 4, revenue: '$29.5K' },
  { name: 'PRIME+', clients: 2, executions: 2, revenue: '$23K' },
  { name: 'ASD', clients: 4, executions: 11, revenue: '$88K' },
  { name: 'CRT/WCRM', clients: 6, executions: 6, revenue: '$117.09K' },
  { name: 'IC', clients: 2, executions: 2, revenue: '$10K' },
];

const WINS = [
  'Molson Coors', 'GSK', 'TokioMarine', 'CMA CGM', 'Corning', 'Fairprice', 
  'Sun Chemical', 'Anglo American', 'Dominion Energy', 'HCCB', 'Medco', 'CSL'
];

const LEADERSHIP = [
  { name: 'Abhishek Sharma', role: 'CG Lead', category: 'Delivery' },
  { name: 'Mani Gupta', role: 'DU Lead', category: 'Delivery' },
  { name: 'Jyoti Derawal', role: 'DevOps, Automation', category: 'Automation' },
  { name: 'Jignasa Desai', role: 'Sales + Conversion', category: 'Sales' },
  { name: 'Baljit Malhotra', role: 'Delivery + Conversion Sales', category: 'Sales' },
  { name: 'Gaurav Pratap', role: 'S/4HANA Conversion', category: 'Delivery' },
  { name: 'Nakul Rajurkar', role: 'GenAI + PRISM + BTP ABAP Cloud', category: 'AI' },
  { name: 'Ravi Bharadwaj', role: 'Talent + Competency', category: 'Talent' },
  { name: 'Kanika Datta', role: 'Project Management + Operations', category: 'Delivery' },
  { name: 'Sachin Sharma', role: 'Upgrade', category: 'Delivery' },
  { name: 'Ajay Mukundan', role: 'Community of Practice', category: 'CoP' },
  { name: 'Shyam Sunder Goyal', role: 'Automation', category: 'Automation' },
];

const CATEGORIES = ['All', 'AI', 'Delivery', 'Sales', 'Automation', 'Talent', 'CoP'];

// --- Sub-components ---

const SectionTitle = ({ title, subtitle, className = "" }: { title: string; subtitle?: string; className?: string }) => (
  <div className={`mb-12 ${className}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-600 max-w-2xl text-lg md:text-xl font-medium"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -8, boxShadow: "0 25px 30px -5px rgb(0 0 0 / 0.1), 0 10px 15px -8px rgb(0 0 0 / 0.1)" }}
    className={`bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-8 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredLeadership = activeCategory === 'All' 
    ? LEADERSHIP 
    : LEADERSHIP.filter(l => l.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-violet-100 selection:text-violet-900 flex flex-col overflow-x-hidden">
      {/* 1. Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white h-14 flex items-center shadow-md shrink-0">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center font-bold">TP</div>
            <span className="text-lg font-bold tracking-tight">TechDev Pulse <span className="text-violet-400 font-medium text-sm hidden sm:inline">Q2 FY26</span></span>
          </div>

          <div className="hidden lg:flex gap-6 text-sm font-medium text-slate-300">
            {NAVBAR_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-violet-400 transition-colors uppercase tracking-tight text-[11px] font-bold">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <a href="#community" className="bg-violet-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-violet-700 transition-colors">Join Community</a>
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-300">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-14 left-0 right-0 bg-slate-900 border-t border-slate-800 p-6 flex flex-col gap-4 lg:hidden"
            >
              {NAVBAR_LINKS.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-14 flex-grow p-4 md:p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* 2. Hero Section - Bento Style */}
          <section id="overview" className="md:col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-100 rounded-full blur-3xl opacity-50"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
                Built for Scale.<br/>
                <span className="text-violet-600">Powered by Innovation.</span>
              </h1>
              <p className="mt-4 text-slate-500 text-sm md:text-base max-w-md font-medium leading-relaxed">
                The definitive quarterly narrative for TechDev engineering and transformation excellence. Our journey of scale, powered by intelligence.
              </p>
              <div className="flex gap-3 mt-8">
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">Explore Highlights</button>
                <button className="border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">View AI Impact</button>
              </div>
            </motion.div>
          </section>

          {/* 3. Stats Section - Bento Style */}
          <section id="stats" className="md:col-span-12 lg:col-span-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
            {STATS.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col justify-center hover:border-violet-200 transition-colors group"
              >
                <div className="mx-auto w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-violet-50 transition-colors">
                  <stat.icon size={20} className="text-slate-400 group-hover:text-violet-500" />
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-2xl font-black text-slate-800">{stat.value}</div>
              </motion.div>
            ))}
          </section>

          {/* 4. Leadership Message - Refined Layout */}
          <section id="leadership" className="md:col-span-12 lg:col-span-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 mb-4">
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-48 h-48 rounded-full bg-slate-100 border-8 border-slate-50 shadow-xl mb-6 overflow-hidden flex items-center justify-center">
                  <Users size={80} className="text-slate-300" />
                </div>
                <h3 className="text-2xl font-heading font-black text-slate-900">Abhishek Sharma</h3>
                <p className="text-violet-600 font-bold uppercase tracking-widest text-sm italic">CG Lead</p>
                <div className="mt-8 space-y-4 w-full">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-sm">
                    "Growth, scale, and capability define our Q1 success."
                  </div>
                </div>
              </div>
              <div className="md:col-span-8">
                <span className="text-violet-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Leadership Perspective</span>
                <div className="space-y-6 text-slate-600 font-medium text-lg leading-relaxed">
                  <p>
                    As we reflect on our journey of Q1 Fy26, one thing is clear — <strong className="text-slate-900">we are doing great together</strong>. Our collective commitment, collaboration, and resilience continue to drive meaningful outcomes for our customers and for the organization.
                  </p>
                  <p>
                    We are growing steadily, both in scale, skill, and capability. Our pipeline remains strong with exciting opportunities across S/4HANA conversions, upgrades, large-scale transformations, and SAP ABAP Cloud (RAP) initiatives.
                  </p>
                  <p className="bg-violet-50 p-6 rounded-2xl border-l-4 border-violet-500 italic text-slate-900">
                    "Looking ahead, our focus must sharpen on the integration of AI and Agentic AI into our solutions and delivery models. Where AI is not yet feasible, smart automation will play a critical role in improving efficiency, quality, and speed."
                  </p>
                  <p>
                    Equally important is strengthening in-person collaboration within the team. Face-to-face interactions enhance alignment, innovation, and learning. Together, we are well positioned for greater success.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. AI & Innovation Lab - Bento Column */}
          <section id="ai" className="md:col-span-6 lg:col-span-4 bg-slate-900 text-white rounded-3xl p-8 flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
            <h3 className="font-heading font-black text-xl mb-8 flex items-center gap-3">
              <Cpu className="text-violet-400" /> AI Innovation
            </h3>
            <div className="space-y-6 flex-grow">
              <div className="space-y-4">
                <p className="text-sm text-slate-400 font-medium">"Our GenAI journey continues to grow with impactful advancements across SAP and Accenture solutions."</p>
                <div className="grid gap-3">
                   {AI_OFFERINGS.map(item => (
                     <div key={item.title} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                       <item.icon size={18} className="text-violet-400" />
                       <span className="text-xs font-bold">{item.title}</span>
                     </div>
                   ))}
                </div>
              </div>
              
              <div className="p-5 bg-violet-600/20 rounded-2xl border border-violet-500/30">
                <h4 className="text-xs font-black uppercase tracking-widest text-violet-300 mb-3">GenWizard Milestones</h4>
                <ul className="space-y-2">
                  {GENWIZARD_MILESTONES.map(m => (
                    <li key={m.title} className="text-xs font-medium flex gap-2">
                      <span className="text-violet-400">•</span>
                      <span>{m.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Go-Lives & Milestones - Bento Column */}
          <section id="golives" className="md:col-span-6 lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col h-full">
            <h3 className="font-heading font-black text-xl text-slate-900 mb-8 flex items-center gap-3">
              <Rocket className="text-blue-500" /> Major Go-Lives
            </h3>
            <div className="space-y-4 flex-grow">
              {MILESTONES.map((m) => (
                <div key={m.title} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 relative group hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-black text-slate-900">{m.title}</span>
                    <span className="text-blue-600 font-black text-sm">{m.revenue}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-3">Asset: {m.asset}</div>
                  <p className="text-xs leading-relaxed text-slate-500 font-medium">
                    {m.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {m.leads.map(lead => (
                      <span key={lead} className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-600">{lead}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Awards - Dedicated Grid */}
          <section id="awards" className="md:col-span-12 lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col h-full">
            <h3 className="font-heading font-black text-xl text-slate-900 mb-8 flex items-center gap-3">
              <Award className="text-amber-500" /> ACE Awards
            </h3>
            <div className="grid grid-cols-4 gap-2 flex-grow">
               {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className="aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group hover:bg-amber-50 transition-colors">
                    <Users size={20} className="text-slate-200 group-hover:text-amber-300" />
                 </div>
               ))}
            </div>
            <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
              <p className="text-amber-800 font-black text-2xl">35</p>
              <p className="text-amber-600 font-bold uppercase tracking-widest text-[9px]">Outstanding Awardees</p>
            </div>
          </section>

          {/* 8. Tech Leadership Grid - Expanded */}
          <section id="people" className="md:col-span-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 mb-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-violet-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Leadership Core</span>
                <h3 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tighter">The Visionaries.</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeCategory === cat 
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
                        : 'bg-slate-50 text-slate-400 border border-slate-100 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredLeadership.map((leader, i) => (
                  <motion.div
                    key={leader.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <div className="flex flex-col items-center text-center p-6 bg-slate-50 border border-slate-100 rounded-3xl group-hover:bg-white group-hover:border-violet-200 group-hover:shadow-xl transition-all duration-300">
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center mb-4 group-hover:border-violet-400 transition-colors">
                        <Users size={32} className="text-slate-300 group-hover:text-violet-500" />
                      </div>
                      <div className="text-[10px] font-black text-violet-600 uppercase tracking-widest mb-1">{leader.category}</div>
                      <div className="text-sm font-black text-slate-900 mb-1 group-hover:text-violet-700 transition-colors uppercase tracking-tighter line-clamp-1">{leader.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 italic line-clamp-2">{leader.role}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* 9. Tools & Offerings - Detailed View */}
          <section id="tools" className="md:col-span-12 lg:col-span-12 grid md:grid-cols-3 gap-4 mb-4">
            <div id="offerings" className="md:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-black text-2xl text-slate-900 mb-8 flex items-center gap-3">
                  <Settings className="text-green-500" /> IP & Automation Tools
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {TOOLS.map((tool) => (
                    <div key={tool.name} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col hover:border-green-200 transition-colors group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-black text-slate-900 uppercase tracking-tighter">{tool.name}</div>
                        <div className="text-[10px] font-bold text-green-600 px-2 py-0.5 bg-green-50 rounded-full">Active</div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-400 uppercase">Clients</span>
                          <span className="text-slate-900">{tool.clients}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-400 uppercase">Executions</span>
                          <span className="text-slate-900">{tool.executions}</span>
                        </div>
                      </div>
                      <div className="mt-auto pt-3 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase text-slate-400">Value</span>
                        <span className="text-sm font-black text-green-600">{tool.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1 bg-violet-900 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50" />
               <div className="relative z-10">
                 <h3 className="font-heading font-black text-xl mb-6 flex items-center gap-2">
                   <Target className="text-violet-300" /> Looking Ahead
                 </h3>
                 <div className="space-y-6">
                   {FUTURE_ROADMAP.map(item => (
                     <div key={item.title} className="group">
                        <p className="text-sm font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">{item.title}</p>
                        {item.subtitle && <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{item.subtitle}</p>}
                     </div>
                   ))}
                 </div>
               </div>
               <div className="relative z-10 mt-12 p-5 bg-white/5 rounded-2xl border border-white/10">
                 <div className="text-[10px] font-black uppercase tracking-widest text-violet-300 mb-3">Recent Engagements</div>
                 <div className="flex flex-wrap gap-2">
                   {ENGAGEMENTS.demos.map(p => (
                     <span key={p} className="px-2 py-1 bg-white/10 rounded text-[9px] font-bold border border-white/5">{p}</span>
                   ))}
                 </div>
               </div>
            </div>
          </section>

          {/* 10. Win Logos - Minimal Grid */}
          <section id="wins" className="md:col-span-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 mb-4">
            <h3 className="text-center font-heading font-black text-slate-200 text-3xl md:text-5xl uppercase tracking-tighter mb-12 select-none pointer-events-none italic">Trusted by Global Leaders</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-60 hover:opacity-100 transition-opacity">
              {WINS.map(win => (
                <div key={win} className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-xl mb-3">
                    <ShieldCheck size={24} className="text-slate-400" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{win}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 11. Culture & Community - Combined */}
          <section id="culture" className="md:col-span-12 lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 relative overflow-hidden mb-4 md:mb-0">
             <div className="absolute top-0 left-0 w-64 h-64 bg-pink-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
               <div>
                  <h3 className="font-heading font-black text-2xl text-slate-900 flex items-center gap-3">
                    <Smile className="text-pink-500" /> Culture & Bonding
                  </h3>
                  <p className="text-sm text-slate-500 font-medium italic">"Fueling the collective energy of TechDev."</p>
               </div>
               <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">T{i}</div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">+320</div>
               </div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                {[1, 2, 3, 4].map(i => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 0.98 }}
                    className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 hover:bg-pink-50 hover:border-pink-100 transition-colors cursor-pointer group"
                  >
                    <Globe size={32} className="group-hover:text-pink-400 transition-colors" />
                  </motion.div>
                ))}
             </div>
          </section>

          <section id="community" className="md:col-span-12 lg:col-span-4 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group mb-4 md:mb-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
                 <MessageSquare className="text-blue-400" />
              </div>
              <h3 className="font-heading font-black text-2xl mb-3 tracking-tighter uppercase">Viva Engage</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">Domain collaboration and knowledge sharing meets its pulse.</p>
            </div>
            <div className="relative z-10 mt-12 bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase">Expertise Network</span>
               <span className="text-sm font-black text-blue-400">329 Members</span>
            </div>
            <button className="relative z-10 mt-6 w-full py-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/40">
              Join Community
            </button>
          </section>
        </div>
      </main>

      {/* 11. Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center font-bold text-white">TP</div>
             <div>
               <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">TechDev Pulse</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Q2 FY26 Internal Edition</p>
             </div>
          </div>
          
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Design Team</p>
              <p className="text-xs font-bold text-slate-900">Engineering Ops</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact</p>
              <p className="text-xs font-bold text-slate-900">techdev.pulse@accenture.com</p>
            </div>
          </div>
          
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Built for Scale. Powered by Innovation.</p>
        </div>
      </footer>
    </div>
  );
}
