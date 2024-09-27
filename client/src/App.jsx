import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Weather from './components/Weather';
import Form from './components/Form';

function App() {

  return (
    <div className="App">
      <MyNavBar />
      <Form />
      <Weather />
    </div>
  )
}

export default App