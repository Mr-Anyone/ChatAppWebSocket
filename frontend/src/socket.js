import { io } from 'socket.io-client';

const URL = "http://10.88.111.100:5000/"
export const socket = io(URL, {autoConnect: false});
