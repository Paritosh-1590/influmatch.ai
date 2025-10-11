import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const InfluencerProfile = () => {
  return (
    <div className="p-8 bg-secondary min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-primary">Influencer Profile</h1>

      <Card className="p-6 max-w-xl">
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Your name" defaultValue="Alex Influencer" />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="Your email" defaultValue="alex@example.com" />
          </div>

          <div>
            <label className="text-sm font-medium">Instagram Handle</label>
            <Input placeholder="@yourhandle" defaultValue="@alexinfluence" />
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              className="w-full border rounded-lg p-2 text-sm"
              rows={4}
              defaultValue="Lifestyle and beauty influencer passionate about sustainable brands."
            ></textarea>
          </div>

          <Button className="w-full">Save Changes</Button>
        </form>
      </Card>
    </div>
  );
};

export default InfluencerProfile;
