import Button  from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { socket } from "../socket";

function CreateGroupForm() {
    function onClick(){
        let group_name = document.getElementById("group-name-form").value
        let members = document.getElementById("members-name-form").value

        socket.emit("group", group_name, members)
    }
    return (<Container>
        <h1>Create Group</h1>
        <Form>
            <Form.Group> 
                <Form.Label>Group Name</Form.Label>
                <Form.Control type="text" id="group-name-form"></Form.Control>
            </Form.Group> 
            <Form.Group> 
                <Form.Label>Members</Form.Label>
                <Form.Control type="text" id="members-name-form"></Form.Control>
                <Form.Text>separate by comma </Form.Text>
            </Form.Group> 
            <Button onClick={onClick}>Submit</Button>
        </Form>
    </Container>);
}

export default CreateGroupForm;