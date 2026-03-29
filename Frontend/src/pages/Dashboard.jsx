import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import api from '../utils/api';

export default function Dashboard() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    api.get('/groups').then(res => setGroups(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center gap-2">
          <Plus size={20}/> New Group
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <Link to={`/group/${group.id}`} key={group.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4"><Users /></div>
            <h3 className="text-xl font-bold text-slate-800">{group.name}</h3>
            <p className="text-slate-400 text-sm">{group.currency}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}