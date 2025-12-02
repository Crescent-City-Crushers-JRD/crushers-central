"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function ImageCarousel({ images, interval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);

    // Normal carousel behavior
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }, interval);

        return () => clearInterval(timerRef.current);
    }, [images.length, interval]);

    return (
        <div className="animate-slide-up relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl">
            <div className="relative h-[400px]">
                {
                    images.map((src, index) => (
                        <div
                            key={index}
                            className={`
                                absolute inset-0 transition-opacity duration-700 ease-in-out
                                ${index === currentIndex
                                                ? "opacity-100"
                                                : "opacity-0"}
                              `}
                                        >
                                            <Image
                                                src={src}
                                                alt={`Slide ${index}`}
                                                fill
                                                className="object-cover"
                                            />
                        </div>
                    ))
                }
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`
            w-2.5 h-2.5 rounded-full transition-all
            ${i === currentIndex
                            ? "bg-white scale-110"
                            : "bg-white/50"}
          `}
                    />
                ))}
            </div>

        </div>
    );
}
