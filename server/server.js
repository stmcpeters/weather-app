const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// fetches weather data from API
app.get('/weather', async (req, res) => {
    //sets city equal to requested city entered
      const city = req.query.city || 'San Francisco'; //sets default city displayed when page loads to SF
    try {
      // setting variable for weather API url
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;
      // fetching weather data from API
        const response = await fetch(url);
      // handles and displays HTTP errors
        if(!response.ok) {
        console.error(`Receiving HTTP error status: ${response.status}`);
      }
      // parses fetched response into json format
        const data = await response.json();
      // sends json data as a response to client side
        res.json(data);
      // catches errors and displays errors fetching data from API
    } catch (error) {
      console.error('There was an error fetching weather data: ', error);
    }
  })


  // GET request to retrieve all users from database
app.get('/api/users', async (req, res) => {
    try {
        const { rows: users } = await db.query('SELECT * FROM users');
        res.send(users);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

  // GET request to retrieve all specified user's info from database
  app.get('/api/users/:username', async (req, res) => {
    try {
      // initializes username you're searching for
      const { username } = req.params;
      // query to search for users matching given username
      const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
      // return user data as JSON
      // rows[0] returns only the first matching value --- what if there's duplicate names?!
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching user data matching that input: ', error);
    }
  })

// POST request create new user
app.post('/api/users', async (req, res) => {
    try {
            // creating new user object
        const newUser = {
            username: req.body.username,
            favorite_city: req.body.favorite_city,
            email: req.body.email
        };
             //console.log([newUser.username, newUser.favorite_city, newUser.email]);
        const result = await db.query(
            'INSERT INTO users(username, favorite_city, email) VALUES($1, $2, $3) RETURNING *',
            [newUser.username, newUser.favorite_city, newUser.email],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// DELETE a user
app.delete('/api/users/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        await db.query('DELETE FROM users WHERE userid=$1', [userid]);
        console.log(`user with the userid: ${userid} has been deleted`);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// PUT request - Update a user 
app.put('/api/users/:userid', async (req, res) =>{
    //console.log(req.params);
    // the user to be updated
    const userid = req.params.userid
    const updatedUser = { username: req.body.username, favorite_city: req.body.favorite_city, email: req.body.email}
    console.log("In the server from the url - the user id", userid);
    console.log("In the server, from the react - the user to be edited", updatedUser);
    // UPDATE user SET email = "something" WHERE id="3";
    const query = `UPDATE users SET username=$1, favorite_city=$2, email=$3 WHERE userid=${userid} RETURNING *`;
    const values = [updatedUser.username, updatedUser.favorite_city, updatedUser.email];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on http://localhost:${PORT}`);
});