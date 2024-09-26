import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Weather from './components/Weather';
import SetFavoriteCity from './components/SetFavoriteCity';

function App() {

  return (
    <div className="App">
      <MyNavBar />
      <SetFavoriteCity />
      <Weather />
    </div>
  )
}

export default App
