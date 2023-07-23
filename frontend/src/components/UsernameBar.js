import Container from "react-bootstrap/Container";
import { socket } from "../socket";

function UserNameBar({socket_id, username}){
    return (<Container>
        <h1 className="display-1 text-center">Who am I</h1>
        <p>Socket id: {socket_id}</p>
        <p>Username: {username}</p>
    </Container>)
}

export default UserNameBar;