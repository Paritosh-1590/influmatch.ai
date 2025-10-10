import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, X, Heart, Info } from "lucide-react";

const SwipeMatch = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const profiles = [
    {
      name: "Sarah Martinez",
      platform: "Instagram",
      followers: "2.5M",
      engagement: "9.2%",
      niche: "Fashion & Lifestyle",
      location: "Los Angeles, CA",
      bio: "Fashion influencer passionate about sustainable style and empowering women through authentic content."
    },
    {
      name: "Alex Chen",
      platform: "TikTok",
      followers: "1.8M",
      engagement: "8.9%",
      niche: "Tech Reviews",
      location: "San Francisco, CA",
      bio: "Tech enthusiast creating honest reviews and tutorials for the latest gadgets and software."
    },
    {
      name: "Emma Johnson",
      platform: "YouTube",
      followers: "3.1M",
      engagement: "7.5%",
      niche: "Travel & Adventure",
      location: "New York, NY",
      bio: "Travel vlogger exploring the world one destination at a time. Adventure is out there!"
    }
  ];

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (liked: boolean) => {
    if (liked) {
      // In real app, save match
      console.log(`Matched with ${currentProfile.name}`);
    }
    
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      {/* Header */}
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
          <Card className="overflow-hidden shadow-2xl animate-scale-in">
            {/* Profile Image Area */}
            <div className="h-96 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Avatar className="w-48 h-48 border-4 border-white shadow-2xl">
                <AvatarImage src="" alt={currentProfile.name} />
                <AvatarFallback className="text-8xl font-bold bg-primary/30 text-primary">
                  {currentProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
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

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex gap-4 justify-center">
              <Button
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full border-2 hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-all"
                onClick={() => handleSwipe(false)}
              >
                <X className="w-8 h-8" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full border-2"
              >
                <Info className="w-8 h-8" />
              </Button>
              
              <Button
                variant="hero"
                size="icon"
                className="w-16 h-16 rounded-full"
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
