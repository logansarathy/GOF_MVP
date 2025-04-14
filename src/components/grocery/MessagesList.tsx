
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Message } from '@/types/store';

interface MessagesListProps {
  messages: Message[];
  onSendReply: (text: string) => void;
  onSendWhatsApp: (phone: string) => void;
  storePhone: string;
}

const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  onSendReply, 
  onSendWhatsApp, 
  storePhone 
}) => {
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    onSendReply(replyText);
    setReplyText('');
  };

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-grow mb-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`p-3 rounded-lg max-w-[80%] ${
                message.sender === 'Store' 
                  ? 'bg-god-green text-white ml-auto' 
                  : 'bg-gray-100 mr-auto'
              }`}
            >
              <div className="font-medium text-sm mb-1">
                {message.sender} - {message.timestamp}
              </div>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex space-x-2">
        <Input 
          placeholder="Type your reply here..." 
          value={replyText} 
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendReply();
            }
          }}
        />
        <Button 
          onClick={handleSendReply}
          disabled={!replyText.trim()}
          className="bg-god-green text-white"
        >
          Send
        </Button>
        <Button 
          variant="outline"
          onClick={() => onSendWhatsApp(storePhone)}
          className="text-green-600"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessagesList;
