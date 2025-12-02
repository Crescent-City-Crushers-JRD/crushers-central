"use client";

import {useEffect, useRef, useState} from "react";

/**
 * SlidingGalleryNoTS.jsx
 *
 * Uses a clone + fixed-position FLIP-style animation so the clicked image
 * appears to slide from its real grid position to the left.
 *
 * Requirements:
 * - Images should live in /public/images/
 * - This uses plain <img> tags (easier to clone); you can adapt to Next/Image if you want
 */
const players = [
    {id:13, src:"/headshots/normal/PinkaVicious-N.jpg", level:0, derbyname:"PinkaVicious", number:"2319", bday:""},
    {id:11, src:"/headshots/normal/LunaTic-N.jpg", level:0, derbyname:"Lunatic", number:"824", bday:""},
    {id:14, src:"/headshots/normal/PlanetRaider-N.jpg", level:0, derbyname:"Planet Raider", number:"3333", bday:""},
    {id:18, src:"/headshots/normal/SlamwiseGamgie-N.jpg", level:0, derbyname:"Slamwise Gamgee", number:"777", bday:""},
    {id:10, src:"/headshots/normal/LittleStar-N.jpg", level:0, derbyname:"Little Star", number:"313", bday:""},
    {id:24, src:"/headshots/normal/ToxicShock-N.jpg", level:0, derbyname:"Toxic Shock", number:"22", bday:""},
    {id:7, src:"/headshots/normal/HotMess-N.jpg", level:0, derbyname:"Hot Mess Express", number:"500", bday:""},
    {id:19, src:"/headshots/normal/SnowFight-N.jpg", level:0, derbyname:"Snow Fight", number:"10", bday:""},
    {id:26, src:"/headshots/normal/Valkerye-N.jpg", level:0, derbyname:"Valkyrie", number:"666", bday:""},
    {id:15, src:"/headshots/normal/Sabotage-N.jpg", level:0, derbyname:"Sabotage", number:"227", bday:""},
    {id:9, src:"/headshots/normal/Lightning-N.jpg", level:0, derbyname:"Lightning", number:"731", bday:""},
    {id:25, src:"/headshots/normal/TrafficJam-N.jpg", level:0, derbyname:"Traffic Jam", number:"11", bday:""},
    {id:8, src:"/headshots/normal/InstiGator-N.jpg", level:0, derbyname:"InstiGator", number:"314", bday:""},
    {id:21, src:"/headshots/normal/Thunder-N.jpg", level:0, derbyname:"Thunder", number:"137", bday:""},
    {id:12, src:"/headshots/normal/MillsCity-N.jpg", level:0, derbyname:"Mills City", number:"52", bday:""},
    {id:16, src:"/headshots/normal/Shadow.jpg", level:0, derbyname:"Shadow", number:"14", bday:""},
    {id:17, src:"/headshots/normal/SkateMistake-N.jpg", level:0, derbyname:"Skate Mistake", number:"23", bday:""},
    {id:5, src:"/headshots/normal/Duckie-N.jpg", level:0, derbyname:"Duck-a-nator", number:"707", bday:""},
    {id:6, src:"/headshots/normal/HelloKilly-N.jpg", level:0, derbyname:"Hello Killy", number:"8", bday:""},
    {id:22, src:"/headshots/normal/TinyTigrrr.jpg", level:0, derbyname:"Tiny Tigrrr", number:"404", bday:""},
    {id:23, src:"/headshots/normal/TinyTornado-N.jpg", level:0, derbyname:"Tiny Tornado", number:"517", bday:""},


];

const coaches = [
    {id:1, src:"/headshots/normal/Coach-Blue-N.jpg", level:4, derbyname:"Blu", number:"", bday:""},
    {id:2, src:"/headshots/normal/Coach-Fancy-N.jpg", level:4, derbyname:"Fancy", number:"", bday:""},
    {id:3, src:"/headshots/normal/Coach-Kat-N.jpg", level:4, derbyname:"Kat", number:"", bday:""}
];

const refs = [
    {id:4, src:"/headshots/normal/DadWeather-N.jpg", level:5, derbyname:"Dad Weather", number:"", bday:""},
    {id:20, src:"/headshots/normal/StormChaser-N.jpg", level:5, derbyname:"Storm Chaser", number:"", bday:""},
]

