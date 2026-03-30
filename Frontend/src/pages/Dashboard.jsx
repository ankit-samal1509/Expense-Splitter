import { useState, useEffect } from 'react';
import { Plus, LayoutGrid } from 'lucide-react';
import { getAllGroups } from '../api/groupAPI';
import { useAuth } from '../hooks/useAuth';
import GroupCard from '../components/groups/GroupCard';
import CreateGroupModal from '../components/groups/CreateGroupModal';

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  const fetchGroups = () => {
    getAllGroups().then(res => {
      setGroups(res);
    });
  };

  useEffect(() => {
    fetchGroups();
  }, [user?.id]);

  return (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Groups</h1>
          <p className="text-slate-400 font-medium">Manage your shared expenses and trips</p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Create New Group
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
          <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-1">Active Groups</p>
          <p className="text-3xl font-black text-indigo-700">{groups.length}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Members</p>
          <p className="text-3xl font-black text-slate-700">
            {groups.reduce((acc, g) => acc + (g._count?.memberships || 0), 0)}
          </p>
        </div>
      </div>

      {/* Groups Grid */}
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups?.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-300">
            <LayoutGrid size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No groups yet</h3>
          <p className="text-slate-400 mb-8 max-w-xs mx-auto">Create a group to start tracking expenses with friends and family.</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="text-indigo-600 font-bold hover:underline"
          >
            + Create your first group
          </button>
        </div>
      )}

      {/* Create Group Modal */}
      <CreateGroupModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onRefresh={fetchGroups} 
      />
    </div>
  );
}