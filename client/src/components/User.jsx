import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const User = ({user, toUpdate, toDelete}) => {

    const onUpdate = (toUpdateUser) => {
        toUpdate(toUpdateUser)
    }

    const onDelete = (toDeleteUser) => {
        toDelete(toDeleteUser)
    }

    return (
        <Card>
            <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Button 
              variant="outline-danger" 
              onClick={()=>{onDelete(user)}} 
              style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/>
            </Button>
            <Button 
              variant="outline-info" 
              onClick={()=>{onUpdate(user)}} 
              style={{padding: '0.6em'}}> 
              <ioicons.IoSync/>
            </Button>
            </Card.Body>
        </Card>
    )

}

export default User;