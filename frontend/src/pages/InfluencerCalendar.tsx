import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";

const InfluencerCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [viewMode, setViewMode] = useState("month");

  const events = [
    { 
      title: "Collab with Nike", 
      date: "2025-10-15", 
      details: "Instagram Story Promotion for new sneakers.", 
      status: "confirmed",
      type: "promotion"
    },
    { 
      title: "Reel Shoot", 
      date: "2025-10-18", 
      details: "Shoot for sponsored fitness reel.", 
      status: "pending",
      type: "shoot"
    },
    { 
      title: "Brand Meeting", 
      date: "2025-10-20", 
      details: "Zoom meeting with skincare brand.", 
      status: "confirmed",
      type: "meeting"
    },
    { 
      title: "Content Submission", 
      date: "2025-10-25", 
      details: "Submit draft content for approval.", 
      status: "upcoming",
      type: "deadline"
    },
  ];

  const handleEventClick = (info: any) => {
    const event = events.find((e) => e.title === info.event.title);
    setSelectedEvent({
      title: info.event.title,
      date: info.event.startStr,
      details: event?.details || "No details available.",
      status: event?.status,
      type: event?.type,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "upcoming": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "upcoming": return <AlertCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Collaborative Calendar
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base mt-2">
              View and manage your upcoming collaborations & deadlines
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add New Event
          </Button>
        </div>

        <Card className="p-6 shadow-lg border-none rounded-3xl bg-gradient-to-br from-white to-orange-50 hover:shadow-xl transition-all duration-300">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events.map(event => ({
              ...event,
              backgroundColor: getStatusColor(event.status),
              borderColor: getStatusColor(event.status),
            }))}
            eventClick={handleEventClick}
            height="auto"
            eventTextColor="white"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            dayMaxEventRows={3}
            eventDisplay="block"
            eventContent={(arg) => (
              <div className="p-1 text-xs font-medium">
                {arg.event.title}
              </div>
            )}
          />
        </Card>

        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-md rounded-2xl shadow-lg p-6 bg-gradient-to-br from-white to-purple-50">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-purple-700 flex items-center gap-2">
                {getStatusIcon(selectedEvent?.status)}
                {selectedEvent?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`${getStatusColor(selectedEvent?.status)} text-white`}>
                  {selectedEvent?.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedEvent?.date}</span>
              </div>
              <p className="text-base leading-relaxed text-gray-700">{selectedEvent?.details}</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                  Edit Event
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white">
                  Mark Complete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InfluencerCalendar;
