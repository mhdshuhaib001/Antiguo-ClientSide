import { useState, useEffect } from 'react';

import { Socket } from 'socket.io-client';

export interface MessageNotification {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const useMessageNotification = (socket: Socket | null, currentUserId: string) => {
  const [notifications, setNotifications] = useState<MessageNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  console.log(notifications, '=====================', unreadCount);
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (message: any) => {
      if (message.receiverId === currentUserId) {
        const newNotification: MessageNotification = {
          id: Date.now().toString(),
          senderId: message.senderId,
          senderName: message.senderName || 'Unknown User',
          message: message.message,
          timestamp: new Date().toISOString(),
          isRead: false,
        };
        setNotifications((prev) => [...prev, newNotification]);
        setUnreadCount((prev) => prev + 1);
      }
    };
    const handleNewNotification = (notification: MessageNotification) => {
      setNotifications((prev) => [...prev, notification]);
      setUnreadCount((prev) => prev + 1);

      // Play notification sound
      const audio = new Audio('/notification-sound.mp3');
      audio.play().catch((e) => console.log('Audio play failed:', e));
    };
    socket.on('receive_message', handleNewMessage);
    socket.on('new_message_notification', handleNewNotification);

    return () => {
      socket.off('receive_message', handleNewMessage);
      socket.off('new_message_notification', handleNewNotification);
    };
  }, [socket, currentUserId]);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };
  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
};
