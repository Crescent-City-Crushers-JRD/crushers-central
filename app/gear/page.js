"use client"

import {useState} from "react";

export default function AboutPage() {
    const navs = [
        {id: 0, title: "Pads"},
        {id: 1, title: "Helmets & Mouthguards"},
        {id: 2, title: "Skates"},
        {id: 3, title: "Skate Care"},
        {id: 4, title: "Tools, Bags, Clothing"},
    ]

    const panels = [
        {id: 0, source:
                <div>
                    <h3>About Pads</h3>
                </div>},
        {id: 1, source:
                <div>
                    <h3>About Helmets</h3>
                </div>
        },
        {id: 2, source:
                <div>
                    <h3>About Skates</h3>
                </div>
        },
        {id: 3, source:
                <div>
                    <h3>Skate Care Basics</h3>
                </div>
        },
        {id: 4, source:
                <div>
                    <h3>Tools</h3>
                    <h3>Bags, Totes, Skate Ropes</h3>
                </div>
        },
    ]

    const [nav, setNav] = useState(0);
    const gearNav = () => {

        return navs.map(navItem => {
            const navColor = navItem.id === nav ? "bg-gray-600" : "bg-gray-400";
            return <button className={`text-white border-black border-2 ${navColor} rounded-xl w-1/5 ml-1 h-20 lg:h-10 text-sm font-bold`} id={navItem.id} onClick={() => setNav(navItem.id)}>{navItem.title}</button>
        })
    }



    return (
        <div className={"w-full mt-2 flex flex-col items-center min-h-screen"}>
            <h2 className={"text-6xl font-bold text-center mt-5 mb-5"}>Gear</h2>
            <p className={"ml-10 mr-10 "}>Every derby skater needs a variety of equipment to safely and comfortably participate in Roller Derby. We have a few pointers and recommendations
            for what to pick and how to care for your gear, as well as deals and official jersey sources.</p>
            <div className={"w-[90%] mt-2 flex flex-row justify-between items-center"}>
                {gearNav()}
            </div>
            <div className={"w-[90%] mt-2 flex flex-col items-center"}>
                {panels[nav].source}
            </div>
        </div>)


}