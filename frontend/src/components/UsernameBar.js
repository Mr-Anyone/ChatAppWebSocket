import Container from "react-bootstrap/Container";
import { socket } from "../socket";

function UserNameBar({socket_id}){
    return (<Container>
        <h1>Socket id: {socket_id}</h1>
        <h1>Username: </h1>
    </Container>)
}

export default UserNameBar;