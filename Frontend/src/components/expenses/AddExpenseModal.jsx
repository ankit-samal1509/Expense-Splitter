import { useState } from 'react';
import { X } from 'lucide-react';
import { addExpense } from '../../api/expenseAPI';

export default function AddExpenseModal({ members, groupId, onClose, onRefresh }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    paidById: members[0]?.memberId || '',
    category: 'Other'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const memberIds = members.map(m => m.memberId);
      const payload = {
        ...form,
        groupId,
        amount: parseFloat(form.amount),
        // Creating the ExpenseSplit array
        splits: memberIds
      };

      await addExpense(payload);
      onRefresh(); 
      onClose();
    } catch (err) {
      alert("Error adding expense");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-black text-slate-800">Add New Expense</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input 
            type="text" placeholder="What was it for?" required
            className="w-full p-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            onChange={e => setForm({...form, description: e.target.value})}
          />
          <div className="relative">
            <span className="absolute left-4 top-4 font-bold text-slate-400">₹</span>
            <input 
              type="number" step="0.01" placeholder="0.00" required
              className="w-full pl-8 pr-4 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={e => setForm({...form, amount: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Paid By</label>
            <select 
              className="w-full mt-1 p-4 bg-slate-50 border rounded-2xl outline-none"
              value={form.paidById}
              onChange={e => setForm({...form, paidById: e.target.value})}
            >
              {members.map(m => (
                <option key={m.memberId} value={m.memberId}>{m.member.name}</option>
              ))}
            </select>
          </div>
          <button 
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition disabled:opacity-50"
          > Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}