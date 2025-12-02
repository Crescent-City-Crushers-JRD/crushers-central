import Image from "next/image";
import { forwardRef } from "react";
import Link from "next/link";

export default forwardRef(function Navbar(props, ref) {
    const navLinks = [
        {id:0, title:"Home", link: "/"},
        {id:1, title: "The Team", link: "/team"},
        {id:2, title: "About The Crushers", link: "/about"},
        {id:3, title: "Join Us", link: "/join"},
        {id:4, title: "Calendar", link: "/calendar"},
        {id:5, title: "Parents/Caregivers", link: "/parents"},
        {id:6, title: "Support Us", link: "/support"},
    ]
    const navInner = navLinks.map((item) => {
        return (
            <Link
                key={item.id}
                href={item.link}
                className="
        relative text-white cursor-pointer
        after:content-['']
        after:absolute after:left-0 after:-bottom-2
        after:h-[2px] after:w-0
        after:bg-indigo-500
        after:transition-all after:duration-200
        hover:after:w-full
      "
            >
                {item.title}
            </Link>
        );
    });
    return (
        <nav ref={ref} className="navbar navbar-expand-lg navbar-dark bg-gray-900 text-white h-[60px]
        flex flex-row justify-end items-center rounded-b-3xl transition-transform duration-300 ease-in-out ">
            <div className="w-1/4 flex flex-row justify-start p-2 ml-10">
                <Link href={navLinks[0].link}>
                <Image width="50" height="50"  src="/CCCLogoTran.png" alt="Logo" />
                </Link>
            </div>
            <ul className="w-3/4 flex flex-row justify-between pr-20">
                {navInner}
            </ul>
        </nav>
    )
});