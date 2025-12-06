"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef, useState } from "react";

export default forwardRef(function Navbar(props, ref) {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { id: 0, title: "Home", link: "/" },
        { id: 1, title: "Crushers", link: "/team" },
        { id: 2, title: "About", link: "/about" },
        { id: 3, title: "Join", link: "/join" },
        { id: 4, title: "Calendar", link: "/calendar" },
        { id: 5, title: "Caregivers", link: "/parents" },
        { id: 6, title: "Contribute", link: "/support" },
    ];

    const navInner = navLinks.map((item) => (
        <Link
            key={item.id}
            href={item.link}
            className="
        relative text-white cursor-pointer py-2
        after:content-['']
        after:absolute after:left-0 after:-bottom-1
        after:h-[2px] after:w-0
        after:bg-indigo-500
        after:transition-all after:duration-200
        hover:after:w-full
      "
            onClick={() => setOpen(false)} // close menu when clicking a link
        >
            {item.title}
        </Link>
    ));

    return (
        <nav
            ref={ref}
            className="bg-gray-900 text-white h-[60px] flex items-center justify-between px-6 md:px-12 rounded-b-3xl z-50 relative"
        >
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                    <Image
                        width="50"
                        height="50"
                        src="/CCCLogoTran.png"
                        alt="Logo"
                        className="cursor-pointer"
                    />
                </Link>
            </div>

            {/* Hamburger (mobile only) */}
            <button
                className="md:hidden flex flex-col gap-[5px] p-2"
                onClick={() => setOpen(!open)}
            >
                <div
                    className={`w-6 h-[3px] bg-white transition-all ${
                        open ? "rotate-45 translate-y-[6px]" : ""
                    }`}
                ></div>
                <div
                    className={`w-6 h-[3px] bg-white transition-all ${
                        open ? "opacity-0" : ""
                    }`}
                ></div>
                <div
                    className={`w-6 h-[3px] bg-white transition-all ${
                        open ? "-rotate-45 -translate-y-[10px]" : ""
                    }`}
                ></div>
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex flex-row gap-10 pr-10">{navInner}</ul>

            {/* Mobile Dropdown Menu */}
            <div
                className={`
          absolute top-[60px] left-0 w-full bg-gray-900 rounded-b-3xl shadow-lg
          flex flex-col items-start px-8 py-4 gap-4
          transition-all duration-300 md:hidden z-50
          ${open ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"}
        `}
            >
                {navInner}
            </div>
        </nav>
    );
});
