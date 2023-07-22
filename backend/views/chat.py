from flask import Blueprint, session, request
from chat_socket import socket
from flask_socketio import emit

chat_blueprint = Blueprint("chat", __name__)

id_to_username_table = {}

@socket.on("connect")
def connect():
    emit("testing", "this worked! yay!")
    

@socket.on("disconnect")
def disconnect():
    # please do some cleanup thank you
    emit("testing", "this is another test I guess")

# this will setthe username
@socket.on("username")
def set_username(username):
    id_to_username_table[request.sid] = username

@chat_blueprint("/username")
def get_username():
    if request.sid in id_to_username_table:
        return  id_to_username_table[request.sid]
    return ""