import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, Heart, TrendingUp, DollarSign } from "lucide-react";

const Compare = () => {
  const influencers = [
    {
      name: "Sarah Martinez",
      platform: "Instagram",
      followers: "2.5M",
      engagement: "9.2%",
      avgLikes: "230K",
      avgComments: "12K",
      estimatedCost: "$5,000",
      niche: "Fashion",
      audience: { age: "18-34", location: "US, UK", gender: "75% Female" },
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Alex Chen",
      platform: "TikTok",
      followers: "1.8M",
      engagement: "8.9%",
      avgLikes: "160K",
      avgComments: "8K",
      estimatedCost: "$3,500",
      niche: "Tech",
      audience: { age: "16-28", location: "US, CA", gender: "60% Male" },
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  const metrics = [
    { label: "Followers", key: "followers", icon: Users },
    { label: "Engagement Rate", key: "engagement", icon: Heart },
    { label: "Avg Likes", key: "avgLikes", icon: TrendingUp },
    { label: "Estimated Cost", key: "estimatedCost", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Compare Influencers</h1>
      </header>

      <main className="p-6">
        <div className="container mx-auto max-w-6xl">
          <p className="text-muted-foreground mb-8 text-center">
            Side-by-side comparison of influencer metrics and performance
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {influencers.map((influencer, idx) => (
              <Card key={idx} className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary/20 shadow-lg">
                    <AvatarImage src={influencer.image} alt={influencer.name} />
                    <AvatarFallback className="text-4xl font-bold bg-primary/20 text-primary">
                      {influencer.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-2">{influencer.name}</h2>
                  <Badge>{influencer.platform}</Badge>
                  <Badge variant="outline" className="ml-2">{influencer.niche}</Badge>
                </div>

                <div className="space-y-4">
                  {metrics.map((metric) => {
                    // extract icon into a capitalized variable for TSX safety
                    const Icon = metric.icon;
                    // lookup value (safe)
                    const rawValue = (influencer as any)[metric.key];
                    const value = typeof rawValue === "undefined" ? "-" : rawValue;

                    return (
                      <div key={metric.key} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">{metric.label}</span>
                        </div>
                        <span className="font-semibold">{value}</span>
                      </div>
                    );
                  })}

                  <div className="border-t pt-4 space-y-2">
                    <h3 className="font-semibold mb-2">Audience Demographics</h3>
                    <p className="text-sm"><span className="text-muted-foreground">Age:</span> {influencer.audience.age}</p>
                    <p className="text-sm"><span className="text-muted-foreground">Location:</span> {influencer.audience.location}</p>
                    <p className="text-sm"><span className="text-muted-foreground">Gender:</span> {influencer.audience.gender}</p>
                  </div>
                </div>

                <Button className="w-full mt-6" variant="default">
                  Select {influencer.name}
                </Button>
              </Card>
            ))}
          </div>

          {/* AI Recommendation / Winner */}
          <Card className="p-6 bg-primary/5 border-primary">
            <h3 className="text-xl font-bold mb-2 text-center">AI Recommendation</h3>
            <p className="text-center text-muted-foreground mb-4">
              Based on your campaign goals, we recommend{" "}
              <span className="font-semibold text-primary">{influencers[0].name}</span> for higher engagement and ROI.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="hero">Start Campaign</Button>
              <Button variant="outline">View More Details</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Compare;
