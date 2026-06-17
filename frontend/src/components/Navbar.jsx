import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    navigate('/login', { replace: true });
  };

  return (
    <nav className="border-b border-[#E8DDCF] dark:border-[#3D3450] bg-[#FFFDFB] dark:bg-[#251F35] shadow-sm transition-colors duration-300 sticky top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5EFE6] dark:bg-[#3D3450] text-xl lg:hidden shadow-sm"
          >
            ☰
          </button>
          <div className="text-xl sm:text-2xl font-black tracking-[0.1em] sm:tracking-[0.18em] text-[#3D2B1F] dark:text-[#E8E3F5]">
            PrabandhPro
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#F5EFE6] dark:bg-[#3D3450] text-lg sm:text-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <div className="hidden sm:flex items-center gap-3 border-l border-[#E8DDCF] dark:border-[#3D3450] pl-3 ml-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9D7C2] dark:bg-[#8B5CF6] text-sm font-bold text-[#3D2B1F] dark:text-white">A</div>
            <span className="hidden md:inline text-[#5F493B] dark:text-[#E8E3F5] font-semibold text-sm">Admin</span>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-[#D7C4AE] dark:border-[#8B5CF6] bg-[#FFF8F0] dark:bg-transparent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#5F493B] dark:text-[#E8E3F5] hover:bg-[#F5EFE6] dark:hover:bg-[#8B5CF6]/20 transition-all ml-1 sm:ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
