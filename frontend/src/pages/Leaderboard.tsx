import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, TrendingUp, Users, Heart } from "lucide-react";

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const influencers = [
    { rank: 1, name: "Sarah Martinez", platform: "Instagram", followers: "2.5M", engagement: "9.2%", matches: 124, badge: "gold" },
    { rank: 2, name: "Alex Chen", platform: "TikTok", followers: "1.8M", engagement: "8.9%", matches: 98, badge: "silver" },
    { rank: 3, name: "Emma Johnson", platform: "YouTube", followers: "3.1M", engagement: "7.5%", matches: 87, badge: "bronze" },
    { rank: 4, name: "Mike Rodriguez", platform: "Instagram", followers: "980K", engagement: "8.1%", matches: 76 },
    { rank: 5, name: "Lisa Wang", platform: "TikTok", followers: "1.2M", engagement: "9.5%", matches: 72 },
    { rank: 6, name: "David Kim", platform: "YouTube", followers: "850K", engagement: "7.8%", matches: 65 },
    { rank: 7, name: "Sophie Brown", platform: "Instagram", followers: "1.5M", engagement: "8.3%", matches: 61 },
    { rank: 8, name: "James Wilson", platform: "TikTok", followers: "720K", engagement: "8.7%", matches: 58 },
  ];

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "gold": return "bg-yellow-500";
      case "silver": return "bg-gray-400";
      case "bronze": return "bg-amber-700";
      default: return "bg-primary";
    }
  };

  const filteredInfluencers = influencers.filter(inf =>
    inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inf.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Influencer <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Leaderboard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Top performing influencers ranked by engagement, reach, and successful matches
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Influencers</p>
                  <p className="text-2xl font-bold">12,450</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-2xl font-bold">8.4%</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Matches</p>
                  <p className="text-2xl font-bold">3,241</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search */}
          <Card className="p-4 mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or platform..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </Card>

          {/* Leaderboard Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Matches</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInfluencers.map((influencer) => (
                  <TableRow key={influencer.rank} className="hover:bg-secondary transition-colors">
                    <TableCell>
                      <div className={`w-10 h-10 rounded-full ${getBadgeColor(influencer.badge)} flex items-center justify-center text-white font-bold`}>
                        {influencer.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-primary/20 shadow-sm">
                          <AvatarImage src="" alt={influencer.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {influencer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{influencer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{influencer.platform}</Badge>
                    </TableCell>
                    <TableCell>{influencer.followers}</TableCell>
                    <TableCell>
                      <span className="text-green-600 font-semibold">{influencer.engagement}</span>
                    </TableCell>
                    <TableCell>{influencer.matches}</TableCell>
                    <TableCell className="text-right">
                      <Link to="/dashboard">
                        <Button variant="outline" size="sm">View Profile</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
