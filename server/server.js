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

// POST request create new user
app.post('/api/users', async (req, res) => {
    try {
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

// // delete request for students
// app.delete('/api/students/:studentId', async (req, res) => {
//     try {
//         const studentId = req.params.studentId;
//         await db.query('DELETE FROM students WHERE id=$1', [studentId]);
//         console.log("From the delete request-url", studentId);
//         res.status(200).end();
//     } catch (e) {
//         console.log(e);
//         return res.status(400).json({ e });

//     }
// });

// //A put request - Update a student 
// app.put('/api/students/:studentId', async (req, res) =>{
//     //console.log(req.params);
//     //This will be the id that I want to find in the DB - the student to be updated
//     const studentId = req.params.studentId
//     const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname, iscurrent: req.body.is_current}
//     console.log("In the server from the url - the student id", studentId);
//     console.log("In the server, from the react - the student to be edited", updatedStudent);
//     // UPDATE students SET lastname = "something" WHERE id="16";
//     const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3 WHERE id=${studentId} RETURNING *`;
//     const values = [updatedStudent.firstname, updatedStudent.lastname, updatedStudent.iscurrent];
//     try {
//       const updated = await db.query(query, values);
//       console.log(updated.rows[0]);
//       res.send(updated.rows[0]);
  
//     }catch(e){
//       console.log(e);
//       return res.status(400).json({e})
//     }
//   })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on http://localhost:${PORT}`);
});