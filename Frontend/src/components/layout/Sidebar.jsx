import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Layers, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full">
      <div className="p-8 text-2xl font-black text-indigo-600">SPLIT.</div>
      <nav className="flex-1 px-4 space-y-2">
        <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
        <SidebarLink to="/groups" icon={<Layers size={20}/>} label="My Groups" />
        <SidebarLink to="/settings" icon={<Settings size={20}/>} label="Settings" />
      </nav>
      <div className="p-4">
        <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition">
          <LogOut size={20}/> <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}

const SidebarLink = ({ to, icon, label }) => (
  <NavLink to={to} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon} <span>{label}</span>
  </NavLink>
);


export default Sidebar;