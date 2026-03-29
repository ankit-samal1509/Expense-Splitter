import { useState } from 'react';
import { X, Plus, Trash2, Globe, Users } from 'lucide-react';
import api from '../../utils/api';

const CreateGroupModal = ({ isOpen, onClose, onRefresh }) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [members, setMembers] = useState([{ name: '', email: '' }]); // Start with one empty member slot
  const [loading, setLoading] = useState(false);

  const addMemberField = () => {
    setMembers([...members, { name: '', email: '' }]);
  };

  const removeMemberField = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const updateMember = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: groupName,
        description,
        currency,
        // The backend will use these to create 'Member' and 'GroupMember' records
        members: members.filter(m => m.name.trim() !== '') 
      };

      await api.post('/groups', payload);
      onRefresh(); // Refresh Dashboard data
      onClose();
    } catch (err) {
      alert("Failed to create group. Ensure all member emails are unique.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <Users className="text-indigo-600" size={24} />
            <h2 className="text-xl font-black text-slate-800">Create New Group</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Basic Info */}
          <div className="space-y-4">
            <input 
              type="text" placeholder="Group Name (e.g. Goa Trip 2026)" required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition font-bold text-lg"
              onChange={e => setGroupName(e.target.value)}
            />
            <textarea 
              placeholder="Description (Optional)"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition h-24 resize-none"
              onChange={e => setDescription(e.target.value)}
            />
            <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <Globe size={18} className="text-slate-400" />
              <select 
                value={currency}
                className="bg-transparent outline-none font-bold text-slate-700 w-full"
                onChange={e => setCurrency(e.target.value)}
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
          </div>

          {/* Member Management */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Add Members</h3>
              <button 
                type="button" onClick={addMemberField}
                className="text-indigo-600 hover:text-indigo-700 font-bold text-xs flex items-center gap-1"
              >
                <Plus size={14} /> Add Another
              </button>
            </div>

            {members.map((member, index) => (
              <div key={index} className="flex gap-2 animate-in slide-in-from-left-2">
                <input 
                  type="text" placeholder="Name" required
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  value={member.name}
                  onChange={e => updateMember(index, 'name', e.target.value)}
                />
                <input 
                  type="email" placeholder="Email"
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  value={member.email}
                  onChange={e => updateMember(index, 'email', e.target.value)}
                />
                {members.length > 1 && (
                  <button 
                    type="button" onClick={() => removeMemberField(index)}
                    className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Group..." : "Launch Group"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;