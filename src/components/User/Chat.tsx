import React, { useEffect, useState } from 'react';
import { Avatar, Input } from '@nextui-org/react';
import { MoreVertical, Send, Video } from 'lucide-react';
import { useSocket } from '../../utils/hooks/useSocket';
import { useFetchAllUsersQuery } from '../../services/apis/adminApi';
import { useFetchAllSellerQuery } from '../../services/apis/sellerApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { Message, Contact } from '../../interface/chatTypes/chat';
import {
  useSendMessageMutation,
  useGetMessagesQuery,
  useCreateRoomMutation,
} from '../../services/apis/chatApi';
import VideoChat from '../../components/User/VideoChat'
const getInitials = (name: string) => {
  if (!name) return '';
  const nameParts = name.split(' ');
  return nameParts.length > 1 ? nameParts[0][0] + nameParts[1][0] : name[0];
};

const Chat: React.FC = () => {
  const sellerId = useSelector((state: RootState) => state.Seller.sellerId);
  const userId = useSelector((state: RootState) => state.User._id);
  const { data: sellerContacts } = useFetchAllSellerQuery();
  const { data: userContacts } = useFetchAllUsersQuery();
  // const [createChat] = useCreateRoomMutation();
  const [selectedChat, setSelectedChat] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  // const [sendMessageToApi] = useSendMessageMutation();
  const [showVideoCall, setShowVideoCall] = useState<boolean>(false);

  const isSeller = useSelector((state: RootState) => state.User.isSeller);
  const [combinedMessages, setCombinedMessages] = useState<Message[]>([]);
  const [typing,setTyping] = useState<boolean>(false)
  const [isTyping,setIsTyping] = useState<boolean>(false)

  const contacts: Contact[] = isSeller
    ? userContacts
        ?.filter((contact: any) => !contact.isSeller)
        .map((contact: any) => ({
          id: contact._id,
          name: contact.name,
          avatar: contact.profileImage || '',
          lastMessage: 'No messages yet',
          online: false,
        })) || []
    : sellerContacts?.map((contact: any) => ({
        id: contact._id,
        name: contact.companyName,
        avatar: contact.profile || '',
        lastMessage: 'No messages yet',
        online: false,
      })) || [];

  const currentUserId = sellerId ? sellerId : userId;
  const { data: messagesData, refetch } = useGetMessagesQuery({
    senderId: currentUserId,
    receiverId: selectedChat?.id || '',
  });

 
  const { messages: socketMessages, sendMessage, joinRoom } = useSocket();
  
  useEffect(() => {
    if (selectedChat && currentUserId) {
      joinRoom(currentUserId, selectedChat.id);
    }
  }, [selectedChat, currentUserId, joinRoom]);


  useEffect(() => {
    setCombinedMessages([...(messagesData || []), ...socketMessages]);
  }, [messagesData, socketMessages]);

  const handleVideoCall = () => {
    if (selectedChat) {
      setShowVideoCall(true);
    }
  };

  const handleEndCall = () => {
    setShowVideoCall(false);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage || !selectedChat) return;

    const message: Message = {
      senderId: currentUserId,
      receiverId: selectedChat.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };
    console.log('Sending message:', message);

    sendMessage(message);

    setNewMessage('');
    console.log('Message sent successfully');
  };

  return (
    <div className="flex h-screen bg-main-bg">
    <div className="w-full sm:w-1/3 lg:w-1/4 bg-amber-100 border-r border-gray-200">
      <div className="p-4 border-b border-amber-200">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-70px)]">
        {contacts.map((contact: Contact) => (
          <div
            key={contact.id}
            className="flex items-center p-4 relative rounded-sm hover:bg-amber-200 border border-amber-200"
            onClick={() => setSelectedChat(contact)}
          >
            <div className="relative">
              <Avatar
                size="lg"
                src={contact.avatar || undefined}
                alt={contact.name || 'No Name'}
                className="w-10 h-10 rounded-full"
                isBordered
              >
                {!contact.avatar && getInitials(contact.name)}
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${contact.online ? 'bg-green-500' : 'bg-gray-300'}`}
              ></span>
            </div>
            <div className="ml-4">
              <p className="font-semibold">{contact.name}</p>
              {/* <p className="text-sm text-gray-600">{contact.lastMessage}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="hidden sm:flex flex-col w-2/3 lg:w-3/4">
      {showVideoCall && selectedChat ? (
        <VideoChat roomID={selectedChat.id} userID={currentUserId} onEndCall={handleEndCall} />
      ) : selectedChat ? (
        <>
          <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-main-bg">
            <div className="flex items-center">
              <Avatar
                size="lg"
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
                isBordered
              />
              <div className="ml-4">
                <h3 className="text-gray-500">{selectedChat.name}</h3>
                <p
                  className={`text-sm ${selectedChat.online ? 'text-green-500' : 'text-gray-500'}`}
                >
                  {/* {selectedChat.online ? 'Online' : 'Offline'} */}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100" onClick={handleVideoCall}>
                <Video size={20} />
              </button>
              <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 bg-main-bg">
            {combinedMessages.map((message: Message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${message.senderId === currentUserId ? 'bg-amber-300 text-amber-900' : 'bg-amber text-gray-800'}`}
                >
                  <p>{message.message}</p>
                  <p
                    className={`text-xs mt-1 ${message.senderId === currentUserId ? 'text-amber-700' : 'text-gray-500'}`}
                  >
                    {message.timestamp
                      ? new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-main-bg border-t border-amber-200">
            <div className="flex items-center">
              <Input
                className="flex-grow px-2 py-2 bg-amber-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="ml-4 px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <Send size={20} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default Chat;
