import { useState } from 'react';
import { ChevronDown, ChevronUp, Receipt, Calendar } from 'lucide-react';
import SplitBreakdown from './SplitBreakdown';
import { format } from 'date-fns'; 

const ExpenseItem = ({ expense }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0 overflow-hidden">
      <div 
        className="p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Receipt size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{expense.description}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                {expense.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar size={12} /> {format(new Date(expense.date), 'MMM dd')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-black text-slate-900 text-lg">₹{Number(expense.amount).toFixed(2)}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
              Paid by {expense.paidBy.name}
            </p>
          </div>
          <div className="text-slate-300">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {/* Expanded Split View */}
      {isExpanded && (
        <div className="bg-slate-50/50 p-5 pt-0 animate-in slide-in-from-top-2 duration-200">
          <div className="border-t border-slate-100 mt-2 pt-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Split Details
            </p>
            <SplitBreakdown splits={expense.splits} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseItem;