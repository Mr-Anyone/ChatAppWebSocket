import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import { socket } from "../socket";
import { useState } from "react";

function SignupForm({ setSocketId, setUserName }) {
    function onButtonClick() {
        socket.connect()

        let username = document.getElementById("usernameForm").value
        socket.emit("username", username)

        // this is terrible code as it always assume it will work even thoguh this might not be the case
        setUserName(username)
    }

    function onConnect() {
        setSocketId(socket.id)
    }

    useState(() => {
        socket.on("connect", onConnect)

        return () => {
            socket.off("connect", onConnect)
        }
    }, [])

    return (
        <Container>
            <Form>
                <Form.Group className="pb-3">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" id="usernameForm" name="username"></Form.Control>
                </Form.Group>
                <Button onClick={onButtonClick}>Connect To Server</Button>
            </Form>
        </Container>
    );
}

export default SignupForm;