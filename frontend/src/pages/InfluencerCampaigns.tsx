import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Calendar } from "lucide-react";

const MyCampaigns = () => {
  const campaigns = [
    { name: "GlowUp Skincare", status: "Active", date: "Oct 5, 2025", progress: "80%" },
    { name: "EcoFit Apparel", status: "Pending", date: "Oct 1, 2025", progress: "60%" },
    { name: "TechHub Gadgets", status: "Completed", date: "Sep 10, 2025", progress: "100%" },
  ];

  return (
    <div className="p-8 bg-secondary min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-primary">My Campaigns</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c, i) => (
          <Card key={i} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">{c.name}</h2>
                <p className="text-sm text-muted-foreground">{c.status}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              <Calendar className="inline w-4 h-4 mr-1" /> Started on {c.date}
            </p>
            <div className="w-full bg-muted h-2 rounded-full mb-4">
              <div
                className="h-2 bg-primary rounded-full"
                style={{ width: c.progress }}
              />
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCampaigns;
