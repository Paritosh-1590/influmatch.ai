import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Instagram, Youtube, Twitter, Globe, MapPin, Star, TrendingUp, Users, Eye } from "lucide-react";

const InfluencerProfile = () => {
  return (
    <div className="p-8 bg-secondary min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://via.placeholder.com/150" alt="Profile" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-primary mb-2">Alex Influencer</h1>
              <p className="text-muted-foreground mb-4">Lifestyle and beauty influencer passionate about sustainable brands.</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary">Beauty</Badge>
                <Badge variant="secondary">Lifestyle</Badge>
                <Badge variant="secondary">Sustainable</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">125K</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </Card>
          <Card className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">4.2%</div>
            <div className="text-sm text-muted-foreground">Engagement Rate</div>
          </Card>
          <Card className="p-4 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">2.1M</div>
            <div className="text-sm text-muted-foreground">Avg. Views</div>
          </Card>
          <Card className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </Card>
        </div>

        {/* Profile Form */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Your name" defaultValue="Alex Influencer" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="Your email" defaultValue="alex@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="City, Country" defaultValue="Los Angeles, USA" />
              </div>
              <div>
                <label className="text-sm font-medium">Website</label>
                <Input placeholder="https://yourwebsite.com" defaultValue="https://alexinfluencer.com" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                placeholder="Tell brands about yourself"
                rows={4}
                defaultValue="Lifestyle and beauty influencer passionate about sustainable brands. I love creating authentic content that resonates with my audience of eco-conscious millennials."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Niche/Category</label>
              <Select defaultValue="beauty">
                <SelectTrigger>
                  <SelectValue placeholder="Select your niche" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <Input placeholder="@yourhandle" defaultValue="@alexinfluence" />
                </div>
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <Input placeholder="YouTube Channel" defaultValue="Alex Influencer" />
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="w-5 h-5 text-blue-500" />
                  <Input placeholder="@twitterhandle" defaultValue="@alexinfluence" />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-500" />
                  <Input placeholder="TikTok Handle" defaultValue="@alexinfluence" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Collaboration Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Preferred Contact Method</label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="dm">DM</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Response Time</label>
                  <Select defaultValue="24h">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Within 24 hours</SelectItem>
                      <SelectItem value="48h">Within 48 hours</SelectItem>
                      <SelectItem value="week">Within a week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pricing (USD)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Instagram Post</label>
                  <Input placeholder="500" defaultValue="500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Sponsored Story</label>
                  <Input placeholder="300" defaultValue="300" />
                </div>
                <div>
                  <label className="text-sm font-medium">YouTube Video</label>
                  <Input placeholder="1000" defaultValue="1000" />
                </div>
              </div>
            </div>

            <Button className="w-full">Save Changes</Button>
          </form>
        </Card>

        {/* Portfolio Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">Upload New Content</Button>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerProfile;