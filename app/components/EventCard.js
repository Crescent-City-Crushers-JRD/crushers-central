"use client"
export default function EventCard({ccEvent}) {
    const eventStart = new Date(ccEvent.ccEventStart);
    return (
        <div className="flex flex-col justify-center items-center w-1/4 border min-w-[180] border-blue-950 rounded-lg p-1 m-2">
            <h3 className={"font-bold"}>{ccEvent.ccEventName}</h3>
            <p className={"pb-2 text-sm"}>{eventStart.toLocaleString()}</p>
            <p className={"text-center pb-2"}>{ccEvent.ccEventDescription}</p>
            <p className={"text-sm"}>{ccEvent.ccEventLocation}</p>
        </div>
    )
}