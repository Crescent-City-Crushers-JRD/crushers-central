"use client"
export default function JoinUsPage() {
    return (
        <div className={"w-full mt-2 flex flex-col items-center min-h-screen"}>
            <div className="w-[95%] p-2">
                <h1 className={"text-4xl font-bold leading-tight font-mono text-center mb-2 mt-8"}>
                    Want to join?
                </h1>
                <div className={"flex flex-col justify-start mt-2 font-mono text-md"}>
                    <p className={"mb-2"}>The Crescent City Crushers are open to all and any kid of any skill level, between the ages of 7 and 17,
                        whether you'd like to skate for fun or participate in competitive, full-impact, Roller Derby matches.</p>
                    <p className={"mb-2 text-2xl font-bold"}>Welcome to the 2026-2027 season of Crescent City Crushers Junior Roller Derby, we can't wait to meet you!</p>

                    <p className={"mb-2"}>Join us for boot camp the last two Fridays of August, 8/21 and 8/28, from 6-9pm, and the last two Sundays in August, 8/23 and 8/30, from 9am-12pm, at our practice warehouse at 3632 Desire Parkway.</p>

                    <p className={"mb-2 font-bold"}>FAQs:</p>
                    <p className={"mb-2"}>Experience level needed?</p>
                    <p className={"mb-2"}>None! Fluency in quad skating is great, to have but it's not required: we start everyone out with skating and safety basics and progress to more advanced skills and levels of skater-to-skater physical contact based on individual skater progress.</p>

                    <p className={"mb-2"}>Do we need to bring gear?</p>
                    <p className={"mb-2"}>If you've got it, bring it; if not, we've got loaner pads, helmets, and skates available. Please show up wearing socks, sneakers, and comfortable clothes you're able to move around in.  Also, show up hydrated and BRING WATER!</p>

                    <p className={"mb-2"}>Where and when do y'all practice?</p>
                    <p className={"mb-2"}>3632 Desire Pkwy in New Orleans just off of the Louisa St. exit.  Practice is Sunday morning from 9-11am and officially starts on 9/6 after the culmination of boot camp.</p>

                    <p className={"mb-2 mt-10"}>Registration cost: $100 non-refundable covers all four days of boot camp and your first month of dues.</p>

                    <p className={"mb-2"}>Crushers follow the JRDA Level System for training and assessing Skaters for different levels of: </p>
                    <ul className={"ml-20 w-[90%] flex flex-col mt-2 font-mono text-md"}>
                        <li>Level 0: For new skaters learning to skate, the Crushers run a series of workshops after intake to get our
                        freshies ready to play.</li>
                        <li className={"mt-2"}>Level 1 (No Contact/Positional): Focuses on basic skating, safety, and positional blocking only (no intentional contact). </li>
                        <li className={"mt-2"}>Level 2 (Light Contact/Positional): Introduces lean blocking, but no accelerating into blocks.</li>
                        <li className={"mt-2"}>Level 3 (Full Contact): Involves full-contact, competitive gameplay similar to adult roller derby.</li>
                    </ul>
                </div>

                <div className={"flex flex-col md:flex-row w-full justify-evenly mt-2 font-mono text-md"}>
                    {/*<p>The Crushers use an account system for Skaters and Families to track their progress, update contact information, and*/}
                    {/*to provide opportunities for events, volunteering, and everything else Derby related. New Families can register an*/}
                    {/*account by givig us some details about you and your skater, and keep track of us onboarding them. Account setup is easy and*/}
                    {/*just requires a Parent name and email.</p>*/}
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSe0eNPLM6ehZQ-XhK0xLINfhbzzhplA2wlPsqZCKd3VTuC-iw/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                    <button
                        className={"flex border border-black rounded-xl w-full mx-auto p-2 mt-5 h-10 bg-gray-300 hover:bg-blue-100 hover:drop-shadow-2xl cursor-pointer text-indigo-600 font-extrabold text-mono"}
                    >
                        Register New Skaters Here</button>
                    </a>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeMIj0oqsXuSKTE3zUzfLm3b6Hv0dq4z0tsHKzXrkYYlASIFw/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                        <button
                            className={"flex border border-black rounded-xl  w-full p-2 mx-auto mt-5 h-10 bg-gray-300 hover:bg-blue-100 hover:drop-shadow-2xl cursor-pointer text-indigo-600 font-extrabold text-mono"}
                        >
                            Returning Skaters Register Here</button>
                    </a>
                </div>
                <div className={"flex flex-col justify-start mt-5 font-mono text-md"}>
                    <p className={"font-bold"}>Please also complete the following: </p>
                    <ul className={"ml-20 w-[90%] flex flex-col mt-2 font-mono text-md"}>
                        <li className={"flex flex-row justify-between"}>
                            <a className={"text-blue-600 font-bold"} href={"https://forms.gle/rEraEh52dmXN5BzF7"} target={"_blank"} rel="noopener noreferrer">Parent/Guardian & Medical Information</a>
                        </li>

                        <li className={"flex flex-row justify-between"}>
                            <a className={"text-blue-600 font-bold"} href={"https://forms.gle/8BGNTtGW58T2EysQ8"} target={"_blank"} rel="noopener noreferrer">Release Forms</a>
                        </li>
                        <li className={"flex flex-row justify-between"}>
                            <a className={"text-blue-600 font-bold"} href={"https://forms.gle/H1fXEKPynXaWu3vu5"} target={"_blank"} rel="noopener noreferrer">Skater/Volunteer Code of Conduct:</a>
                        </li>
                        <li className={"flex flex-row justify-between"}>
                            <a className={"text-blue-600 font-bold"} href={"https://forms.gle/VGRuYh9oQmusszee7"} target={"_blank"} rel="noopener noreferrer">Parent Code of Conduct</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>)
}