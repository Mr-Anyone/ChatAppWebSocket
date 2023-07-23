import { socket } from "./socket";

// bootstrap stuff
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container"
import SignupForm from "./components/Signup";
import UserNameBar from "./components/UsernameBar";
import { useState } from "react";
import UserList from "./components/UserList";
import MessageView from "./components/MessageView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  let [socket_id, setSocketId] = useState("");
  let [current_username, setCurrentUsername] = useState("");
  let [other_usernames, setOtherUsernames] = useState([]);

  // set who is being talked to
  let [talk_to, setTalkTo] = useState({});

  return (
    <Row>
      <Col xs={4}>
        <Container>
          <UserNameBar socket_id={socket_id} username={current_username}></UserNameBar>
          <SignupForm setSocketId={setSocketId} setUserName={setCurrentUsername}></SignupForm>
          <UserList usernames={other_usernames} setUserNames={setOtherUsernames} setTalkTo={setTalkTo}> </UserList>
        </Container>
      </Col>
      <Col xs={8}>
        <MessageView talk_to={talk_to}></MessageView>
      </Col>
    </Row>
  );
}

export default App;
