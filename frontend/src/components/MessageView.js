import { useEffect } from "react";
import { socket } from "../socket";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

function SendForm() {
    function onClick() {
        let to = document.getElementById("to-message-form").value
        let message = document.getElementById("message-message-form").value

        socket.emit("send_message", { "from": socket.id, "to": to, "message": message })
    }

    return (<>
        <Form>
            <Form.Group className="pb-3">
                <Form.Label>Message </Form.Label>
                <Form.Control type="text" id="message-message-form" name="username"></Form.Control>
            </Form.Group>

            <Button onClick={onClick}>Submit</Button>

        </Form>
    </>);
}

function MessageView({socket_id, username, messages}) {
    function receiveMessage(message) {
        console.log(message)
    }

    useEffect(() => {
        socket.on("receive_message", receiveMessage)
        return () => {
            socket.off("receive_message", receiveMessage)
        }
    }, [])


    return (
        <Container className="border">
            <h1 className="text-center display-1">Username</h1>

            <SendForm></SendForm>
        </Container>
    )
}

export default MessageView;