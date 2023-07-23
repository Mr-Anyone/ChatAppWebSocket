from flask import Blueprint, session, request
from chat_socket import socket
from flask_socketio import emit, send

chat_blueprint = Blueprint("chat", __name__)

id_to_username_table = {} # (socket_id, username)

@socket.on("connect")
def connect():
    # sending information to server
    emit("username_table", id_to_username_table, broadcast=True)    

@socket.on("disconnect")
def disconnect():
    print("hello")
    del id_to_username_table[request.sid]

# this will setthe username
@socket.on("username")
def set_username(username):
    id_to_username_table[request.sid] = username
    
    emit("username_table", id_to_username_table, broadcast=True)    

@chat_blueprint.route("/username")
def get_username():
    try:
        if request.sid in id_to_username_table:
            return  id_to_username_table[request.sid]
    except AttributeError:
        # terrible code. think of a better way in the future
        return ""
    return ""

@socket.on("send_message")
def send_message(message):
    # from, to, message 
    emit("receive_message", message, to=message["to"])