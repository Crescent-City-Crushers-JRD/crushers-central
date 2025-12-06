import SlidingGallery from "@/app/components/gallery";


export default function TeamPage(props) {
    return (
        <div className="flex flex-col h-screen bg-white mt-10">
        <h1 className="text-black font-mono drop-shadow-sm drop-shadow-indigo-600 text-6xl w-full text-center animate-slide-down">Crescent City Crushers 2025-2026</h1>
        <SlidingGallery />
        </div>
    )
}