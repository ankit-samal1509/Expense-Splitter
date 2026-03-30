import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authAPI';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // registration endpoint
      await register(formData);
      navigate('/login');  
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 p-4">
      <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Join SplitEase</h2>
        <p className="text-slate-400 mb-8 text-sm font-medium">Create an account to start splitting bills.</p>
        
        <input 
          type="text" placeholder="Full Name" required 
          className="w-full p-4 border rounded-xl mb-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" 
          onChange={e => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="email" placeholder="Email Address" required 
          className="w-full p-4 border rounded-xl mb-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" 
          onChange={e => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" required 
          className="w-full p-4 border rounded-xl mb-6 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" 
          onChange={e => setFormData({...formData, password: e.target.value})} 
        />
        
        <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
          Create Account
        </button>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold">Login</Link>
        </p>
      </form>
    </div>
  );
}