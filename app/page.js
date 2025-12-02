"use client"

import ImageCarousel from "@/app/components/ImageCarousel";

export default function Home() {
    const images = [
        "/images/carousel2.jpg",
        "/images/carousel1.jpg",
        "/images/carousel4.jpg",
        "/images/carousel5.jpg",
        "/images/carousel6.jpg",
    ]

    return (
        <div className="flex flex-col h-screen bg-white">
            <div className="flex flex-col justify-center mt-5">
                <div className="text-center w-full">
                    <h2 className="font-bold text-5xl animate-slide-down drop-shadow-sm drop-shadow-indigo-600 font-banger" >Crescent City</h2>
                    <h1 className={`text-8xl animate-slide-bounce font-extrabold drop-shadow-md drop-shadow-gray-700 font-banger`}>Crushers</h1>
                </div>
            </div>
            <ImageCarousel images={images} />
        </div>
  );
}
