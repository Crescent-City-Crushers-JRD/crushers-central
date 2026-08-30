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
    useEffect(() => {
        setTimeout(()=>{
            textRef.current.style.opacity = 1;
            textRef.current.style.marginTop = '40px';
            textRef.current.style.display = 'block';
            },
        3000);
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
        </div>
  );
}
