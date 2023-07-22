import {socket} from "./socket";

// bootstrap stuff
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container"
import SignupForm from "./components/Signup";

function App() {

  return (
    <Container>
      <SignupForm></SignupForm>
    </Container>
  );
}

export default App;
