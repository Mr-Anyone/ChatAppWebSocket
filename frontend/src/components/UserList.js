import Container from "react-bootstrap/Container";
import { socket } from "../socket";
import { useEffect, useState } from "react";

function UserList({usernames, setUserNames}) {

    function onUpdateTable(got_username) {
        console.log(got_username)
        var names = []
        for (const [key, value] of Object.entries(got_username)) {
            names.push({
                "id": key,
                "username": value
            })
        }

        console.log(names)
        setUserNames(names)
    }

    useEffect(() => {
        socket.on("username_table", onUpdateTable)

        return () => {
            socket.off("username_table", onUpdateTable)
        }
    })

    return (<>
        <ul>
            {usernames.map((username) => (
                <li>{username.id} : {username.username}</li>
            ))}
        </ul>

    </>);
}

export default UserList;