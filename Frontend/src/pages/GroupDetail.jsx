import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ReceiptText, Users, Plus } from 'lucide-react';
import { getGroupById } from '../api/groupAPI';
import AddExpenseModal from '../components/expenses/AddExpenseModal';
import ExpenseItem from '../components/expenses/ExpenseItem';
import { useBalance } from '../hooks/useBalance';

export default function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [tab, setTab] = useState('expenses');
  const [showModal, setShowModal] = useState(false);


  const fetchGroup = () => {
    getGroupById(id).then(res => setGroup(res));
  };

  useEffect(() => {
    fetchGroup();
  }, [id]);

  // Calculation Hook (Computes balances from expenses)
  const allBalances = useBalance(group);

  if (!group) return (
    <div className="flex justify-center items-center h-screen text-slate-400 font-bold animate-pulse">
      Loading Group Details...
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      {/* Header & Navigation */}
      <header className="mb-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm mb-4 transition-colors">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{group.name}</h1>
            <p className="text-slate-400 font-medium">{group.memberships.length} members • {group.expenses.length} expenses</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus size={20} /> Add Expense
          </button>
        </div>
      </header>

      {/* Tabs Layout */}
      <nav className="flex gap-8 mb-6 border-b border-slate-100">
        <button 
          onClick={() => setTab('expenses')}
          className={`pb-4 px-2 font-bold flex items-center gap-2 transition-all ${tab === 'expenses' ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <ReceiptText size={18} /> Ledger
        </button>
        <button 
          onClick={() => setTab('balances')}
          className={`pb-4 px-2 font-bold flex items-center gap-2 transition-all ${tab === 'balances' ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Users size={18} /> Balances
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        {tab === 'expenses' ? (
          /* LEDGER TAB */
          group.expenses.length > 0 ? (
            group.expenses.map(exp => (
              <ExpenseItem key={exp.id} expense={exp} />
            ))
          ) : (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <ReceiptText size={32} />
              </div>
              <p className="text-slate-500 font-bold">No expenses yet</p>
              <p className="text-slate-400 text-sm">Add your first bill to see the split!</p>
            </div>
          )
        ) : (
          /* BALANCES TAB */
          group.memberships.map(m => {
            const balance = allBalances[m.memberId] || 0;
            return (
              <div key={m.memberId} className="p-6 border-b last:border-0 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center font-black text-lg">
                    {m.member?.name?.[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{m.member?.name}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Group Member</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-black ${balance > 0 ? 'text-emerald-500' : balance < 0 ? 'text-rose-500' : 'text-slate-300'}`}>
                    {balance > 0 ? '+' : ''}₹{Math.abs(balance).toFixed(2)}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
                    {balance > 0 ? 'Owed to them' : balance < 0 ? 'They owe' : 'Settled up'}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Expense Modal */}
      {showModal && (
        <AddExpenseModal 
          members={group.memberships} 
          groupId={id} 
          onClose={() => setShowModal(false)} 
          onRefresh={fetchGroup} 
        />
      )}
    </div>
  );
}