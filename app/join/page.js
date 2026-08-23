"use client"
export default function JoinUsPage() {
    return (
        <div className={"w-full mt-2 flex flex-col justify-center items-center h-screen"}>
            <div className="w-[95%] p-2">
                <h1 className={"text-4xl font-bold leading-tight font-mono text-center mb-20"}>
                    Want to join?
                </h1>
                <div className={"flex flex-col justify-start mt-2 font-mono text-md"}>
                    <p className={"mb-2"}>The Crescent City Crushers are open to all and any kid of any skill level, between the ages of 7 and 17,
                        whether you'd like to skate for fun or participate in competitive, full-impact, Roller Derby matches.</p>
                    <p className={"mb-2"}>Crushers follow the JRDA Level System for training and assessing Skaters for different levels of: </p>
                    <ul className={"ml-20 w-[90%] flex flex-col mt-2 font-mono text-md"}>
                        <li>Level 0: For new skaters learning to skate, the Crushers run a series of workshops after intake to get our
                        freshies ready to play.</li>
                        <li className={"mt-2"}>Level 1 (No Contact/Positional): Focuses on basic skating, safety, and positional blocking only (no intentional contact). </li>
                        <li className={"mt-2"}>Level 2 (Light Contact/Positional): Introduces lean blocking, but no accelerating into blocks.</li>
                        <li className={"mt-2"}>Level 3 (Full Contact): Involves full-contact, competitive gameplay similar to adult roller derby.</li>
                    </ul>
                    <p className={"mt-2"}>We have a yearly intake for new skaters entering level 0 in September, and the incoming class typically
                    gets to Level 1 by January. Kids with skating experience are accepted on a rolling basis given that they pass a coach's evaluation.</p>
                    <p className={"mt-2"}>Experienced Skaters with or without Roller Derby experience are welcome to be assessed and join us anytime during the season. </p>
                </div>

                <div className={"flex flex-col justify-start mt-2 font-mono text-md"}>
                    {/*<p>The Crushers use an account system for Skaters and Families to track their progress, update contact information, and*/}
                    {/*to provide opportunities for events, volunteering, and everything else Derby related. New Families can register an*/}
                    {/*account by givig us some details about you and your skater, and keep track of us onboarding them. Account setup is easy and*/}
                    {/*just requires a Parent name and email.</p>*/}
                    <button
                        className={"border border-black rounded-xl w-1/5 mx-auto mt-5 h-10 bg-gray-300 hover:bg-blue-100 hover:drop-shadow-2xl cursor-pointer text-indigo-600 font-extrabold text-mono"}
                        onClick={e => {alert("Register")}}
                    >
                        Register New Skaters Here</button>
                </div>
            </div>
        </div>)
}