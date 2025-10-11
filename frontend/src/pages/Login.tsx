import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [influencerEmail, setInfluencerEmail] = useState("");
  const [influencerPassword, setInfluencerPassword] = useState("");

  const handleCompanyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, authenticate with backend
    navigate("/profile"); // ✅ go to company profile
  };

  const handleInfluencerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, authenticate with backend
    navigate("/influencer-dashboard"); // ✅ go to influencer dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-background px-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <Logo />


        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-muted-foreground mb-8">
          Sign in to your account
        </p>

        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="influencer">Influencer</TabsTrigger>
          </TabsList>

          {/* 🏢 Company Login */}
          <TabsContent value="company">
            <form onSubmit={handleCompanyLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-email">Email</Label>
                <Input
                  id="company-email"
                  type="email"
                  placeholder="company@example.com"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-password">Password</Label>
                <Input
                  id="company-password"
                  type="password"
                  placeholder="••••••••"
                  value={companyPassword}
                  onChange={(e) => setCompanyPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Sign In as Company
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup/company"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </TabsContent>

          {/* 🌟 Influencer Login */}
          <TabsContent value="influencer">
            <form onSubmit={handleInfluencerLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="influencer-email">Email</Label>
                <Input
                  id="influencer-email"
                  type="email"
                  placeholder="influencer@example.com"
                  value={influencerEmail}
                  onChange={(e) => setInfluencerEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="influencer-password">Password</Label>
                <Input
                  id="influencer-password"
                  type="password"
                  placeholder="••••••••"
                  value={influencerPassword}
                  onChange={(e) => setInfluencerPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Sign In as Influencer
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup/influencer"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
