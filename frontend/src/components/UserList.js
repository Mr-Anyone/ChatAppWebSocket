import Container from "react-bootstrap/Container";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function UserlistItem({ username, socket_id, setTalkTo }) {
    function onClick(){
        setTalkTo({"username": username, "id": socket_id})
    }
    
    return (<>
        <ListGroup.Item>
            <p>username: {username}</p>
            <p>socket/room id: {socket_id}</p>
            <Button onClick={onClick}>Talk</Button>
        </ListGroup.Item>
    </>);
}
function UserList({ usernames, setUserNames, setTalkTo}) {
    function onUpdateTable(got_username) {
        console.log(got_username)
        var names = []
        for (const [key, value] of Object.entries(got_username)) {
            names.push({
                "id": key,
                "username": value
            })
        }

        setUserNames(names)
    }

    useEffect(() => {
        socket.on("username_table", onUpdateTable)

        return () => {
            socket.off("username_table", onUpdateTable)
        }
    })

    return (<>
    <h1 className="text-center">Contact</h1>
        <ListGroup>
            {usernames.map((contact) => (
                <UserlistItem username={contact.username} socket_id={contact.id} setTalkTo={setTalkTo}> </UserlistItem>
            ))}
        </ListGroup>

    </>);
}

export default UserList;