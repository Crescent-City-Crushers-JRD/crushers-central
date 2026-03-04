"use client"
import MonthCalendar from "@/app/components/MonthCalendar";
import EventsCards from "@/app/components/EventsCards";
import {useEffect, useState} from "react";

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateEvents, setDateEvents] = useState(null);


    const sampleUpcomingEvents = [{
        id: 1,
        ccEventName: "Sunday Practice",
        ccEventDate: "2026-02-22",
        ccEventStart: "2026-02-22T09:00:00-06:00",
        ccEventEnd: "2026-02-22T011:00:00-06:00",
        ccEventDescription: "Regular Skating Practice for all levels",
        ccEventLocation: "BERD Warehouse",
    },
        {
            id: 2,
            ccEventName: "Wednesday Practice",
            ccEventDate: "2026-02-25",
            ccEventStart: "2026-02-22T18:30:00-06:00",
            ccEventEnd: "2026-02-22T011:20:30-06:00",
            ccEventDescription: "Regular Skating Practice for Levels 2 & 3",
            ccEventLocation: "BERD Warehouse",
        }
    ];
    const [upcomingEvents, setUpcomingEvents] = useState(sampleUpcomingEvents);

    useEffect(() => {

    },[])

    const handleDate = (date) => {
        console.log("Date As Recorded By Calendar Page:", date);
        const newDate = new Date(date);
        setSelectedDate(newDate);
    }

    const today = new Date();

    return (<div className={"w-full h-screen flex flex-col justify-start pt-10 items-center"}>
        <h2 className={"text-4xl font-bold font-banger"}>Upcoming Events</h2>
        <EventsCards ccEvents={upcomingEvents} />
        <MonthCalendar onDateSelect={handleDate} />
        <h2 className={"text-2xl font-bold font-sans"}>{selectedDate.toDateString() !== today.toDateString()   ? `Happening on ${selectedDate.toLocaleDateString()}` : `Happening Today`}</h2>
        <EventsCards ccEvents={dateEvents} />
        </div>)
}