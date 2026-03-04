"use client";

import { useState } from "react";

export default function MonthCalendar({ onDateSelect }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayIndex = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
    const totalDays = lastDayOfMonth.getDate();

    const daysInGrid = [];

    // Empty cells before month starts
    for (let i = 0; i < startDayIndex; i++) {
        daysInGrid.push(null);
    }

    // Actual days
    for (let day = 1; day <= totalDays; day++) {
        daysInGrid.push(new Date(year, month, day));
    }

    const formatDateKey = (date) => {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };

    const handleClick = (date) => {
        const key = formatDateKey(date);
        setSelectedDate(key);
        onDateSelect(date);
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const monthLabel = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    const today = formatDateKey(new Date());

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={goToPreviousMonth}
                    className="px-3 py-1 bg-gray-200 rounded not-selectable"
                >
                    ←
                </button>

                <h2 className="text-xl font-semibold">{monthLabel}</h2>

                <button
                    onClick={goToNextMonth}
                    className="px-3 py-1 bg-gray-200 rounded not-selectable"
                >
                    →
                </button>
            </div>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 text-center font-medium mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
                {daysInGrid.map((date, index) => {
                    if (!date) {
                        return <div key={index} />;
                    }

                    const key = formatDateKey(date);
                    const isSelected = (key === selectedDate);
                    return (
                        <button
                            key={key}
                            onClick={() => handleClick(date)}
                            className={`h-12 rounded border text-sm 
                ${key === today ? "bg-blue-500 text-white" : "bg-white"} 
                ${isSelected ? "border-3" : "border"}
                hover:bg-blue-100`}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}