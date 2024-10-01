import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import UserForm from './UserForm';
import User from './User';

const ListUsers = ({ users, onSelect, onUpdate }) => {

    //this is the state needed for the UpdateRequest
    const [editingUser, setEditingUser] = useState(null)

    const loadUsers = () => {
        // A function to fetch the list of sightings that will be load anytime that list change
        fetch("http://localhost:8080/api/users")
            .then((response) => response.json())
            .then((user) => {
                onSelect(user);
            });
    }

    // reloads users every time the state of editing users changes
    useEffect(() => {
        loadUsers();
    }, [editingUser]);

    //creates and saves new user
    const onSaveUser = (newUser) => {
        fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((response) => response.json())
          .then((data) => {
            onSelect(data);
            loadUsers();
          });
      }

      // update a user
      const onUpdateUser = (updatedUser) => {
        fetch(`http://localhost:8080/api/users/${updatedUser.userid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        })
          .then(() => {
            onSelect(updatedUser);
            loadUsers();
          });
      }

      const onDelete = (user) => {
        fetch(`http://localhost:8080/api/users/${user.userid}`, {
          method: "DELETE"
        }).then(() => {
          loadUsers();
        });
      }


    return (
        <div className="mybody">          
            <h3>Active Users</h3>
            <select onChange={(event) => onSelect(users.find(u => u.username === event.target.value))}>
                {users.map((user) => (
                    <option key={user.userid} value={user.username}>{user.username}</option> 
                ))}
            </select>
            {users.map((user) => (
                <User 
                    key={user.userid}
                    user={user} 
                    toDelete={() => onDelete(user)} 
                    toUpdate={onUpdateUser} 
                />
            ))}
        </div>
    );
}


export default ListUsers