import {socket} from "./socket";

// bootstrap stuff
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container"
import SignupForm from "./components/Signup";
import UserNameBar from "./components/UsernameBar";
import { useState } from "react";

function App() {
  let [socket_id, setSocketId] = useState("");

  return (
    <Container>
      <UserNameBar socket_id={socket_id}></UserNameBar>
      <SignupForm setSocketId={setSocketId}></SignupForm>
    </Container>
  );
}

export default App;
