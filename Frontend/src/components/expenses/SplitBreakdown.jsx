import { UserCircle2 } from 'lucide-react';

export default function SplitBreakdown({ splits }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {splits.map((split) => (
        <div 
          key={split.memberId} 
          className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <UserCircle2 size={16} />
            </div>
          
            <span className="text-sm font-medium text-slate-600">
              {split.member?.name || "Member"}
            </span>
          </div>
          <span className="text-sm font-bold text-slate-700">
            ₹{Number(split.share).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

