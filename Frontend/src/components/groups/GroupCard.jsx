import { Link } from 'react-router-dom';
import { Layers, ChevronRight } from 'lucide-react';

export default function GroupCard({ group }) {
  return (
    <Link to={`/group/${group.id}`} className="group block">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Layers size={24} />
          </div>
          <ChevronRight className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">{group.name}</h3>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
          {group.currency || 'INR'}
        </p>
      </div>
    </Link>
  );
}