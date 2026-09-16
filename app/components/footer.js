"use client"

export default function Footer() {
    const date = new Date();
    return (
        <footer className="footer min-h-40 bg-black text-white flex flex-col justify-center items-center">
            <p className="text-md">Copyright {date.getFullYear()}, Crescent City Crushers</p>
            <p className="text-sm md:text-md">EIN: 83-0752126 | New Orleans, Louisiana, United States</p>
        </footer>
    )
}