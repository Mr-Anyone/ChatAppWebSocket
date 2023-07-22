import Container from "react-bootstrap/Container";
import { socket } from "../socket";

function UserNameBar({socket_id, username}){
    return (<Container>
        <h1>Socket id: {socket_id}</h1>
        <h1>Username: {username}</h1>
    </Container>)
}

export default UserNameBar;