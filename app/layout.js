import { Geist, Geist_Mono, Bangers } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/app/components/ClientLayout";
import Navbar from "@/app/components/navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bangers = Bangers({
    variable: "--font-bangers-bold",
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
  title: "Crescent City Crusher",
  description: "New Orleans Junior Roller Derby Team",
};

export default function RootLayout({ children }) {

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${bangers.variable} antialiased bg-white`}
        >
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
  );
}
