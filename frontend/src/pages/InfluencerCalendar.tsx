import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InfluencerCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = [
    { title: "Collab with Nike", date: "2025-10-15", details: "Instagram Story Promotion for new sneakers." },
    { title: "Reel Shoot", date: "2025-10-18", details: "Shoot for sponsored fitness reel." },
    { title: "Brand Meeting", date: "2025-10-20", details: "Zoom meeting with skincare brand." },
    { title: "Content Submission", date: "2025-10-25", details: "Submit draft content for approval." },
  ];

  const handleEventClick = (info: any) => {
    setSelectedEvent({
      title: info.event.title,
      date: info.event.startStr,
      details: events.find((e) => e.title === info.event.title)?.details || "No details available.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-background py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
            Collaborative Calendar
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            View and manage your upcoming collaborations & deadlines
          </p>
        </div>

        {/* Calendar Card */}
        <Card className="p-6 shadow-lg border-none rounded-3xl bg-gradient-to-br from-white to-pink-50 hover:shadow-xl transition-all duration-300">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            height="75vh"
            eventColor="hsl(6, 100%, 69%)"
            eventTextColor="white"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            dayMaxEventRows={2}
          />
        </Card>

        {/* Dialog for event details */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-md rounded-2xl shadow-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-primary">
                {selectedEvent?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-3 space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Date:</strong> {selectedEvent?.date}
              </p>
              <p className="text-base leading-relaxed">{selectedEvent?.details}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InfluencerCalendar;
