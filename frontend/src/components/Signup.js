import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import { socket } from "../socket";

function SignupForm(){
    
    function onButtonClick(){
        socket.connect()
        
        let username = document.getElementById("usernameForm").value
        socket.emit("username", username)
    }

    return (
        <Form>
            <Form.Group className="pb-3"> 
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" id="usernameForm" name="username"></Form.Control>
            </Form.Group>
            <Button onClick={onButtonClick}>Connect To Server</Button>
        </Form>            
    );
}

export default SignupForm;