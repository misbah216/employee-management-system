import { useEffect, useState, useMemo } from 'react';
import api from '../config';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import EmployeeCard from '../components/EmployeeCard';
import { useTheme } from '../context/ThemeContext';

export default function EmployeesPage() {
  const { theme } = useTheme();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get('/employees');
        setEmployees(res.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const departments = useMemo(() => {
    const depts = new Set(employees.map(emp => emp.department));
    return ['All Departments', ...Array.from(depts)];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
      const matchesDept = deptFilter === 'All Departments' || emp.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [employees, search, deptFilter]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#1A1625] text-[#3D2B1F] dark:text-[#E8E3F5] transition-colors duration-300 flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 sm:px-6 py-6">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <section className="rounded-3xl border border-[#E9E1D8] dark:border-[#3D3450] bg-[#FFFDFB] dark:bg-[#251F35] p-4 sm:p-6 shadow-[0_18px_30px_rgba(61,43,31,0.08)] transition-all">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#A58C71] dark:text-[#9890B0]">Directory</p>
              <h2 className="text-xl sm:text-2xl font-black text-[#3D2B1F] dark:text-[#E8E3F5]">All Employees</h2>
            </div>

            {/* Filter Bar */}
            <div className="mb-8 flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-[#D8CCBE] dark:border-[#3D3450] bg-[#FFF9F2] dark:bg-[#1A1625]/50 px-5 py-3 text-sm sm:text-base text-[#3D2B1F] dark:text-[#E8E3F5] outline-none transition focus:border-[#D6AE70] dark:focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#F0D2A7] dark:focus:ring-[#8B5CF6]/30 placeholder:text-[#A38768] dark:placeholder:text-[#9890B0]"
                />
              </div>
              <div className="w-full lg:w-64">
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="w-full rounded-2xl border border-[#D8CCBE] dark:border-[#3D3450] bg-[#FFF9F2] dark:bg-[#1A1625]/50 px-5 py-3 text-sm sm:text-base text-[#3D2B1F] dark:text-[#E8E3F5] outline-none transition focus:border-[#D6AE70] dark:focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#F0D2A7] dark:focus:ring-[#8B5CF6]/30 appearance-none"
                  style={{ backgroundImage: theme === 'light' 
                    ? 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234F3A2A%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")'
                    : 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23E8E3F5%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', 
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="bg-[#FFFDFB] dark:bg-[#251F35] text-[#3D2B1F] dark:text-[#E8E3F5]">{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <p className="text-[#6F604D] dark:text-[#9890B0]">Loading employees…</p>
            ) : filteredEmployees.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {filteredEmployees.map((emp) => (
                  <EmployeeCard 
                    key={emp._id} 
                    emp={emp} 
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium text-[#A38768] dark:text-[#9890B0]">No employees found</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
