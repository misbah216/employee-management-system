export default function EmployeeCard({ emp, onEdit, onDelete }) {
  return (
    <article className="rounded-3xl border border-[#EFE5DA] dark:border-[#3D3450] bg-[#FFF9F2] dark:bg-[#251F35] p-5 shadow-[0_12px_25px_rgba(61,43,31,0.08)] transition-all hover:translate-y-[-2px] flex flex-col h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg sm:text-xl font-bold text-[#3D2B1F] dark:text-[#E8E3F5]">{emp.name}</h3>
          <p className="truncate text-xs sm:text-sm text-[#6F604D] dark:text-[#9890B0]">{emp.role}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#F3E0C6] dark:bg-[#8B5CF6]/20 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-[#6B5135] dark:text-[#A78BFA] transition-colors">
          {emp.department}
        </span>
      </div>
      
      <div className="mt-4 flex-1 space-y-1">
        <p className="text-sm text-[#6F604D] dark:text-[#9890B0] flex items-center gap-1.5">
          <span className="text-base">💼</span> 
          <span className="font-medium">₹{emp.salary?.toLocaleString()}</span>
        </p>
        <p className="truncate text-sm text-[#6F604D] dark:text-[#9890B0] flex items-center gap-1.5">
          <span className="text-base">✉️</span>
          <span>{emp.email}</span>
        </p>
      </div>

      <div className="mt-5 flex gap-2">
        <button 
          onClick={() => onEdit && onEdit(emp)}
          className="flex-1 rounded-2xl bg-[#F2C98B] dark:bg-[#A78BFA] px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#4F3A2A] dark:text-[#251F35] hover:opacity-90 transition-all active:scale-95 min-h-[44px]"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete && onDelete(emp._id)} 
          className="flex-1 rounded-2xl bg-[#B9735F] dark:bg-[#E06C75] px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#FFF7F2] hover:opacity-90 transition-all active:scale-95 min-h-[44px]"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
