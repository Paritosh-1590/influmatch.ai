import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Home,
  MessageSquare,
  BarChart3,
  Users,
  Trophy,
  User,
  Menu,
  Target,
  TrendingUp,
  DollarSign,
  Heart,
  CalendarDays
} from "lucide-react";
import Chatbot from "@/components/Chatbot";

const InfluencerDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

const navigationItems = [
  { title: "Dashboard", url: "/influencer-dashboard", icon: Home },
  { title: "My Campaigns", url: "/influencer/campaigns", icon: Target },
  { title: "Messages", url: "/influencer/messages", icon: MessageSquare },
  { title: "Collaborative Calendar", url: "/influencer-calendar", icon: CalendarDays },
  { title: "Profile", url: "/influencer/profile", icon: User },
];


  // 📈 Mock Data
  const engagementGrowth = [
    { month: "Jan", engagement: 4.2 },
    { month: "Feb", engagement: 4.8 },
    { month: "Mar", engagement: 5.5 },
    { month: "Apr", engagement: 6.1 },
    { month: "May", engagement: 7.3 },
    { month: "Jun", engagement: 8.0 },
  ];

  const platformData = [
    { name: "Instagram", value: 50 },
    { name: "TikTok", value: 30 },
    { name: "YouTube", value: 20 },
  ];

  const COLORS = ["#ff6f61", "#ff9a8b", "#ffc3a0"];

  const stats = [
    { label: "Total Collaborations", value: "24", icon: Users, color: "text-primary" },
    { label: "Engagement Rate", value: "8.7%", icon: TrendingUp, color: "text-green-500" },
    // { label: "Earnings", value: "₹1.2L", icon: DollarSign, color: "text-yellow-500" },
    { label: "Followers Growth", value: "+12%", icon: Heart, color: "text-pink-500" },
  ];

  const collaborations = [
    { brand: "TechCorp", since: "2 weeks ago" },
    { brand: "StyleHub", since: "1 month ago" },
    { brand: "TravelPro", since: "3 months ago" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
          <div className="p-4 border-b flex items-center justify-between">
            {!collapsed && (
              <Logo collapsed={collapsed} />
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background p-4 flex items-center gap-4">
            <SidebarTrigger onClick={() => setCollapsed(!collapsed)}>
              <Menu className="w-6 h-6" />
            </SidebarTrigger>
            <h1 className="text-2xl font-bold">Influencer Dashboard</h1>
          </header>

          <main className="flex-1 p-6 bg-secondary overflow-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color}`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 animate-slide-up">
                <h2 className="text-xl font-semibold mb-4">Engagement Growth</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#ff6f61"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 animate-slide-up">
                <h2 className="text-xl font-semibold mb-4">Platform Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Collaborations Section */}
            <Card className="p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Recent Brand Collaborations</h2>
              <div className="space-y-4">
                {collaborations.map((collab, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-background rounded-lg border hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{collab.brand}</p>
                        <p className="text-sm text-muted-foreground">
                          Collaborating since {collab.since}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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

export default InfluencerDashboard;
