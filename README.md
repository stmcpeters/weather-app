# Weather App

## Overview
The Weather App is a personalized, easy-to-use web application that displays the current weather of your favorite city. When you create a new user, you're asked to create a username, input your favorite city and your email. This project was created for week 11's Techtonica program assignment. The system uses a React frontend and a Node.js backend to create an interactive UI.

## Demo
![Weather App](client/src/assets/demo.gif)

## Features
- View a list of active users
- Add new user to save your favorite city 
- Edit an existing user's favorite city
- Delete a user
- City-Based Weather Search: Users can enter the name of any city to retrieve its current weather data.
- Weather Details: Displays weather details like, temperature, weather description, humidity, and wind speed.
- Weather Icons: Displays weather conditions with corresponding icons.
- Responsive design built with React
- Real-time data synchronization between frontend and backend

## Technologies
### Frontend
- React: JavaScript library for building responsive user interfaces
- React Bootstrap: Styling and layout of the app
- Fetch API: Makes HTTP requests to the backend <br>
### Backend
- Express.js: A Node.js framework for setting up the server and handling HTTP requests
- Node.js: JavaScript environment used to run the Express server
- Cors: Middleware to handle Cross-Origin Resource Sharing
- Dotenv: Hides sensitive environment variables
- PostgreSQL: Database management system
### API
- OpenWeatherMap API: Provides weather data for various cities worldwide.

## Installation
### Pre Requisites 
- Node.js (which includes npm): [Download Node.js](https://nodejs.org/en/download/package-manager)
- Git (for cloning the repository): [Download Git](https://git-scm.com/downloads)

1. Clone the repo <br>
`git clone https://github.com/stmcpeters/weather-app`<br>
`cd weather-app` 
2. Set up the backend
- Navigate to the `server` folder
- Install backend dependencies: `npm install`
- Create a `.env` file in the server directory and add your environment variables, such as database port and/or API key (see `.env-sample` for example)
- Import and configure `dotenv` in your `server.js` file: <br>
`import dotenv from 'dotenv';` <br>
`dotenv.config();` <br>
3. There are two ways to restore the DB dump file the project already contains: 

A- If you have postgres set up postgres with an User:  
 * just run the command `psql -U postgres -f db.sql`. Make sure that you have your Postgres password on hand. The psql console will ask for your password. 

B- If your initial configuration of postgres doesn't require a User:
* just run the command `psql -f db.sql`

7. Inside your server folder, open the file `.env.example` and copy the correct option for your configuation found there to your new .env file. 

Here is what your `.env` might look like:

```
DB_URI="postgresql://localhost/weather"
``` 
For this template, the name of your db should be `weather`.

⚠️ If you don't see a `weather` db, you can create one. From the terminal, navigate to the psql command line with `psql` and type `create database weather;` - don't forget the semicolon!! ⚠️

- Start the server using: `npm start`

4. Set up the frontend:
- Navigate to the `client` folder
- Install dependencies: `npm install`
- Start the React development server using `npm run dev`

5. Sign up/log in to get your own free API key from [OpenWeatherAPI] (https://openweathermap.org/api)

## API Endpoints
- GET `/api/weather`: Fetches weather data for a specified city from OpenWeather API (default city on page load is "San Francisco")
- GET `/api/users`: Fetches all users from database
- GET `/api/users/:username`: Fetches specified user's data from table
- POST `/api/users`: Creates a new user
- DELETE `/api/users/:userid`: Deletes a user
- PUT `/api/users/:userid`: Updates a user's details

## Stretch Goals/Help Wanted
- Implement testing for frontend and backend components

## Contributing
Contributions are welcomed to this project! If you have an idea for a new feature or a bug fix, please open an issue or a pull request.

## License
This project is licensed under the MIT License.
