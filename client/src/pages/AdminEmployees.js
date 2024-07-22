import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminEmployees.css';

const AdminEmployees = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', phone: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch all users on component mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', email: '', phone: '', password: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/admin/users/${userId}`, editingUser);
      setUsers(users.map(user => (user._id === userId ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="admin-employees">
      <div className="form-container">
        <h2>{editingUser ? 'Edit User' : 'Create New User'}</h2>
        <div className="form-fields">
          <input
            type="text"
            value={editingUser ? editingUser.username : newUser.username}
            onChange={(e) => editingUser ? setEditingUser({ ...editingUser, username: e.target.value }) : setNewUser({ ...newUser, username: e.target.value })}
            placeholder="Username"
          />
          <input
            type="text"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) => editingUser ? setEditingUser({ ...editingUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={editingUser ? editingUser.phone : newUser.phone}
            onChange={(e) => editingUser ? setEditingUser({ ...editingUser, phone: e.target.value }) : setNewUser({ ...newUser, phone: e.target.value })}
            placeholder="Phone"
          />
          <input
            type="password"
            value={editingUser ? editingUser.password : newUser.password}
            onChange={(e) => editingUser ? setEditingUser({ ...editingUser, password: e.target.value }) : setNewUser({ ...newUser, password: e.target.value })}
            placeholder="Password"
          />
          <button className="submit-button" onClick={editingUser ? () => handleUpdate(editingUser._id) : handleCreate}>
            {editingUser ? 'Update User' : 'Create User'}
          </button>
        </div>
      </div>

      <div className="users-list">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="actions-column">
                  <button className="edit-button" onClick={() => setEditingUser(user)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEmployees;
