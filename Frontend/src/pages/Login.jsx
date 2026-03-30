import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {login as loginUser} from '../api/authAPI';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(credentials);
      login(res); // Save user to context
      navigate('/dashboard'); 
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome Back</h2>
        <p className="text-slate-400 mb-8 text-sm font-medium">Log in to your workspace.</p>
        
        <input 
          type="email" placeholder="Email Address" required 
          className="w-full p-4 border rounded-xl mb-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" 
          onChange={e => setCredentials({...credentials, email: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" required 
          className="w-full p-4 border rounded-xl mb-6 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" 
          onChange={e => setCredentials({...credentials, password: e.target.value})} 
        />
        
        <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
          Enter Dashboard
        </button>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          New here? <Link to="/register" className="text-indigo-600 font-bold">Sign up for free</Link>
        </p>
      </form>
    </div>
  );
}