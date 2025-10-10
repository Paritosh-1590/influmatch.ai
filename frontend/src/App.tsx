import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CompanySignup from "./pages/CompanySignup";
import InfluencerSignup from "./pages/InfluencerSignup";
import CompanyDashboard from "./pages/CompanyDashboard";
import Leaderboard from "./pages/Leaderboard";
import Chat from "./pages/Chat";
import Compare from "./pages/Compare";
import SwipeMatch from "./pages/SwipeMatch";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/company" element={<CompanySignup />} />
          <Route path="/signup/influencer" element={<InfluencerSignup />} />
          <Route path="/dashboard" element={<CompanyDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/swipe" element={<SwipeMatch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
