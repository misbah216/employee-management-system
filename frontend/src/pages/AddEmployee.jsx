import EmployeeForm from '../components/EmployeeForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const API = `${API_BASE_URL}/employees`;

export default function AddEmployee() {
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    const token = localStorage.getItem('token');
    await axios.post(API, formData, {
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