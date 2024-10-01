import { Form, Button, Card } from 'react-bootstrap'
import React, { useState } from 'react'

const UserForm = ({ onSaveUser, editingUser, onUpdateUser }) => {

  // initial state of form 
  const [user, setUser] = useState(editingUser || {
      username: "",
      favorite_city: "",
      email: ""
  });

  //create functions that handle the event of the user typing into the form
  const handleUsernameChange = (event) => {
      const username = event.target.value;
      setUser((user) => ({ ...user, username }));
  };

  const handleFavoriteCityChange = (event) => {
      const favorite_city = event.target.value;
      setUser((user) => ({ ...user, favorite_city }));
  };

  const handleEmailChange = (event) => {
      const email = event.target.value;
      setUser((user) => ({ ...user, email }));
  };

  const clearForm = () => {
      setUser({ username: "", favorite_city: "", email: "" })
  }

  //A function to handle the post request -- creating new user
  const postUser = (newUser) => {
      return fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
      })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              //console.log("From the post ", data);
              //I'm sending data to the List of Students (the parent) for updating the list
              onSaveUser(data);
              //this line just for cleaning the form
              clearForm();
          });
  };

  //A function to handle the post request
  const putUser = (toEditUser) => {
      return fetch(`http://localhost:8080/api/users/${toEditUser.userid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toEditUser),
      })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              onUpdateUser(data);
              //this line just for cleaning the form
              clearForm();
          });
  };


  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
      e.preventDefault();
      if (user.userid) {
          putUser(user);
      } else {
          postUser(user);
      }
  };


  return (
    <div className='display-form'>
        <Card>
            <Card.Body>
            <Card.Title>
                <h3>Create a New User</h3>
                <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Label>User Name</Form.Label>
                    <input
                type="text"
                id="add-user-name"
                placeholder="User Name"
                required
                value={user.username}
                onChange={handleUsernameChange}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Favorite City</Form.Label>
            <input
                type="text"
                id="add-favorite-city"
                placeholder="Favorite City"
                required
                value={user.favorite_city}
                onChange={handleFavoriteCityChange}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <input
                type="email"
                id="add-email"
                placeholder="Email"
                required
                value={user.email}
                onChange={handleEmailChange}
            />
        </Form.Group>
        <Form.Group>
        <Button type="submit" variant="outline-success">{user.id ? "Edit User" : "Add User"}</Button>
        {user.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
        </Form.Group>
        </Form>
            </Card.Title>
            </Card.Body>
        </Card>
    </div>
  )
}

export default UserForm