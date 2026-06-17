import { useState, useEffect } from 'react';

const empty = { name: '', email: '', department: '', role: '', salary: '' };

export default function EmployeeForm({ onSubmit, editingEmp, cancelEdit }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editingEmp || empty);
  }, [editingEmp]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit}
      className="bg-gray-900 rounded-xl p-6 mb-8 grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-lg font-semibold text-indigo-300 mb-2">
        {editingEmp ? '✏️ Edit Employee' : '➕ Add Employee'}
      </h2>
      {['name','email','department','role','salary'].map(field => (
        <input key={field}
          name={field} value={form[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          required
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2
                     text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      ))}
      <div className="col-span-2 flex gap-3 mt-2">
        <button type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition">
          {editingEmp ? 'Update' : 'Add Employee'}
        </button>
        {editingEmp && (
          <button type="button" onClick={cancelEdit}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}