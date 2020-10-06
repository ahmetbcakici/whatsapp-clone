import io from 'socket.io-client';

export const API_URL: string = 'http://localhost:8080/api';
export const socket = io('http://localhost:8080');