"use client"
export default function EventCard({ccEvent}) {
    const eventStart = new Date(ccEvent.cc_event_start);
    const buildAddress = (ccEvent) => {
        let address = ""
        if (ccEvent.cc_event_address?.street !== undefined){
            address += ccEvent.cc_event_address.street + ", "
        }
        if(ccEvent.cc_event_address?.city !== undefined){
            address += ccEvent.cc_event_address.city + ", "
        }
        if(ccEvent.cc_event_address?.state !== undefined){
            address += ccEvent.cc_event_address.state + ", "
        }
        if(ccEvent.cc_event_address?.zip !== undefined){
            address += ccEvent.cc_event_address.zip
        }

        return address;
    }



    return (
        <div className="flex flex-col justify-center items-center w-1/4 border min-w-[180] border-blue-950 rounded-lg p-1 m-2">
            <h3 className={"font-bold"}>{ccEvent.cc_event_name}</h3>
            <p className={"pb-2 text-sm"}>{eventStart.toLocaleString()}</p>
            <p className={"text-center text-sm pb-2"}>{ccEvent.cc_event_description}</p>
            <p className={"text-sm"}>{ccEvent.cc_event_location}</p>
            <p className={"text-sm text-center"}>{buildAddress(ccEvent)}</p>
        </div>
    )
}