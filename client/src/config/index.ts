import io from 'socket.io-client';

export const API_URL: string = 'http://localhost:8080';
export const socket = io(API_URL);