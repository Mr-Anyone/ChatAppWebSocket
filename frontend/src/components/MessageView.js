import { useEffect, useReducer, useState } from "react";
import { socket } from "../socket";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

function SendForm({talk_to_contact, dispatcher, current_user}) {
    function onClick() {
        if (!("username" in talk_to_contact)){
            return
        } 

        let message = document.getElementById("message-message-form").value
        let send_to_server = { "from": socket.id, "to": talk_to_contact, "message": message }
        
        socket.emit("send_message", send_to_server)

        dispatcher({"type": "NOT_RECEIVED", "content": send_to_server})
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



function reducer(state, action){
    // appending element
    switch(action.type){
        case "RECEIVED":
            action.content["received"] = true
            return [...state, action.content]
        default: 
            action.content["received"] = false
            return [...state, action.content]
    }
}

function Message({message}){
    let render_message;
    if (message.received){

        render_message = <Container>
        <p>{message.from.username}: {message.message}</p>
    </Container>
    }else{
        render_message = <div>
            <p style={{"textAlign": "right"}}>{message.message}</p>
        </div>
    }
    return (render_message);
}

function MessageView({talk_to, current_user}) {
    let [message, dispatcher] = useReducer(reducer, [])

    function receiveMessage(message) {
        console.log(message, talk_to)
        dispatcher({"type": "RECEIVED", "content": message})
    }

    function should_show_message(message){
        // am I the one sending it to the group 
        if (message.to.id == talk_to.id && !message.received){
            return true;
        }

        // processing all the messages that are from received
        if (message.is_group){
            return message.to.id == talk_to.id
        }
        return message.from.id == talk_to.id && message.received && !message.is_group
    }

    useEffect(() => {
        socket.on("receive_message", receiveMessage)
        return () => {
            socket.off("receive_message", receiveMessage)
        }
    }, [])

    // dispayin the username that is going to be shown
    let username; 
    if ("username" in talk_to) {
        username = talk_to.username;
    }

    return (
        <Container className="border">
            <h1 className="text-center display-1">{username}</h1>
            {message.filter((message) => (
                should_show_message(message)
            )).map((message)=>(
                <Message message={message}></Message>
            ))}
            <SendForm talk_to_contact={talk_to} dispatcher={dispatcher} current_user={current_user}></SendForm>
        </Container>
    )
}

export default MessageView;