import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Weather from './components/Weather';
import UserForm from './components/UserForm';
import ListUsers from './components/ListUsers';
import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const onUpdateUser = (updatedUser) => {
    // Handle user update logic here
    console.log('Updating user:', updatedUser);
  };

  // displays message to user that they're signed in successfully
  const createUser = user => {
    setUsers(user);
    alert(`Welcome! You're signed in as ${user.username}`)
  }

  return (
    <div className="App">
      <MyNavBar />
      <ListUsers users={users} onSelect={handleUserSelect} onUpdate={onUpdateUser} />
      <UserForm users={selectedUser} onSaveUser={fetchUsers} />
      <Weather user={selectedUser} />
    </div>
  )
}

export default App