import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function LoginPage() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        employeeId,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('isAuth', 'true');
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#3D2B1F] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[440px] rounded-[32px] border border-[#EAE1D8] bg-[#FFFDFB] p-6 sm:p-10 shadow-[0_20px_50px_rgba(61,43,31,0.12)]">
        <p className="text-center text-lg sm:text-xl font-black tracking-[0.18em] text-[#3D2B1F]">PrabandhPro</p>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-black text-[#3D2B1F]">Welcome Back</h2>
        <p className="mt-2 text-center text-[#6F604D] text-sm sm:text-base">Sign in to your workspace</p>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-[#5F493B]">
            <span>Employee ID</span>
            <input 
              value={employeeId} 
              onChange={(e) => setEmployeeId(e.target.value)} 
              className="mt-1.5 w-full rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3.5 text-[#3D2B1F] outline-none transition focus:border-[#D6AE70] focus:ring-2 focus:ring-[#F0D2A7] min-h-[48px]" 
              placeholder="admin" 
              required 
            />
          </label>
          
          <label className="block text-sm font-semibold text-[#5F493B]">
            <span>Password</span>
            <div className="mt-1.5 flex items-center rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3.5 focus-within:border-[#D6AE70] focus-within:ring-2 focus-within:ring-[#F0D2A7] min-h-[48px]">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-transparent text-[#3D2B1F] outline-none" 
                placeholder="••••••••" 
                required 
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="ml-2 text-xl">{showPassword ? '🙈' : '👁️'}</button>
            </div>
          </label>
          
          <Link to="/forgot-password" title="Forgot Password?" className="block text-right text-sm font-bold text-[#B47B45] hover:underline">Forgot Password?</Link>
          
          {error && <p className="text-sm text-[#B04A3A] font-medium bg-[#B04A3A]/5 p-3 rounded-xl border border-[#B04A3A]/20">{error}</p>}
          
          <button type="submit" className="w-full rounded-2xl bg-[#3D2B1F] px-4 py-4 text-[#FFF8F0] font-bold shadow-[0_12px_25px_rgba(61,43,31,0.2)] hover:bg-[#4B3527] transition-all active:scale-[0.98] min-h-[52px]">Login</button>
        </form>
        
        <p className="mt-8 text-center text-sm text-[#6F604D]">
          Don't have an account?{' '}
          <Link to="/signup" className="font-black text-[#B47B45] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
