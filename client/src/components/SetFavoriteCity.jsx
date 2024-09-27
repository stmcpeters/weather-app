  
  
  // set favorite city
  const SetFavoriteCity = () => {
    // sets initial state of user selection
    const [selectedUser, setSelectedUser] = useState(null);
  
      // handles what to do when submit button is clicked => user selected
      const handleSubmit = (event) => {
      // prevents default submission behaviors like refreshing/redirecting page
      event.preventDefault();
      if(selectedUser) {
      // runs fetchWeather() that gets data from API
        fetchWeather();
        } else {
        alert('Please select a user!')
        }
      }
  
      // fetches weather data from backend using selected user's favorite city
      const fetchWeather = async () => {
        try {
          // uses backend port to connect to API and uses inputted city name
            const response = await fetch(`http://localhost:8080/weather?city=${selectedUser.favorite_city}`);
          // waits for response and parses to json format
            const data = await response.json();
          // updates state of weather data using data from API
            setWeatherData(data);
          // catches and handles errors fetching data from API
          } catch (error) {
            console.error("Error fetching user's favorite city weather data: ", error);
        }
      }
    }

export default SetFavoriteCity;