import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Weather from './components/Weather';
import UserForm from './components/UserForm';
import ListUsers from './components/ListUsers';
// import SetFavoriteCity from './components/SetFavoriteCity';
import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    username: "",
    favorite_city: "",
    email: ""
  })

  const onSaveUser = user => {
    setUser(user);
    alert(`Welcome! You're signed in as ${user.username}`)
  }

  return (
    <div className="App">
      <MyNavBar user={user} />
      <ListUsers />
      {/* <SetFavoriteCity user={user} /> */}
      <UserForm onSaveUser={onSaveUser} />
      <Weather user= {user} />
    </div>
  )
}

export default App