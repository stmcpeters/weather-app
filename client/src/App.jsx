import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Weather from './components/Weather';

function App() {

  return (
    <div className="App">
      <MyNavBar />
      <Weather />
    </div>
  )
}

export default App
