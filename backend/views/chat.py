from flask import Blueprint, session, request
from chat_socket import socket
from flask_socketio import emit

chat_blueprint = Blueprint("chat", __name__)

id_to_username_table = {}

@socket.on("connect")
def connect():
    print(session)
    emit("testing", "this worked! yay!")
    

@socket.on("disconnect")
def disconnect():
    emit("testing", "this is another test I guess")

# this will setthe username
@socket.on("username")
def set_username(username):
    id_to_username_table[request.sid] = username