export default function SlidingGallery() {
    const containerRef = useRef(null);
    const imgRefs = useRef({});

    const [active, setActive] = useState(null); // active = image object when expanded
    const [animating, setAnimating] = useState(false);

    // reset to gallery
    const reset = () => {
        setActive(null);
    };

    const animateContainer = () => {
        const containerRef = containerRef.current;
        setTimeout(() => {
            containerRef.style.opacity = "1";
        }, 800)
    }

    useEffect(() => {
    },[])

    const handleClick = (img, srcstring) => {
        if (animating || (active && active.id === img.id)) return;
        console.log("clicked");
        console.log(img);
        const el = imgRefs.current[img.id];
        const container = containerRef.current;
        if (!el || !container) return;
        const elRect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        console.log(elRect.top);
        console.log(elRect.left);
        console.log(containerRect.top);
        console.log(containerRect.left);
        el.style.transform = `translate(${containerRect.left},${containerRect.top})`;
    }

    // const handleClick = (img) => {
    //     // ignore clicks while animating or already active on same image
    //     if (animating || (active && active.id === img.id)) return;
    //
    //     const el = imgRefs.current[img.id];
    //     const container = containerRef.current;
    //     if (!el || !container) return;
    //
    //     const elRect = el.getBoundingClientRect();
    //     const containerRect = container.getBoundingClientRect();
    //
    //     // create clone
    //     const clone = el.cloneNode(true);
    //     // basic styles so it sits above everything
    //     Object.assign(clone.style, {
    //         position: "fixed",
    //         top: `${elRect.top}px`,
    //         left: `${elRect.left}px`,
    //         width: `${elRect.width}px`,
    //         height: `${elRect.height}px`,
    //         margin: "0",
    //         zIndex: 9999,
    //         transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), width 700ms cubic-bezier(0.22,1,0.36,1), height 700ms cubic-bezier(0.22,1,0.36,1), opacity 300ms",
    //         willChange: "transform, width, height",
    //         borderRadius: getComputedStyle(el).borderRadius || "12px",
    //         objectFit: "cover",
    //     });
    //
    //     document.body.appendChild(clone);
    //
    //     // hide original to avoid double-image flash during animation
    //     el.style.visibility = "hidden";
    //
    //     // small timeout to ensure appended & styles applied, then trigger transform
    //     requestAnimationFrame(() => {
    //         // compute target position (left alignment inside container)
    //         // Add a little padding from container left
    //         const leftPadding = 24;
    //         // target left on-screen coordinate
    //         const targetLeft = containerRect.left + leftPadding;
    //         // target top align to container's top (you can adjust)
    //         const targetTop = containerRect.top + 24;
    //
    //         // compute translation delta (from clone's current position)
    //         const deltaX = targetLeft - elRect.left;
    //         const deltaY = targetTop - elRect.top;
    //
    //         // target scale / size: we want clone to be wider/taller — instead of relying on scale only, adjust width/height too
    //         const targetWidth = Math.min(containerRect.width * 0.5, 900); // e.g. half container
    //         const scaleX = targetWidth / elRect.width;
    //         const scale = scaleX;
    //
    //         // apply transform to move left and scale
    //         clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
    //
    //         // when transition ends, finalize: set active state and remove clone
    //         const onEnd = (e) => {
    //             // ensure we react only to transform/width/height transition end
    //             if (e.target !== clone) return;
    //
    //             clone.removeEventListener("transitionend", onEnd);
    //             // remove clone & update state; show layout with active item
    //             document.body.removeChild(clone);
    //             el.style.visibility = ""; // restore (the grid will re-render)
    //             setAnimating(false);
    //             setActive(img);
    //         };
    //
    //         setAnimating(true);
    //         clone.addEventListener("transitionend", onEnd);
    //
    //         // safety: if transitionend doesn't fire (rare), fallback after duration
    //         setTimeout(() => {
    //             if (document.body.contains(clone)) {
    //                 clone.removeEventListener("transitionend", onEnd);
    //                 try { document.body.removeChild(clone); } catch (err) {}
    //                 el.style.visibility = "";
    //                 setAnimating(false);
    //                 setActive(img);
    //             }
    //         }, 900);
    //     });
    // };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div ref={containerRef} className="relative animate-fade-in opacity-0">
                <div className="flex flex-wrap gap-4 relative">
                    {players.map((player) => {
                        return (
                            <div
                                key={player.id}
                                ref={(el) => (imgRefs.current[player.id] = el)}
                                onClick={() => handleClick(player, player.src)}
                                className={`w-full md:w-[32%] flex flex-col relative`}
                            >
                                {player.level === 4 && <div className="flex flex-row w-full text-center text-white text-shadow-black text-shadow-lg relative z-40 text-4xl font-banger mt-5 ml-4 mb-[-50px]">Coach</div>}
                                <img
                                    src={player.src}
                                    alt={player.title}
                                    className={`w-full rounded-4xl drop-shadow-indigo-600 drop-shadow-xl object-cover  transition-all duration-500 h-[220px]`}
                                    style={{ display: "block", width: "100%", height: "100%" }}
                                />
                                <span className="text-4xl font-banger text-white absolute text-shadow-lg text-shadow-purple-700 bottom-[60px] left-[140px]">{player.number != "" ? `#${player.number}` : ""}</span>
                                <span className="text-4xl font-mono font-bold mt-5 mb-5 text-center h-[20px]">{player.derbyname}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-wrap gap-4 relative mt-20">
                    <h2 className="w-full text-7xl text-center font-banger font-bold text-black mb-5">Coaches</h2>
                    {coaches.map((coach) => {
                        return (
                            <div
                                key={coach.id}
                                ref={(el) => (imgRefs.current[coach.id] = el)}
                                onClick={() => (isActive ? reset() : handleClick(coach))}
                                className={`w-full md:w-[32%] flex flex-col relative`}
                            >
                                <img
                                    src={coach.src}
                                    alt={coach.title}
                                    className={`w-full rounded-4xl drop-shadow-indigo-600 drop-shadow-xl object-cover  transition-all duration-500 h-[220px]`}
                                    style={{ display: "block", width: "100%", height: "100%" }}
                                />

                                <span className="text-4xl font-mono font-bold mt-5 mb-5 text-center h-[20px]">{coach.derbyname}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-wrap gap-4 relative mt-20 hidden">
                    <h2 className="w-full text-4xl text-center font-banger font-bold text-black mb-5">Referees</h2>
                    {refs.map((ref) => {
                        return (
                            <div
                                key={ref.id}
                                ref={(el) => (imgRefs.current[ref.id] = el)}
                                onClick={() => (isActive ? reset() : handleClick(ref))}
                                className={`w-full md:w-[32%] flex flex-col relative`}
                            >
                                <img
                                    src={ref.src}
                                    alt={ref.title}
                                    className={`w-full rounded-4xl drop-shadow-indigo-600 drop-shadow-xl object-cover  transition-all duration-500 h-[220px]`}
                                    style={{ display: "block", width: "100%", height: "100%" }}
                                />

                                <span className="text-4xl font-mono font-bold mt-5 mb-5 text-center h-[20px]">{ref.derbyname}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
