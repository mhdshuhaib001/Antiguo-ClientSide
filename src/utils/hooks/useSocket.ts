import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../interface/chatTypes/chat';

const SOCKET_SERVER_URL = 'http://localhost:8001';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    
    // Add typing states
    const [typingUsers, setTypingUsers] = useState<{ [key: string]: boolean }>({}); // Store typing users

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        newSocket.on('receive_message', (newMessage: Message) => {
            console.log('Received message in frontend:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Listen for typing events
        newSocket.on('typing', (data) => {
            setTypingUsers((prev) => ({ ...prev, [data.userId]: true })); // Set typing user
        });

        newSocket.on('stop typing', (data) => {
            setTypingUsers((prev) => ({ ...prev, [data.userId]: false })); // Clear typing user
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = useCallback((message: Message) => {
        console.log('Sending message:', message);
        socket?.emit('send_message', message);
    }, [socket]);

    const joinRoom = useCallback((userId: string, receiverId: string) => {
        console.log(`Joining room for users: ${userId} and ${receiverId}`);
        socket?.emit('join chat', userId, receiverId);
    }, [socket]);

    const handleTyping = useCallback((userId: string, room: string, isTyping: boolean) => {
        if (isTyping) {
            socket?.emit('typing', { userId, room });
        } else {
            socket?.emit('stop typing', { userId, room });
        }
    }, [socket]);

    return { messages, sendMessage, joinRoom, typingUsers, handleTyping };
};
