"use client"
export default function EventCard({ccEvent}) {
    const eventStart = new Date(ccEvent.cc_event_start);
    return (
        <div className="flex flex-col justify-center items-center w-1/4 border min-w-[180] border-blue-950 rounded-lg p-1 m-2">
            <h3 className={"font-bold"}>{ccEvent.cc_event_name}</h3>
            <p className={"pb-2 text-sm"}>{eventStart.toLocaleString()}</p>
            <p className={"text-center pb-2"}>{ccEvent.cc_event_description}</p>
            <p className={"text-sm"}>{ccEvent.cc_event_location}</p>
        </div>
    )
}