import { useState } from 'react';
import api from '../config';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, employeeId, email, password, confirmPassword } = formData;

    if (!name || !employeeId || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
	const response = await api.post('/auth/signup', {
              name,
        employeeId,
        email,
        password,
      });

      if (response.status === 201) {
        setShowToast(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#3D2B1F] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[480px] rounded-[32px] border border-[#EAE1D8] bg-[#FFFDFB] p-6 sm:p-10 shadow-[0_20px_50px_rgba(61,43,31,0.12)]">
        <p className="text-center text-lg sm:text-xl font-black tracking-[0.18em] text-[#3D2B1F]">PrabandhPro</p>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-black text-[#3D2B1F]">Create Account</h2>
        <p className="mt-2 text-center text-[#6F604D] text-sm sm:text-base">Join your workspace today</p>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-sm font-semibold text-[#5F493B]">
              <span>Full Name</span>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3 text-[#3D2B1F] outline-none transition focus:border-[#D6AE70] focus:ring-2 focus:ring-[#F0D2A7] min-h-[48px]"
                placeholder="John Doe"
                required
              />
            </label>

            <label className="block text-sm font-semibold text-[#5F493B]">
              <span>Employee ID</span>
              <input
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3 text-[#3D2B1F] outline-none transition focus:border-[#D6AE70] focus:ring-2 focus:ring-[#F0D2A7] min-h-[48px]"
                placeholder="EMP123"
                required
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-[#5F493B]">
            <span>Email Address</span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3 text-[#3D2B1F] outline-none transition focus:border-[#D6AE70] focus:ring-2 focus:ring-[#F0D2A7] min-h-[48px]"
              placeholder="john@example.com"
              required
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-sm font-semibold text-[#5F493B]">
              <span>Password</span>
              <div className="mt-1.5 flex items-center rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3 focus-within:border-[#D6AE70] focus-within:ring-2 focus-within:ring-[#F0D2A7] min-h-[48px]">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent text-[#3D2B1F] outline-none"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="ml-2 text-xl">{showPassword ? '🙈' : '👁️'}</button>
              </div>
            </label>

            <label className="block text-sm font-semibold text-[#5F493B]">
              <span>Confirm</span>
              <div className="mt-1.5 flex items-center rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3 focus-within:border-[#D6AE70] focus-within:ring-2 focus-within:ring-[#F0D2A7] min-h-[48px]">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent text-[#3D2B1F] outline-none"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="ml-2 text-xl">{showConfirmPassword ? '🙈' : '👁️'}</button>
              </div>
            </label>
          </div>

          {error && <p className="text-sm text-[#B04A3A] font-medium bg-[#B04A3A]/5 p-3 rounded-xl border border-[#B04A3A]/20">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#3D2B1F] px-4 py-4 text-[#FFF8F0] font-bold shadow-[0_12px_25px_rgba(61,43,31,0.2)] hover:bg-[#4B3527] transition-all active:scale-[0.98] min-h-[52px]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#6F604D]">
          Already have an account?{' '}
          <Link to="/login" className="font-black text-[#B47B45] hover:underline">
            Login
          </Link>
        </p>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-[#3D2B1F] px-8 py-4 text-sm font-bold text-[#FFF8F0] shadow-2xl z-50"
          >
            Account created! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
