from flask import Blueprint, session, request
from chat_socket import socket
from flask_socketio import emit, send, join_room
import time

chat_blueprint = Blueprint("chat", __name__)

id_to_username_table = {} # (socket_id, username)
groups = []

@socket.on("connect")
def connect():
    # sending information to server
    emit("username_table", id_to_username_table, broadcast=True)    

@socket.on("disconnect")
def disconnect():
    pass

# this will setthe username
@socket.on("username")
def set_username(username):
    id_to_username_table[request.sid] = username
    
    emit("username_table", id_to_username_table, broadcast=True)    

@socket.on("group")
def set_group(group_name, members):
    id_to_username_table[group_name] = group_name
    for member_sid in members.split(","):
        join_room(group_name, sid=member_sid)
    
    groups.append(group_name)
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
    real_message = {
        "from":{
            "username": id_to_username_table[message["from"]],
            "id" : message["from"]
        },
        "is_group": message["to"]["username"] in groups,
        "to": message["to"],
        "message" : message["message"]
    }
    emit("receive_message", real_message, to=real_message["to"]["id"], skip_sid=message["from"])

@chat_blueprint.route("/group_names")
def names():
    return groups