import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem("token",Response.data.token);
      navigate('/');
    } else {
      setError('Wrong password!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
          🔐 Admin Login
        </h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2
                     text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-3"
        />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-medium transition">
          Login
        </button>
        <p className="text-xs text-gray-600 text-center mt-4">Hint: admin123</p>
      </div>
    </div>
  );
}