import EmployeeForm from '../components/EmployeeForm';
import api from '../config';
import { useNavigate } from 'react-router-dom';



export default function AddEmployee() {
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    const token = localStorage.getItem('token');
    await api.post('auth/AddEmployee', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-indigo-300 mb-6">Add New Employee</h2>
      <EmployeeForm onSubmit={handleAdd} />
    </div>
  );
}