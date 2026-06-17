import EmployeeCard from './EmployeeCard';

export default function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0)
    return <p className="text-center text-gray-500 mt-10">No employees yet. Add one! 👆</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map(emp => (
        <EmployeeCard key={emp._id} emp={emp} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}