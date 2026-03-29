import React from 'react';
import { Shield, Users, Zap, CheckCircle } from 'lucide-react'; // Icons for visual flair

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Navigation --- */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-indigo-600 tracking-tight">SplitEase</div>
        <div className="space-x-8 hidden md:block text-slate-600 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
          Get Started
        </button>
      </nav>

      {/* --- Hero Section --- */}
      <header className="px-8 py-16 md:py-28 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Split bills, <span className="text-indigo-600">not friendships.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The simplest way to track shared expenses with roommates, travelers, and groups. No spreadsheets, no awkward reminders.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition shadow-xl">
            Create a Group
          </button>
          <button className="bg-white border-2 border-slate-200 px-8 py-4 rounded-xl text-lg font-bold hover:border-indigo-600 transition">
            View Demo
          </button>
        </div>
        
        {/* Mockup Placeholder */}
        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-4 border border-slate-100 max-w-4xl mx-auto overflow-hidden">
          <div className="bg-slate-50 rounded-2xl h-64 md:h-96 flex items-center justify-center border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium italic">[Dashboard Mockup Image Goes Here]</p>
          </div>
        </div>
      </header>

      {/* --- Features Grid --- */}
      <section id="features" className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Why use SplitEase?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-indigo-600" />}
              title="Group Management"
              desc="Create groups for trips, households, or dinners in seconds."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-indigo-600" />}
              title="Smart Splitting"
              desc="Split equally, by percentage, or by exact shares effortlessly."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-indigo-600" />}
              title="Easy Settlements"
              desc="Keep a clear record of who paid back whom with one click."
            />
          </div>
        </div>
      </section>

      {/* --- Simple Footer --- */}
      <footer className="py-12 border-t border-slate-200 text-center text-slate-500">
        <p>© 2026 SplitEase App. Built with React & Express.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition border border-transparent hover:border-indigo-100">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-600">{desc}</p>
  </div>
);

export default LandingPage;