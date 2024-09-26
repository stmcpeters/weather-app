import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png'


function MyNavBar(props) {

  return (
    <>
    <Navbar className="navbar navbar-dark bg-dark">
      <Container>
        <a className="navbar-brand" href="#">
        <img
              src={Logo}
              height="30"
              className="d-lg-inline-block"
              alt="Weather App Logo"
            />
        </a>
      </Container>
    </Navbar>
    </>
  );
};


export default MyNavBar;