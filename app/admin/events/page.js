"use client"


import {useEffect, useState} from "react";

export default function AdminEvent() {
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventPayload, setEventPayload] = useState({
        event_type: "",
        event_name: "",
        event_start: "",
        event_end: "",
        event_description: "",
        event_location: "BERD Warehouse",
        event_address_str: "3632 Desire Pkwy, New Orleans, LA 70126",
        event_address: {
            street: "3632 Desire Pkwy",
            city: "New Orleans",
            state: "LA",
            zip:   "70126"
        },
        status: ""
    });
    const host = (process.env.NEXT_PUBLIC_API_MODE === 'dev' ? process.env.NEXT_PUBLIC_API_HOST_LOCAL : process.env.NEXT_PUBLIC_API_HOST_PROD)
    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(`${host}/events`,
                    {
                        method: "GET",
                    });
                const json = await response.json();
                setEvents(json.events);
                console.log(json);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    },[])

    const EVENT_TYPES = [
        "Practice",
        "Scrimmage",
        "Assessments",
        "Level 2/3",
        "Game",
        "Social",
        "Other"
    ]

    function resetForm() {
        setEditId(null);
        setEventPayload(
            {
                event_type: "Practice",
                event_name: "",
                event_start: "",
                event_end: "",
                event_description: "",
                event_location: "BERD Warehouse",
                event_address_str: "3632 Desire Pkwy, New Orleans, LA 70126",
                event_address: {
                    street: "3632 Desire Pkwy",
                    city: "New Orleans",
                    state: "LA",
                    zip:   "70126"
                },
                status: ""
            }
        )
    }

    useEffect(() => {

    }, [])

    // Converts an RFC3339 string -> value the <input type="datetime-local"> expects
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


    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true);
        async function sendEvent(payload) {
            try {
                console.log("Sending Payload", payload, "To: ", `${host}/events`);
                const response = await fetch(`${host}/events`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });
                if(response.ok) {
                    const data = await response.json();
                    console.log(data);
                    resetForm();
                } else {
                    console.log("Failed", response);
                }
                const json = await response.json();
                setEvents(json.events);
                console.log(json);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsSubmitting(false);
                setEditingId(null);
            }
        }
        sendEvent(eventPayload);
    }

    function handleLocation(event) {
        console.log("event", event.target.value);
        if (event.target.value === "Warehouse") {
            setEventPayload({ ...eventPayload, event_address_str: "3632 Desire Pkwy, New Orleans, LA 70126" });
        } else {
            setShowLocation(true);
        }
    }
    function handleLocationChange(event) {

    }
    function listEvents() {
        console.log("events", events);
        if(events != null) {
            return events.map((event) => {
                console.log("event", event);
                return <tr className="text-center" key={event.id}>
                    <td>{event.cc_event_type ? event.cc_event_type : "Practice"}</td>
                    <td>{event.cc_event_name}</td>
                    <td>{toDatetimeLocalValue(event.cc_event_start)}</td>
                    <td>{toDatetimeLocalValue(event.cc_event_end)}</td>
                    <td><button id={event.id} onClick={(e)=>{console.log("Loading: ",event.id)}} className={"cursor-pointer"}>Edit</button></td>
                </tr>
            })

        }
        return false;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 min-h-screen w-full">
            <h2 className="text-3xl font-bold mb-8">Manage Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-md w-full">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label>Event</label>
                        <input
                            className="w-full border rounded-lg p-2"
                            placeholder="Event Name"
                            value={eventPayload.name}
                            onChange={(e) => setEventPayload({ ...eventPayload, event_name: e.target.value })}
                            required
                        />
                        <label>Event Type</label>
                        <select
                            className="w-full border rounded-lg p-2"
                            onChange={(e) => setEventPayload({ ...eventPayload, event_type: e.target.value })}
                        >
                            {
                                EVENT_TYPES.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))
                            }
                        </select>
                        <div className="flex justify-between">
                            <span className="w-1/2">
                                <label className="w-1/3 pr-4">Start:</label>
                                <input
                                    type="datetime-local"
                                    className="w-2/3 border border-gray-200 rounded-lg shadow-sm"
                                    value={toDatetimeLocalValue(eventPayload.event_start)}
                                    onChange={(e) => setEventPayload({ ...eventPayload, event_start: toRFC3339(e.target.value) })}
                                />
                            </span>
                            <span className="w-1/2">
                                <label className="w-1/3 pr-4">End:</label>
                                <input
                                    type="datetime-local"
                                    className="w-2/3 border border-gray-200 rounded-lg shadow-sm"
                                    value={toDatetimeLocalValue(eventPayload.event_end)}
                                    onChange={(e) => setEventPayload({ ...eventPayload, event_end: toRFC3339(e.target.value) })}
                                />
                            </span>
                        </div>
                        <label >Event Description</label>
                        <textarea
                            className="w-full border rounded-lg p-2 h-20"
                            placeholder="Event Description"
                            value={eventPayload.description}
                            onChange={(e) => setEventPayload({ ...eventPayload, description: e.target.value })}
                        />
                        <label className="w-1/2">Event Location</label>
                        <select className="w-full border rounded-lg p-2"
                                required
                        onChange={(e) => {setEventPayload({ ...eventPayload, location: e.target.value }); handleLocation(e);} }>
                            <option value="Warehouse">BERD Warehouse</option>
                            <option value="Other">Other</option>
                        </select>
                        <span className={showLocation ? "" : "hidden"}>
                        <label className="w-1/2">Location Name:</label>
                            <input
                                className="w-full border rounded-lg p-2"
                                placeholder="Location Name"
                                value={eventPayload.name}
                                onChange={(e) => setEventPayload({ ...eventPayload, event_location: e.target.value })}
                                required
                            />
                        <label className="w-1/2">Location Address:</label>
                            <input
                                className="w-full border rounded-lg p-2"
                                placeholder="Location Address"
                                value={eventPayload.event_address_str}
                                onChange={(e) => setEventPayload({ ...eventPayload, event_address_str: e.target.value })}
                                required
                            />
                        </span>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                                onClick={handleSubmit}
                            >
                                {isSubmitting ? "Saving..." : editingId ? "Update" : "Create"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="border px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div>
                    <h1>Events In Database</h1>
                    <table className="w-full border rounded-lg shadow-md w-full">
                        <thead>
                        <tr>
                            <th>Event Type</th>
                            <th>Event Name</th>
                            <th>Event Start</th>
                            <th>Event End</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listEvents()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}