"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/navbar";
import {useEffect, useRef} from "react";

export default function ClientLayout({ children }) {
    const pathname = usePathname();

    const navRef = useRef(null);
    useEffect(() => {
        const nav = navRef.current;
        const navRect = nav.getBoundingClientRect();
        console.log(navRect.top, navRect.bottom);
        nav.style.transform = "translateY(-100%)";
        setTimeout(() => {
            nav.style.transform = "translateY(0px)";
        }, 800);


    }, [])
    return (
        <>
            <Navbar ref={navRef}/>
            <div className="flex flex-col h-screen bg-white pt-14">
                {children}
            </div>
        </>
    );
}