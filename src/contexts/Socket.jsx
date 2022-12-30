import React from 'react';
import socketio from 'socket.io-client';
import { SERVER_URL, SOCKET_URL } from '../utils/constants';

export const socket = socketio.connect(SOCKET_URL);

export const SocketContext = React.createContext();
