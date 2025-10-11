import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, X, Heart, Info } from "lucide-react";

const profiles = [
  {
    name: "Sarah Martinez",
    platform: "Instagram",
    followers: "2.5M",
    engagement: "9.2%",
    niche: "Fashion & Lifestyle",
    location: "Los Angeles, CA",
    bio: "Fashion influencer passionate about sustainable style and empowering women through authentic content.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Alex Chen",
    platform: "TikTok",
    followers: "1.8M",
    engagement: "8.9%",
    niche: "Tech Reviews",
    location: "San Francisco, CA",
    bio: "Tech enthusiast creating honest reviews and tutorials for the latest gadgets and software.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emma Johnson",
    platform: "YouTube",
    followers: "3.1M",
    engagement: "7.5%",
    niche: "Travel & Adventure",
    location: "New York, NY",
    bio: "Travel vlogger exploring the world one destination at a time. Adventure is out there!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const SwipeMatch = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (liked: boolean) => {
    setSwipeDirection(liked ? "right" : "left");
    setFlashColor(liked ? "bg-green-100" : "bg-red-100");

    setTimeout(() => {
      setSwipeDirection(null);
      setFlashColor(null);
      setCurrentIndex((prev) => (prev < profiles.length - 1 ? prev + 1 : 0));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <header className="border-b p-4 flex items-center gap-4 bg-background">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Swipe to Match</h1>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-md">
          <Card
            className={`
              overflow-hidden shadow-2xl transition-all duration-500 ease-in-out
              ${flashColor ?? "bg-white"}
              ${swipeDirection === "left" ? "-translate-x-20 rotate-[-8deg] opacity-60" : ""}
              ${swipeDirection === "right" ? "translate-x-20 rotate-[8deg] opacity-60" : ""}
            `}
          >
            <div className="h-96 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <Avatar className="w-48 h-48 border-4 border-white shadow-lg">
                <AvatarImage src={currentProfile.image} alt={currentProfile.name} />
                <AvatarFallback className="text-6xl font-bold bg-primary/30 text-primary">
                  {currentProfile.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold">{currentProfile.name}</h2>
                  <Badge variant="outline">{currentProfile.platform}</Badge>
                </div>
                <p className="text-muted-foreground">{currentProfile.location}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-secondary rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{currentProfile.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="flex-1 bg-secondary rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{currentProfile.engagement}</p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
              </div>

              <div>
                <Badge className="mb-2">{currentProfile.niche}</Badge>
                <p className="text-sm text-muted-foreground">{currentProfile.bio}</p>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-4 justify-center">
              <Button
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full border-2 hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-all"
                onClick={() => handleSwipe(false)}
              >
                <X className="w-8 h-8" />
              </Button>

              <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-2">
                <Info className="w-8 h-8" />
              </Button>

              <Button
                variant="hero"
                size="icon"
                className="w-16 h-16 rounded-full hover:bg-green-500 hover:text-white transition-all"
                onClick={() => handleSwipe(true)}
              >
                <Heart className="w-8 h-8" />
              </Button>
            </div>
          </Card>

          <p className="text-center text-muted-foreground mt-6">
            {currentIndex + 1} of {profiles.length} profiles
          </p>
        </div>
      </main>
    </div>
  );
};

export default SwipeMatch;
