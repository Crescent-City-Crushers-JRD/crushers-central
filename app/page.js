"use client"

import ImageCarousel from "@/app/components/ImageCarousel";
import { useRef, useState, useEffect } from "react";
import EventsCards from "@/app/components/EventsCards";
export default function Home() {
    const images = [
        "/images/carousel2.jpg",
        "/images/carousel1.jpg",
        "/images/carousel4.jpg",
        "/images/carousel5.jpg",
        "/images/carousel6.jpg",
    ]
    const textRef = useRef(null)
    const [upcomingEvents, setUpcomingEvents] = useState(null);
    useEffect(() => {
        setTimeout(()=>{
            textRef.current.style.opacity = 1;
            textRef.current.style.marginTop = '40px';
            textRef.current.style.display = 'block';
            },
        3000);
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
    }, [])


    return (
        <div className="flex flex-col items-center bg-white pb-50 text-black">
            <div className="flex flex-col justify-center mt-5">
                <div className="text-center w-full">
                    <h2 className="font-bold text-5xl animate-slide-down drop-shadow-sm drop-shadow-indigo-600 font-banger" >Crescent City</h2>
                    <h1 className={`text-8xl animate-slide-bounce font-extrabold drop-shadow-md drop-shadow-gray-700 font-banger`}>Crushers</h1>
                </div>
            </div>

            <div className="text-center w-full items-center opacity-0 hidden m-auto" ref={textRef}>
                <p className="p-3 text-xl md:text-3xl font-bold font-mono">The Crushers are a non-profit, all-gender, all inclusive junior roller derby league for kids ages 7-17 in New Orleans, LA.</p>
            </div>
            <ImageCarousel images={images} />
            <div className={"mt-20 mb-1 text-2xl font-bold"}>Upcoming Events</div>
            <EventsCards ccEvents={upcomingEvents} />
        </div>
  );
}
