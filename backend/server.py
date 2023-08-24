from flask import Flask 
from chat_socket import socket

def create_app():
    app = Flask(__name__)
    socket.init_app(app)

    from views.chat import chat_blueprint

    app.register_blueprint(chat_blueprint)
    return app 

if __name__ == "__main__":
    app = create_app()
    socket.run(app, debug=True, host="0.0.0.0")
