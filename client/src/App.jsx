import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Weather from './components/Weather';
import UserForm from './components/UserForm';
import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    username: "",
    favorite_city: "",
    email: ""
  })

  const onSaveUser = partialUser => {
    setUser(partialUser);
    alert(`Welcome! You're signed in as ${partialUser.username}`)
  }

  return (
    <div className="App">
      <MyNavBar />
      <UserForm onSaveUser={onSaveUser} />
      <Weather />
    </div>
  )
}

export default App