import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([
    { from: "Brand: GlowUp", text: "Hey! We'd love to collaborate this month." },
    { from: "You", text: "That sounds great! Can you share the details?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="p-8 bg-secondary min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-primary">Messages</h1>

      <Card className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto mb-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-3 rounded-xl max-w-xs ${
                  m.from === "You"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
