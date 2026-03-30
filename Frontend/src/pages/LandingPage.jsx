import { Shield, Users, Zap } from 'lucide-react'; 
import photo from '../resources/split-bills.avif';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Navigation --- */}
      <nav className="flex items-center justify-center px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="hidden md:flex space-x-8 text-slate-600 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
        </div>
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
            <Link 
              to="/register" 
              className="px-8 py-4 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
        </div>        

        <div className="mt-16 bg-white rounded-[2.5rem] shadow-2xl p-4 border border-slate-100 max-w-4xl mx-auto overflow-hidden group">
          <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-200 relative aspect-video flex items-center justify-center">
            <img 
              src={photo}
              alt="SplitEase App " 
              className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
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

      {/* --- Footer --- */}
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