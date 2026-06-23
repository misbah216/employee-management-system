import { useState } from 'react';
import api from '../config';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


export default function AddEmployeePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', department: '', role: '', salary: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/employees', { ...form, salary: Number(form.salary) });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#1A1625] text-[#3D2B1F] dark:text-[#E8E3F5] transition-colors duration-300 flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 sm:px-6 py-6">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <div className="w-full max-w-3xl rounded-3xl border border-[#EAE1D8] dark:border-[#3D3450] bg-[#FFFDFB] dark:bg-[#251F35] p-6 sm:p-8 shadow-[0_18px_30px_rgba(61,43,31,0.08)] transition-all">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A58C71] dark:text-[#9890B0]">Onboarding</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#3D2B1F] dark:text-[#E8E3F5]">Add New Employee</h2>
            <p className="mt-2 text-sm sm:text-base text-[#6F604D] dark:text-[#9890B0]">Capture the essentials and keep your team organized.</p>
            
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
              {['name', 'email', 'department', 'role', 'salary'].map((field) => (
                <label key={field} className="flex flex-col gap-2 text-sm text-[#5F493B] dark:text-[#E8E3F5]">
                  <span className="capitalize">{field}</span>
                  <input
                    required
                    type={field === 'salary' ? 'number' : 'text'}
                    name={field}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    className="rounded-2xl border border-[#E0D4C6] dark:border-[#3D3450] bg-[#FFF9F2] dark:bg-[#1A1625]/50 px-4 py-3 text-[#3D2B1F] dark:text-[#E8E3F5] outline-none ring-0 transition focus:border-[#D6AE70] dark:focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#F0D2A7] dark:focus:ring-[#8B5CF6]/30 min-h-[48px]"
                  />
                </label>
              ))}
              <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => navigate('/dashboard')} 
                  className="w-full sm:w-auto rounded-full border border-[#D8CCBE] dark:border-[#3D3450] bg-[#FFF8F0] dark:bg-transparent px-6 py-3 text-sm font-semibold text-[#5F493B] dark:text-[#E8E3F5] hover:bg-[#F5EFE6] dark:hover:bg-[#3D3450] transition-all min-h-[44px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-full sm:w-auto rounded-full bg-[#3D2B1F] dark:bg-[#8B5CF6] px-6 py-3 text-sm font-semibold text-[#FFF8F0] dark:text-white hover:opacity-90 transition-all shadow-md min-h-[44px]"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
