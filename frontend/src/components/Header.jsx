import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-400">👥 Employee Manager</h1>
      
      <nav className="flex gap-4 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-1'
              : 'text-gray-400 hover:text-white transition'
          }
        >
          All Employees
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-1'
              : 'text-gray-400 hover:text-white transition'
          }
        >
          + Add Employee
        </NavLink>

        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-300 transition ml-4">
          Logout
        </button>
      </nav>
    </header>
  );
}