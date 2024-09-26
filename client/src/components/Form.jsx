import { Button, Form } from 'react-bootstrap'
// form to set favorite city

// input

// button to set favorite city
const SetFavoriteCity = () => {

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input>

        </input>  
        <button>

        </button>
      </form>
    </div>
  )
}

export default SetFavoriteCity