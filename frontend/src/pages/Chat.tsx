import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, Send, Search } from "lucide-react";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    { id: 0, name: "Sarah Martinez", platform: "Instagram", lastMessage: "Thanks for the opportunity!", time: "2m ago", unread: 2 },
    { id: 1, name: "Alex Chen", platform: "TikTok", lastMessage: "When can we start?", time: "1h ago", unread: 0 },
    { id: 2, name: "Emma Johnson", platform: "YouTube", lastMessage: "I'd love to collaborate!", time: "3h ago", unread: 1 },
  ];

  const messages = [
    { sender: "them", text: "Hi! I'm interested in your campaign", time: "10:30 AM" },
    { sender: "me", text: "Great! Let me share the details", time: "10:32 AM" },
    { sender: "them", text: "Thanks for the opportunity!", time: "10:35 AM" },
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b p-4 flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">InfluMatch Chat</h1>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r flex flex-col bg-secondary">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-background transition-colors ${
                  selectedChat === conv.id ? 'bg-background' : ''
                }`}
              >
                <Avatar className="w-12 h-12 bg-primary/20">
                  <div className="w-full h-full flex items-center justify-center text-primary font-semibold">
                    {conv.name[0]}
                  </div>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{conv.name}</p>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b p-4 flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-primary/20">
              <div className="w-full h-full flex items-center justify-center text-primary font-semibold">
                {conversations[selectedChat].name[0]}
              </div>
            </Avatar>
            <div>
              <p className="font-semibold">{conversations[selectedChat].name}</p>
              <p className="text-sm text-muted-foreground">{conversations[selectedChat].platform}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                  <Card className={`p-3 ${msg.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                    <p>{msg.text}</p>
                  </Card>
                  <p className="text-xs text-muted-foreground mt-1 px-3">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
