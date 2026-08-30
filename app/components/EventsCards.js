"use client"

import EventCard from "@/app/components/EventCard";

export default function EventsCards({ ccEvents }) {
    if (ccEvents === null) {
        return <div>Nothing Happening</div>;
    }
    ccEvents.sort(function (a, b) {
        if(a.cc_event_start < b.cc_event_start) return -1;
        return 1;
    })
    const cards = ccEvents.map((ccEvent)=> {
        return (
            <EventCard key={ccEvent.id} ccEvent={ccEvent} />
        )
    })
    return (
        <div className="flex flex-row overflow-x-scroll overflow-y-hidden w-1/2 mb-10 min-h-50">
            {cards.length === 0 ? <div>Nothing Happening</div> : cards}
        </div>
    )
}