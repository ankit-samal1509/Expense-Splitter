import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, LogOut } from 'lucide-react';

function Navbar ({ publicView = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
          S
        </div>
        <span className="text-xl font-black text-slate-800 tracking-tight">
          SplitEase
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {!publicView && user ? (
          <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
            /* User Info */
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-800 leading-none mb-0.5">
                {user.name}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {user.email}
              </p>
            </div>

            {/* Profile Dropdown */}
            <div className="relative group/menu">
              <button className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
                {user.name ? (
                  <span className="font-bold text-sm uppercase">
                    {user.name.charAt(0)}
                  </span>
                ) : (
                  <User size={18} />
                )}
              </button>

              {/* Simple Hover Dropdown */}
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200">
                <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-2 w-48">
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition"
                  >
                    <User size={16} /> Profile Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          <div className ="flex items-center gap-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;