import EmployeeList from '../components/EmployeeList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const API = `${API_BASE_URL}/employees`;

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await axios.get(API);
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchEmployees();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-indigo-300 mb-6">
        All Employees ({employees.length})
      </h2>
      {loading
        ? <p className="text-center text-gray-400">Loading...</p>
        : <EmployeeList
            employees={employees}
            onDelete={handleDelete}
          />
      }
    </div>
  );
}