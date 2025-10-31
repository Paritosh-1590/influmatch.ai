import { useState, useEffect } from "react";
import { MessageCircle, Send, X, Sparkles, Mail, Trash2, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

interface YouTubeChannel {
  channel_id: string;
  title: string;
  description: string;
  thumbnail: string;
  country?: string;
  subscriberCount?: string;
  viewCount?: string;
  videoCount?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  influencer?: string;
  youtubeResults?: YouTubeChannel[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm **InfluMatch AI**, your influencer marketing assistant!\n\nI can help you:\n🎯 Find YouTube influencers\n📈 Analyze brand–creator fit\n💌 Contact influencers directly\n💬 Or just chat casually 😄\n\nWhat would you like to do?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("influmatch_chat_history", JSON.stringify(messages));
  }, [messages]);

  const detectIntent = (
    text: string
  ): "email" | "brand_match" | "influencer_suggest" | "youtube_search" | "chat" => {
    const lower = text.toLowerCase();
    if (lower.startsWith("send mail to") || lower.startsWith("email")) return "email";
    if (lower.includes("match") || lower.includes("fit")) return "brand_match";
    if (lower.includes("youtube") || lower.includes("creator") || lower.includes("find influencer"))
      return "youtube_search";
    if (lower.includes("influencer") || lower.includes("suggest")) return "influencer_suggest";
    return "chat";
  };

  const sendEmail = async (influencer: string) => {
    const to_email = prompt(`Enter ${influencer}'s email address:`);
    if (!to_email) {
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ Email canceled." }]);
      return;
    }

    const subject = `Collaboration Opportunity with ${influencer}`;
    const message = `
Hi ${influencer},

We love your work and believe your audience aligns perfectly with our brand! ❤️

Would you be open to collaborating on an upcoming campaign?

Best,  
Influmatch Team
`;

    try {
      const res = await fetch(`${API_BASE_URL}/outreach/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_email, subject, message, influencer_name: influencer }),
      });
      const data = await res.json();
      if (res.ok)
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `✅ Email queued for **${influencer}** (${to_email})` },
        ]);
      else
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `❌ Email failed: ${data.detail || "Unknown error"}` },
        ]);
    } catch (err) {
      console.error("Email error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Failed to send email. Please try again later." },
      ]);
    }
  };

  const getChannelDetails = async (channelId: string): Promise<YouTubeChannel | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/youtube/channel/${channelId}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.channel || null;
    } catch (err) {
      console.error("❌ Channel stats fetch error:", err);
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "🤔 Thinking..." }]);

    try {
      const intent = detectIntent(userMessage);
      let data: any = null;

      if (intent === "email") {
        const parts = userMessage.split("to");
        if (parts.length > 1) {
          const influencer = parts[1].trim();
          setMessages((prev) => prev.slice(0, -1));
          await sendEmail(influencer);
          setLoading(false);
          return;
        }
      }

      if (intent === "youtube_search") {
        const query = encodeURIComponent(
          userMessage.replace(/(find|youtube|creator|influencer|on)/gi, "").trim()
        );
        const res = await fetch(`${API_BASE_URL}/youtube/search?q=${query}`);
        data = await res.json();

        setMessages((prev) => prev.slice(0, -1));

        if (data?.results?.length) {
          const detailedResults: YouTubeChannel[] = await Promise.all(
            data.results.map(async (ch: any) => {
              const stats = await getChannelDetails(ch.channel_id);
              return stats || ch;
            })
          );

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `🎥 Found ${detailedResults.length} YouTube creators related to "${decodeURIComponent(
                query
              )}":`,
              youtubeResults: detailedResults,
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "⚠️ No YouTube results found. Try another keyword!" },
          ]);
        }
        setLoading(false);
        return;
      }

      if (intent === "influencer_suggest") {
        const res = await fetch(`${API_BASE_URL}/influencers/suggest_influencers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Demo Brand",
            description: userMessage,
            target_audience: "young social media audience",
          }),
        });
        data = await res.json();
      } else if (intent === "brand_match") {
        const res = await fetch(`${API_BASE_URL}/brands/match`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            influencer_profile: userMessage,
            brand_desc: "We are an AI-driven marketing SaaS company.",
          }),
        });
        data = await res.json();
      } else {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.origin,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are InfluMatch AI — a friendly, knowledgeable marketing assistant. Keep tone light and conversational.",
              },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: userMessage },
            ],
          }),
        });
        data = await res.json();
      }

      setMessages((prev) => prev.slice(0, -1));

      if (intent === "chat" && data?.choices?.[0]?.message?.content) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.choices[0].message.content },
        ]);
      } else if (data?.analysis || data?.suggestions) {
        const msgs: Message[] = [];
        if (data.analysis)
          msgs.push({ role: "assistant", content: `🧠 **Analysis:** ${data.analysis}` });
        if (data.suggestions?.length) {
          msgs.push({
            role: "assistant",
            content:
              "✨ **Suggested Influencers:**\n" +
              data.suggestions.map((s: string) => `• ${s}`).join("\n"),
          });
          data.suggestions.forEach((s: string) =>
            msgs.push({
              role: "assistant",
              content: `Would you like to reach out to ${s}?`,
              influencer: s,
            })
          );
        }
        setMessages((prev) => [...prev, ...msgs]);
      } else if (data?.match) {
        const { score, reasons, tone } = data.match;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `📊 **Brand Fit Analysis**\n\n**Score:** ${score}/100\n**Tone:** ${tone}\n**Reasons:**\n${reasons
              .map((r: string) => `• ${r}`)
              .join("\n")}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "⚠️ I couldn’t find relevant info. Try rephrasing!" },
        ]);
      }
    } catch (err) {
      console.error("Chatbot Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("influmatch_chat_history");
    setMessages([
      { role: "assistant", content: "🧹 Chat cleared! Let's start fresh. What would you like to do?" },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-purple-600 to-orange-500 hover:scale-110 transition-transform text-white"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl w-full h-[600px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-purple-600 to-orange-500 text-white">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-200" />
              <h3 className="font-semibold text-lg">InfluMatch AI</h3>
            </div>
            <div className="flex items-center gap-2">
             
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-gradient-to-b from-purple-50 to-orange-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] whitespace-pre-line rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                      : "bg-white border border-purple-100 text-gray-800"
                  }`}
                >
                  {msg.content}

                  {/* YouTube Results */}
                  {msg.youtubeResults && (
                    <div className="mt-3 space-y-3">
                      {msg.youtubeResults.map((yt, j) => (
                        <div
                          key={j}
                          className="p-3 border rounded-xl bg-gradient-to-r from-purple-50 to-orange-50 hover:from-purple-100 hover:to-orange-100 flex items-center gap-3 transition"
                        >
                          <img
                            src={yt.thumbnail || "https://via.placeholder.com/80"}
                            alt={yt.title}
                            className="w-14 h-14 rounded-full object-cover border"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-purple-700">{yt.title}</p>
                            <p className="text-xs text-gray-600 line-clamp-2">{yt.description}</p>
                            {yt.subscriberCount && (
                              <p className="text-xs mt-1 text-gray-700">
                                👥 {parseInt(yt.subscriberCount).toLocaleString()} subscribers · 🎬{" "}
                                {parseInt(yt.videoCount || "0").toLocaleString()} videos
                              </p>
                            )}
                          </div>
                          <a
                            href={`https://www.youtube.com/channel/${yt.channel_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 text-sm flex items-center gap-1 hover:underline"
                          >
                            <Youtube className="w-4 h-4" /> View
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Email Button */}
                  {msg.influencer && (
                    <Button
                      onClick={() => sendEmail(msg.influencer!)}
                      size="sm"
                      variant="outline"
                      className="mt-2 text-xs flex items-center gap-2 border-purple-400 text-purple-600 hover:bg-purple-50"
                    >
                      <Mail className="w-4 h-4" /> Contact {msg.influencer}
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-400 italic">⏳ Thinking...</div>}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder='Try "Find beauty influencers on YouTube" or "Email Aimee Song"...'
                className="flex-1 border-purple-200 focus:border-orange-400 focus:ring-orange-300"
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90"
              >
                <Send className="w-4 h-4 mr-1" /> Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;