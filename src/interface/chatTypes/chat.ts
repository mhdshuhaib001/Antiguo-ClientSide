
  
  export interface Message {
    id?: string; 
    senderId: string; 
    receiverId?: string;
    message: string;
    timestamp?: string;
  }

  
  export interface Contact {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    online: boolean;
  }