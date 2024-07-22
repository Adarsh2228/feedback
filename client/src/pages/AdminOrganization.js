import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrganization = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDepartmentChange = (event) => {
    setNewDepartment(event.target.value);
  };

  const handleDepartmentAdd = async () => {
    try {
      await axios.post('/api/departments', { name: newDepartment });
      setNewDepartment('');
      fetchDepartments();
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const handleDepartmentDelete = async (departmentId) => {
    try {
      await axios.delete(`/api/departments/${departmentId}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div>
      <h2>Admin Organization</h2>

      <div>
        <input
          type="text"
          placeholder="New Department"
          value={newDepartment}
          onChange={handleDepartmentChange}
        />
        <button onClick={handleDepartmentAdd}>Add Department</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>
                <button onClick={() => handleDepartmentDelete(department.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrganization;