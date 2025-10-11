import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MapPin, Mail, Phone, Globe, Edit, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const [products, setProducts] = useState([
    {
      name: "Acme Software Suite",
      description: "Comprehensive business management platform.",
      dos: "Highlight productivity and innovation.",
      donts: "Avoid technical jargon or negative comparisons."
    },
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      { name: "", description: "", dos: "", donts: "" },
    ]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: string, value: string) => {
    const updated = [...products];
    (updated[index] as any)[field] = value;
    setProducts(updated);
  };

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
                  <AvatarFallback className="text-5xl font-bold bg-primary/20 text-primary">
                    AC
                  </AvatarFallback>
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
          <Card className="p-6 space-y-6">
            <h3 className="text-xl font-bold">Edit Profile</h3>

            {/* General Info */}
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
              <Label htmlFor="target">Target Audience</Label>
              <Textarea
                id="target"
                rows={3}
                placeholder="Describe your target audience..."
                defaultValue="Tech-savvy professionals aged 25-45."
              />
            </div>

            {/* Brand Vibe */}
            <div className="space-y-2">
              <Label htmlFor="brandVibe">Brand Vibe</Label>
              <Select defaultValue="innovative">
                <SelectTrigger id="brandVibe">
                  <SelectValue placeholder="Select brand vibe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="innovative">Innovative</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="luxurious">Luxurious</SelectItem>
                  <SelectItem value="playful">Playful</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ✅ Products Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Products</h4>
                <Button variant="outline" size="sm" onClick={addProduct}>
                  <Plus className="w-4 h-4 mr-2" /> Add Product
                </Button>
              </div>

              {products.map((product, index) => (
                <Card key={index} className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="text-md font-bold">Product {index + 1}</h5>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input
                      value={product.name}
                      onChange={(e) => updateProduct(index, "name", e.target.value)}
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={product.description}
                      onChange={(e) => updateProduct(index, "description", e.target.value)}
                      placeholder="Describe your product..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Do’s</Label>
                      <Textarea
                        value={product.dos}
                        onChange={(e) => updateProduct(index, "dos", e.target.value)}
                        placeholder="Things to emphasize or do..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Don’ts</Label>
                      <Textarea
                        value={product.donts}
                        onChange={(e) => updateProduct(index, "donts", e.target.value)}
                        placeholder="Things to avoid mentioning..."
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="default" size="lg">Save Changes</Button>
              <Button variant="outline" size="lg">Cancel</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
