"use client"
import MonthCalendar from "@/app/components/MonthCalendar";
import EventsCards from "@/app/components/EventsCards";
import {useEffect, useState} from "react";

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateEvents, setDateEvents] = useState(null);
    const [loading, setLoading] = useState(true);

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
    const [upcomingEvents, setUpcomingEvents] = useState(null);
    useEffect(() => {
        const host = (process.env.NEXT_PUBLIC_API_MODE === 'dev' ? process.env.NEXT_PUBLIC_API_HOST_LOCAL : process.env.NEXT_PUBLIC_API_HOST_PROD)
        async function fetchEvents() {
            try {
                const response = await fetch(`${host}/events`,
                    {
                        method: "GET",
                    });
                const json = await response.json();
                console.log(json);
                if (json.events.length > 0) {
                    json.events.sort((a, b) => {
                        if(a.cc_event_start > b.cc_event_start) return 1;
                        return -1;
                    })
                    setUpcomingEvents(json.events.slice(0, 4));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    },[])

    useEffect(() => {
        if (upcomingEvents && upcomingEvents.length > 0) {
            const todayDate = new Date();
            setSelectedDate(todayDate);
            const dateAsString = todayDate.toISOString().split("T")[0];
            setDateEvents(upcomingEvents.filter((event) => event.cc_event_start.split("T")[0] === dateAsString));
        }
    }, [upcomingEvents]);


    const handleDate = (date) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);
        const dateAsString = newDate.toISOString().split("T")[0];
        setDateEvents(upcomingEvents.filter((event) => event.cc_event_start.split("T")[0] === dateAsString));
    }

    const today = new Date();

    return (<div className={"w-full min-h-screen flex flex-col justify-start pt-10 items-center"}>
        <h2 className={"text-4xl font-bold font-banger"}>Upcoming Events</h2>
        {upcomingEvents ? <EventsCards ccEvents={upcomingEvents} /> : <div className={"mt-10 mb-10 text-xl"}>Loading Events...</div>}
        <MonthCalendar onDateSelect={handleDate} />
        <h2 className={"text-2xl font-bold font-sans"}>{selectedDate.toDateString() !== today.toDateString()   ? `Happening on ${selectedDate.toLocaleDateString()}` : `Happening Today`}</h2>
        <EventsCards ccEvents={dateEvents} />
        </div>)
}