"use client"
import {useState} from "react";

export default function SupportPage() {
    const [supportTab, setSupportTab] = useState("coreTab");

    const membershipTab = <div className={`w-full transition-all duration-300 h-screen  flex flex-col justify-center ${supportTab === "membershipTab" ? "opacity-100 max-h-[600px]" : "opacity-0 max-h-0 overflow-hidden"}`} id="membershipTab">
        <iframe title='Donation form powered by Zeffy'
                className={"w-[80%] h-screen"}
                src='https://www.zeffy.com/embed/ticketing/crescent-city-crushers-members'
                allowpaymentrequest="true" allowtransparency="true">
        </iframe>
    </div>;

    const sponsorTab = <div className={`w-4/5 transition-all duration-300 h-screen mx-auto flex flex-col justify-center ${supportTab === "sponsorTab" ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"}`} id="sponsorTab">

    </div>

    const donateTab = <div className={`w-4/5 transition-all duration-300 h-screen mx-auto flex flex-col justify-center ${supportTab === "donateTab" ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"}`} id="donateTab">
        <iframe
            title='Donation form powered by Zeffy'
            className={"w-[80%] h-screen"}
            src='https://www.zeffy.com/embed/donation-form/crush-our-capital-campaign'
            allowpaymentrequest="true" allowtransparency="true">

        </iframe>
    </div>

    const coreTab = <div className={`w-4/5 transition-all duration-300 mt-8 mx-auto flex flex-col justify-center font-mono`} id="coreTab">
        <p className={"mb-2"}>Junior derby takes heart. It also takes helmets, track tape, and a whole lot of gas money to get our
            skaters where they need to go. If you've ever watched a Crushers bout and felt that electricity in the
            room, you already know what this league means to New Orleans and our kids. Now's your chance to be part of it
            year-round.</p>
        <p className={"mb-2"}>A big part of our dream is to find a home for Roller Derby in New Orleans and create
            the first permanent roller derby facility for skaters, coaches, family, and fans. We can make this dream
            a reality with your support.</p>
        <ul className={"mb-2 list-disc w-4/5 ml-20"}>
            <li className={"mb-1"}>Our <span className={"text-lg font-extrabold"}>Monthly Membership</span> tiers are built for fans, families, and believers who want to do
                more than cheer from the sidelines — help us and keep the Crushers crushing.</li>
            <li className={"mb-1"}>Our <span className={"text-lg font-extrabold"}>Sponsorship Program</span> is for organizations and funders looking to make a lasting change in the
                the lives of kids and the City of New Orleans.</li>
        </ul>
        <p className={"mb-3"}>Crescent City Crushers is a registered, active 501(c)(3), and all donations are 100% tax deductible.</p>
    </div>

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white">
            {coreTab}
            <h4 className={"text-xl font-bold leading-tight text-center font-mono"}>Find Out More:</h4>
            <ul className="flex flex-rwo justify-center items-center mt-0 w-full mx-auto">
                <li className={`border-gray-600 border w-1/4 rounded-lg ml-1 font-mono text-center text-lg cursor-pointer ${supportTab === "donateTab" ? "bg-gray-300" : "bg-white"}`}
                    onClick={() => setSupportTab("donateTab")}
                >
                     💵<span className={"pl-3 pr-3 md:text-lg text-sm" }>Donations</span>💵
                </li>
                <li className={`border-gray-600 border w-1/4 rounded-lg ml-1 font-mono text-center text-lg cursor-pointer ${supportTab === "membershipTab" ? "bg-gray-300" : "bg-white"}`}
                    onClick={() => setSupportTab("membershipTab")}
                >
                    🛼<span className={"pl-3 pr-3 md:text-lg text-sm"}>Memberships</span>🛼
                </li>
                <li className={`border-gray-600 border w-1/4 rounded-lg ml-1 font-mono text-center text-lg cursor-pointer ${supportTab === "sponsorTab" ? "bg-gray-300" : "bg-white"}`}
                    onClick={() => setSupportTab("sponsorTab")}
                >
                    🌟<span className={"pl-3 pr-3 md:text-lg text-sm"}>Sponsorships</span> 🌟
                </li>
            </ul>
            <div className={"w-[90%] flex flex-col justify-center items-center mt-0 ml-[15%]"}>
                {membershipTab}
                {donateTab}
                {sponsorTab}
            </div>
        </div>)
}