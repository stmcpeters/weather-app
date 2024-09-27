import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import UserForm from './UserForm';
import User from './User';

const ListUsers = () => {

    // this is my original state with an array of users 
    const [user, setUser] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingUser, setEditingUser] = useState(null)

    const loadUsers = () => {
        // A function to fetch the list of sightings that will be load anytime that list change
        fetch("http://localhost:8080/api/users")
            .then((response) => response.json())
            .then((user) => {
                setUser(user);
            });
    }

    useEffect(() => {
        loadUsers();
    }, [user]);

    const onSaveUser = (newUser) => {
        //console.log(newUser, "From the parent - Database List of Users");
        setUser((user) => [...user, newUser]);
    }


    //A function to control the update in the parent (user component)
    const updateUser = (savedUser) => {
        // This function should update the whole list of users - 
        loadUsers();
    }

    //A function to handle the Delete funtionality
    const onDelete = (user) => {
        return fetch(`http://localhost:8080/api/users/${user.userid}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadUsers();
            }
        })
    }

    //A function to handle the Update functionality
    const onUpdate = (toUpdateUser) => {
        //console.log(toUpdateUser);
        setEditingUser(toUpdateUser);

    }



    return (
        <div className="mybody">
        <div className="list-users">
            <h2>Current Users</h2>
            <ul>
                {user.map((user) => {
                    return <li key={user.userid}> <User user={user} toDelete={onDelete} toUpdate={onUpdate} /></li>
                })}
            </ul>
        </div>
        </div>
    );
}


export default ListUsers