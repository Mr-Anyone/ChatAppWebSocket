import Container from "react-bootstrap/Container";
import { socket } from "../socket";

function UserNameBar({socket_id, username}){
    return (<Container>
        <p>Socket id: {socket_id}</p>
        <p>Username: {username}</p>
    </Container>)
}

export default UserNameBar;