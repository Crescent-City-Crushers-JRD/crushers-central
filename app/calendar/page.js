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
    const [upcomingEvents, setUpcomingEvents] = useState(sampleUpcomingEvents);
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
                    setUpcomingEvents(json.events);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    },[])

    // Converts the <input>'s local value -> a proper RFC3339 string (with offset)
    function toRFC3339(localValue) {
        if (!localValue) return "";
        const d = new Date(localValue); // interpreted as local time
        const pad = (n) => String(n).padStart(2, "0");
        const offsetMin = -d.getTimezoneOffset(); // e.g. -360 for UTC-6 -> 360
        const sign = offsetMin >= 0 ? "+" : "-";
        const absOffset = Math.abs(offsetMin);
        const offsetStr = `${sign}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`;

        return (
            `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
            `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
            offsetStr
        );
    }

    function toDatetimeLocalValue(rfc3339) {
        if (!rfc3339) return "";
        const d = new Date(rfc3339);
        if (isNaN(d)) return "";
        const pad = (n) => String(n).padStart(2, "0");
        return (
            `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
            `T${pad(d.getHours())}:${pad(d.getMinutes())}`
        );
    }

    const handleDate = (date) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);
        const dateAsString = newDate.toISOString().split("T")[0];
        setDateEvents(upcomingEvents.filter((event) => event.cc_event_start.split("T")[0] === dateAsString));
    }

    const today = new Date();

    return (<div className={"w-full min-h-screen flex flex-col justify-start pt-10 items-center"}>
        <h2 className={"text-4xl font-bold font-banger"}>Upcoming Events</h2>
        <EventsCards ccEvents={upcomingEvents.slice(0, 4)} />
        <MonthCalendar onDateSelect={handleDate} />
        <h2 className={"text-2xl font-bold font-sans"}>{selectedDate.toDateString() !== today.toDateString()   ? `Happening on ${selectedDate.toLocaleDateString()}` : `Happening Today`}</h2>
        <EventsCards ccEvents={dateEvents} />
        </div>)
}