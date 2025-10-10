import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ✅ Backend API base URL
const API_BASE_URL = "http://127.0.0.1:8000/api/chat";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    // Show user's message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      setLoading(true);

      // Show temporary "thinking" message
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Analyzing your request..." },
      ]);

      // 🔥 Send message to FastAPI backend
      const response = await fetch(`${API_BASE_URL}/suggest_influencers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Demo Company", // Replace this with actual company name if available
          description: userMessage,
          target_audience: "influencers in your niche",
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch from backend");

      const data = await response.json();

      // Remove "Analyzing..." message
      setMessages((prev) => prev.slice(0, -1));

      // Display AI analysis and influencer suggestions
      const newMessages = [];
      if (data.analysis) {
        newMessages.push({
          role: "assistant",
          content: data.analysis,
        });
      }
      if (data.suggestions && data.suggestions.length > 0) {
        data.suggestions.forEach((s: string) => {
          newMessages.push({
            role: "assistant",
            content: `💡 Suggested influencer: ${s}`,
          });
        });
      }

      if (newMessages.length === 0) {
        newMessages.push({
          role: "assistant",
          content: "I couldn’t find any specific suggestions right now. Try rephrasing!",
        });
      }

      setMessages((prev) => [...prev, ...newMessages]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🟣 Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* 💬 Chatbot Full-Screen Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 gap-0 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary to-accent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">InfluMatch AI</h3>
                <p className="text-xs text-white/80">Your influencer marketing assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-secondary/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border rounded-2xl p-4 text-sm text-gray-500 italic">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t bg-background">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 h-12 rounded-xl"
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="h-12 w-12 rounded-xl"
                disabled={loading}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;
