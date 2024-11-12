import React, { useEffect } from 'react';
import { MessageNotification } from '../../../utils/hooks/useMessageNotification';
import { Bell } from 'lucide-react';

interface MessageNotificationDropdownProps {
  notifications: MessageNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: () => void;
  onClose: () => void;
  onNotificationClick?: (notification: MessageNotification) => void;
}

const MessageNotificationDropdown: React.FC<MessageNotificationDropdownProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  onClose,
  onNotificationClick,
}) => {
  useEffect(() => {
    // Add notification badge to document title when new messages arrive
    if (notifications.some(n => !n.isRead)) {
      document.title = `(${notifications.filter(n => !n.isRead).length}) New Messages - AuctionGems`;
    } else {
      document.title = 'AuctionGems';
    }
  }, [notifications]);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Messages</h3>
        <div className="flex space-x-2">
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-amber-600 hover:text-amber-800"
          >
            Mark all as read
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                !notification.isRead ? 'bg-amber-50' : ''
              }`}
              onClick={() => {
                onMarkAsRead(notification.id);
                onNotificationClick?.(notification);
              }}
            >
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-800">
                  {notification.senderName}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No new messages</div>
        )}
      </div>
      {notifications.length > 0 && (
        <div className="p-2 border-t border-gray-200">
          <button
            onClick={onClear}
            className="w-full text-sm text-gray-600 hover:text-gray-800 p-2 text-center"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageNotificationDropdown;
