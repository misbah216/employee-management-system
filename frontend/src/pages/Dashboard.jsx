import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import EmployeeCard from '../components/EmployeeCard';
import API_BASE_URL from '../config';

export default function Dashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/employees`);
        setEmployees(res.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const stats = [
    { label: 'Total Employees', value: employees.length, icon: '👥' },
    { label: 'Departments', value: new Set(employees.map(e => e.department)).size, icon: '🏢' },
    { label: 'Total Payroll', value: `₹${employees.reduce((acc, curr) => acc + (curr.salary || 0), 0).toLocaleString()}`, icon: '💰' },
    { label: 'New Hires', value: employees.slice(-3).length, icon: '✨' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#1A1625] text-[#3D2B1F] dark:text-[#E8E3F5] transition-colors duration-300 flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 sm:px-6 py-6">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((card) => (
              <article key={card.label} className="rounded-3xl border border-[#E9E1D8] dark:border-[#3D3450] bg-[#FFFDFB] dark:bg-[#251F35] p-5 shadow-[0_16px_30px_rgba(61,43,31,0.08)] transition-all">
                <div className="flex items-center justify-between text-[#A38768] dark:text-[#9890B0]">
                  <span className="text-xl p-2 rounded-xl bg-[#F5EFE6] dark:bg-[#8B5CF6]/10">{card.icon}</span>
                  <span className="text-xs uppercase tracking-[0.25em]">Metric</span>
                </div>
                <p className="mt-4 text-2xl sm:text-3xl font-black text-[#3D2B1F] dark:text-[#E8E3F5]">{card.value}</p>
                <p className="text-sm text-[#6F604D] dark:text-[#9890B0]">{card.label}</p>
              </article>
            ))}
          </section>

          <section className="mt-6 rounded-3xl border border-[#E9E1D8] dark:border-[#3D3450] bg-[#FFFDFB] dark:bg-[#251F35] p-4 sm:p-6 shadow-[0_18px_30px_rgba(61,43,31,0.08)] transition-all">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#A58C71] dark:text-[#9890B0]">Team</p>
                <h2 className="text-xl sm:text-2xl font-black text-[#3D2B1F] dark:text-[#E8E3F5]">Employee Directory</h2>
              </div>
              <button onClick={() => navigate('/add')} className="w-full sm:w-auto rounded-full bg-[#3D2B1F] dark:bg-[#8B5CF6] px-5 py-2.5 text-sm text-[#FFF8F0] dark:text-white hover:opacity-90 transition-all shadow-md">+ Add Employee</button>
            </div>
            
            {loading ? <p className="text-[#6F604D] dark:text-[#9890B0]">Loading employees…</p> : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {employees.map((emp) => (
                  <EmployeeCard 
                    key={emp._id} 
                    emp={emp} 
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
