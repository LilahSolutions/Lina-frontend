import request from './request';

const ChatServices = {
  setMessageSeen: (messageId_: number) => {},
  blockUser: (userId_: number) => {},
  sendMessageToLina: (message: string) =>
    request<string>(`/chat`, {
      method: 'POST',
      body: JSON.stringify({ input: message }),
    }),
};

export default ChatServices;
