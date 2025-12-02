"use client";

import { useEffect, useRef, useState } from "react";

export default function CrusherContainer({ children, routeKey }) {
    const [content, setContent] = useState(children);
    const [state, setState] = useState("idle"); // idle | exiting | entering
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (children === content) return;

        setState("exiting");

        timeoutRef.current = setTimeout(() => {
            setContent(children);
            setState("entering");

            timeoutRef.current = setTimeout(() => {
                setState("idle");
            }, 300);
        }, 300);

        return () => clearTimeout(timeoutRef.current);
    }, [children]);

    return (
        <div
            className={`
        transition-all duration-300 ease-in-out
        ${state === "exiting" ? "opacity-0 -translate-y-3" : ""}
        ${state === "entering" ? "opacity-0 translate-y-3" : ""}
        ${state === "idle" ? "opacity-100 translate-y-0" : ""}
      `}
        >
            {content}
        </div>
    );
}
