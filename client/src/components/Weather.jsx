// allows you to use hooks from react
import { useEffect, useState } from 'react'
// applies CSS styling to page
import '/Users/beigeh0ney/Desktop/Techtonica/Techtonica-assignments/new-weather-app/client/src/App.css'
// imports card css from bootstrap
import Card from 'react-bootstrap/Card'

function Weather() {
  // sets initial state of city to be updated
    const [city, setCity] = useState('');
  // sets initial state of weather data to be updated
    const [weatherData, setWeatherData] = useState(null);

  // starts initial data fetch from API on page load
    useEffect(() => {
    // fetches API data from backend port where API is connected
      fetch('http://localhost:8080/weather')
        // takes the response and parses into json format
          .then((res) => res.json())
        // uses incoming weather data to update state of weather data
          .then((weatherData) => setWeatherData(weatherData))
        // catches and displays errors fetching data
          .catch((err) => console.log(err));
    }, []);

  // handles validation - entering numbers or empty strings vs valid city
    const handleValidation = () => {
      if(city.length === 0 || !Object.is(parseFloat(city), NaN)) {
        // alert('Please enter a valid city!');
        return false;
      } else {
      return true;
    }
  }

  // handles what to do when submit button is clicked
    const handleSubmit = (event) => {
      // prevents default submission behaviors like refreshing/redirecting page
      event.preventDefault();
      if(handleValidation()) {
      // runs fetchWeather() that gets data from API
        fetchWeather();
       } else {
        alert('Please enter a valid city!')
       }
    }
    

  // fetches weather data from backend
    const fetchWeather = async () => {
      try {
        // uses backend port to connect to API and uses inputted city name
          const response = await fetch(`http://localhost:8080/weather?city=${city}`);
        // waits for response and parses to json format
          const data = await response.json();
        // updates state of weather data using data from API
          setWeatherData(data);
        // catches and handles errors fetching data from API
        } catch (error) {
          console.error('Error fetching weather data: ', error);
      }
    }

  // handles what to do when input is entered (sets new city name)
    const handleInputChange = (event) => {
    // updates state of city from default to city that user inputs
      setCity(event.target.value)
  }

  return (
    <div>
      {/* title above input box and submit button */}
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          {/* creates text box for user to input city name */}
            <input 
            type="text"
            placeholder="Enter city name"
            label="city-name"
            // sets city 
            value={city}
            // sets city to be changed with user input
            onChange={handleInputChange}
            />
        {/* creates button to submit city name */}
          <button type="submit">Get Weather</button>
        </form>
        {/* ternary operator to display either fetched weather data or loading message */}
        {weatherData ? (
          <Card>
            <Card.Body>
            <Card.Title>
            {/* displays weather data name from API */}
              <h2>
                {/* displays weather icon depending on the weather description */}
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                <br></br>
                {/* displays weather condition name */}
                {weatherData.name}
              </h2>
            {/* displays temp from API */}
              <p>Temperature: {Math.round(weatherData.main.temp)} &deg;F</p>
            {/* displays description from API */}
              <p>Description: {weatherData.weather.description}</p>
            {/* displays humidity from API */}
              <p>Humidity: {weatherData.main.humidity}%</p>
            {/* displays wind speed from API */}
              <p>Wind Speed: {Math.round(weatherData.wind.speed)} mph</p>
              </Card.Title>
            </Card.Body>
          </Card>
          
        ) : (
          // loading message to display when fetching data from API
            <p>Fetching weather...</p>
        )}
      </div>
    )
  }

export default Weather;
