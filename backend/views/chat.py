from flask import Blueprint, session
from chat_socket import socket
from flask_socketio import emit

chat_blueprint = Blueprint("chat", __name__)

@socket.on("connect")
def connect():
    print(session)
    emit("testing", "this worked! yay!")
    

@socket.on("disconnect")
def disconnect():
    print(session)
    emit("testing", "this is another test I guess")