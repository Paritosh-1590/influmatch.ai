import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Home, Users, MessageSquare, GitCompare, Trophy, User, Bell, Menu, TrendingUp, Target, Eye, Heart } from "lucide-react";
import Chatbot from "@/components/Chatbot";

const CompanyDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "InfluMatch Chat", url: "/chat", icon: MessageSquare },
    { title: "Compare", url: "/compare", icon: GitCompare },
    { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
    { title: "Swipe to Match", url: "/swipe", icon: Heart },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Notifications", url: "/notifications", icon: Bell },
  ];

  const growthData = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 600 },
    { month: 'Mar', value: 800 },
    { month: 'Apr', value: 1200 },
    { month: 'May', value: 1500 },
    { month: 'Jun', value: 1800 },
  ];

  const engagementData = [
    { name: 'Instagram', value: 45 },
    { name: 'TikTok', value: 30 },
    { name: 'YouTube', value: 25 },
  ];

  const COLORS = ['#ff6f61', '#ff9a8b', '#ffc3a0'];

  const stats = [
    { label: "Active Campaigns", value: "12", icon: Target, color: "text-primary" },
    { label: "Match Accuracy", value: "94%", icon: TrendingUp, color: "text-green-500" },
    { label: "Total Views", value: "2.4M", icon: Eye, color: "text-blue-500" },
    { label: "Engagement Rate", value: "8.2%", icon: Heart, color: "text-pink-500" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
          <div className="p-4 border-b flex items-center justify-between">
            {!collapsed && (
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">IM</span>
                </div>
                <span className="font-semibold">InfluMatch</span>
              </Link>
            )}
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          {!collapsed && <span>{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background p-4 flex items-center gap-4">
            <SidebarTrigger onClick={() => setCollapsed(!collapsed)}>
              <Menu className="w-6 h-6" />
            </SidebarTrigger>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </header>

          <main className="flex-1 p-6 bg-secondary overflow-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Growth Analysis</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#ff6f61" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Platform Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Collaborations */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Collaborations</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Campaign #{i}</p>
                        <p className="text-sm text-muted-foreground">Active since 2 weeks ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
              </div>
            </Card>
          </main>
        </div>
      </div>
      <Chatbot />
    </SidebarProvider>
  );
};

export default CompanyDashboard;
