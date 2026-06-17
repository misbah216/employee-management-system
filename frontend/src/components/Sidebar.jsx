import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Employees', path: '/employees', icon: '👥' },
    { name: 'Add Employee', path: '/add', icon: '➕' },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between lg:block">
        <p className="mb-6 text-xs uppercase tracking-[0.25em] text-[#A58C71] dark:text-[#9890B0]">Workspace</p>
        <button onClick={onClose} className="lg:hidden p-2 text-[#3D2B1F] dark:text-[#E8E3F5] text-2xl">✕</button>
      </div>
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={() => onClose && onClose()}
          className={({ isActive }) =>
            `mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${
              isActive 
                ? 'bg-[#F5E3C8] dark:bg-[#8B5CF6] text-[#4F3A2A] dark:text-white shadow-sm' 
                : 'text-[#6F604D] dark:text-[#9890B0] hover:bg-[#F8F3EC] dark:hover:bg-[#3D3450]'
            }`
          }
        >
          <span className="text-lg">{item.icon}</span>
          {item.name}
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col rounded-3xl border border-[#E8DDCF] dark:border-[#3D3450] bg-[#FFFDFB] dark:bg-[#251F35] p-4 shadow-[0_18px_30px_rgba(61,43,31,0.08)] transition-colors duration-300">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#FFFDFB] dark:bg-[#251F35] p-6 shadow-2xl lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
