import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import AddExpenseModal from '../components/expenses/AddExpenseModal';

export default function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [tab, setTab] = useState('expenses');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get(`/groups/${id}`).then(res => setGroup(res.data));
  }, [id]);

  if (!group) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black">{group.name}</h1>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold">+ Expense</button>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab('expenses')} className={`px-4 py-2 font-bold ${tab === 'expenses' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Ledger</button>
        <button onClick={() => setTab('balances')} className={`px-4 py-2 font-bold ${tab === 'balances' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>Balances</button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {tab === 'expenses' ? (
          group.expenses.map(exp => (
            <div key={exp.id} className="p-5 border-b last:border-0 flex justify-between items-center hover:bg-slate-50 transition">
              <div>
                <p className="font-bold text-slate-800">{exp.description}</p>
                <p className="text-xs text-slate-400">Paid by {exp.paidBy.name}</p>
              </div>
              <p className="text-lg font-black text-slate-900">₹{exp.amount}</p>
            </div>
          ))
        ) : (
          group.memberships.map(m => (
            <div key={m.memberId} className="p-5 border-b last:border-0 flex justify-between items-center">
              <span className="font-bold text-slate-700">{m.member.name}</span>
              <span className="font-black text-indigo-600 tracking-tight">Active</span>
            </div>
          ))
        )}
      </div>
      {showModal && <AddExpenseModal members={group.memberships} groupId={id} onClose={() => setShowModal(false)} />}
    </div>
  );
}