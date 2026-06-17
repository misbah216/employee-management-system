import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'No account found with this email');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
      if (response.data.verified) {
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, { email, newPassword });
      setMessage('Password reset successful! Please login.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#3D2B1F] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[440px] rounded-[32px] border border-[#EAE1D8] bg-[#FFFDFB] p-6 sm:p-10 shadow-[0_20px_50px_rgba(61,43,31,0.12)]">
        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[#A38768]">Step {step} of 3</p>
        
        {step === 1 && (
          <div className="mt-6">
            <h2 className="text-center text-2xl sm:text-3xl font-black text-[#3D2B1F]">Forgot Password?</h2>
            <p className="mt-2 text-center text-[#6F604D] text-sm sm:text-base">Enter your registered email address</p>
            <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold text-[#5F493B]">
                <span>Email Address</span>
                <input 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="mt-1.5 w-full rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3.5 text-[#3D2B1F] outline-none transition focus:border-[#D6AE70] focus:ring-2 focus:ring-[#F0D2A7] min-h-[48px]" 
                  placeholder="name@example.com" 
                  required 
                />
              </label>
              {error && <p className="text-sm text-[#B04A3A] font-medium bg-[#B04A3A]/5 p-3 rounded-xl border border-[#B04A3A]/20">{error}</p>}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full rounded-2xl bg-[#3D2B1F] px-4 py-4 text-[#FFF8F0] font-bold shadow-[0_12px_25px_rgba(61,43,31,0.2)] hover:bg-[#4B3527] transition-all disabled:opacity-50 min-h-[52px]"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
              <div className="text-center mt-6">
                <Link to="/login" className="text-sm font-black text-[#B47B45] hover:underline">Back to Login</Link>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6">
            <h2 className="text-center text-2xl sm:text-3xl font-black text-[#3D2B1F]">Enter OTP</h2>
            <p className="mt-2 text-center text-[#6F604D] text-sm sm:text-base">Check your email for the 6-digit OTP. Valid for 10 minutes.</p>
            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold text-[#5F493B]">
                <span>OTP Code</span>
                <input 
                  type="text"
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  className="mt-1.5 w-full rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3.5 text-center text-xl tracking-[0.5em] font-black text-[#3D2B1F] outline-none transition focus:border-[#D6AE70] focus:ring-2 focus:ring-[#F0D2A7] min-h-[56px]" 
                  placeholder="000000" 
                  maxLength={6}
                  required 
                />
              </label>
              {error && <p className="text-sm text-[#B04A3A] font-medium bg-[#B04A3A]/5 p-3 rounded-xl border border-[#B04A3A]/20">{error}</p>}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full rounded-2xl bg-[#3D2B1F] px-4 py-4 text-[#FFF8F0] font-bold shadow-[0_12px_25px_rgba(61,43,31,0.2)] hover:bg-[#4B3527] transition-all disabled:opacity-50 min-h-[52px]"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <div className="text-center mt-6">
                <button 
                  type="button" 
                  onClick={() => handleSendOtp()}
                  className="text-sm font-black text-[#D6AE70] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6">
            <h2 className="text-center text-2xl sm:text-3xl font-black text-[#3D2B1F]">Reset Password</h2>
            <p className="mt-2 text-center text-[#6F604D] text-sm sm:text-base">Enter your new secure password</p>
            <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold text-[#5F493B]">
                <span>New Password</span>
                <div className="mt-1.5 flex items-center rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3.5 focus-within:border-[#D6AE70] focus-within:ring-2 focus-within:ring-[#F0D2A7] min-h-[48px]">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full bg-transparent text-[#3D2B1F] outline-none" 
                    placeholder="••••••••" 
                    required 
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="ml-2 text-xl">{showPassword ? '🙈' : '👁️'}</button>
                </div>
              </label>
              <label className="block text-sm font-semibold text-[#5F493B]">
                <span>Confirm New Password</span>
                <div className="mt-1.5 flex items-center rounded-2xl border border-[#E0D4C6] bg-[#FFF9F2] px-4 py-3.5 focus-within:border-[#D6AE70] focus-within:ring-2 focus-within:ring-[#F0D2A7] min-h-[48px]">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="w-full bg-transparent text-[#3D2B1F] outline-none" 
                    placeholder="••••••••" 
                    required 
                  />
                  <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="ml-2 text-xl">{showConfirmPassword ? '🙈' : '👁️'}</button>
                </div>
              </label>
              {error && <p className="text-sm text-[#B04A3A] font-medium bg-[#B04A3A]/5 p-3 rounded-xl border border-[#B04A3A]/20">{error}</p>}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full rounded-2xl bg-[#3D2B1F] px-4 py-4 text-[#FFF8F0] font-bold shadow-[0_12px_25px_rgba(61,43,31,0.2)] hover:bg-[#4B3527] transition-all disabled:opacity-50 min-h-[52px]"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        )}
      </div>
      {message && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-[#3D2B1F] text-[#FFF8F0] px-8 py-4 rounded-full shadow-2xl z-50 animate-bounce font-bold">
          {message}
        </div>
      )}
    </div>
  );
}
