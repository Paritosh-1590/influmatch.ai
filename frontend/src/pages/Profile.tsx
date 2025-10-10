import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MapPin, Mail, Phone, Globe, Edit } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b p-4 flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>

      <main className="p-6">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Header */}
          <Card className="p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="" alt="Acme Corporation" />
                  <AvatarFallback className="text-5xl font-bold bg-primary/20 text-primary">AC</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Acme Corporation</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Technology</Badge>
                    <Badge variant="outline">Enterprise</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>contact@acme.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>www.acme.com</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">24</p>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">156</p>
              <p className="text-sm text-muted-foreground">Total Collaborations</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">$2.4M</p>
              <p className="text-sm text-muted-foreground">Total Investment</p>
            </Card>
          </div>

          {/* Edit Profile */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Edit Profile</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Company Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  defaultValue="Leading technology company focused on innovative solutions for modern businesses."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Product Description</Label>
                <Textarea
                  id="product"
                  rows={4}
                  placeholder="Describe your products or services..."
                  defaultValue="We offer cutting-edge software solutions that help businesses streamline operations and drive growth."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Target Audience</Label>
                <Textarea
                  id="target"
                  rows={3}
                  placeholder="Describe your target audience demographics and interests..."
                  defaultValue="Tech-savvy professionals aged 25-45, entrepreneurs, and decision-makers in mid to large-sized companies."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contact@acme.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="default" size="lg">Save Changes</Button>
                <Button variant="outline" size="lg">Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
