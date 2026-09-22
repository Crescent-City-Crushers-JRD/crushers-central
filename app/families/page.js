export default function ParentsPage() {
    return (
        <div className={"w-full mt-2 flex flex-col items-center min-h-screen"}>
            <div className={"flex flex-col justify-start mt-2 font-mono text-md w-[80%] mt-10"}>
                <h1 className={"text-center w-full font-extrabold text-4xl mb-5"}>Skater Families</h1>
                <p className="text-md">
                    Families are the foundation of each of our skaters and the Crushers depend on the support and
                    help of skater families to keep our League going and growing.
                </p>
                <p>Please checkout important information below:</p>

                <h3 className={"text-3xl font-bold mt-10 text-center"}>Crushers Jerseys and Gear Store</h3>
                <p className={"border-b-2 pb-2 "}>
                    <p>
                        <a className={"text-blue-600 hover:underline hover:text-purple-500"} href={"https://cvmsports.com/collections/crescent-city"} target="_blank" rel="noopener noreferrer">
                            CVM Sports Crescent City Gear</a>
                    </p>
                    <p className={"font-bold italic text-sm mt-3"}>NOTE: The CVM Sports store will only be open till October 10th, 2026. We are not going to get
                        sponsorship completed before this shop closes. It does take time to make and delivery jerseys and gear. If you would like to order
                        now and we will work out a patch of sponsors and then refund families, please do so.</p>
                </p>
                <h3 className={"text-3xl font-bold mt-10 text-center"}>Surveys</h3>
                <ul className={"flex flex-col justify-start mt-2 font-mono list-disc list-outside text-lg"}>
                    <li className={"mt-2 pb-2 font-mono border-b-2"}>
                        <p>
                            Survey about skills, volunteering options, willingness to travel, and skater demographics: <a className={"text-blue-600 hover:underline hover:text-purple-500"} href={"https://forms.gle/cc97N2A8TTwZtcJz5"} target={"_blank"} rel={"noopener noreferrer"}>
                            Parent Participation & Volunteering Survey
                        </a>
                        </p>

                    </li>
                    <li className={"justify-start mt-2 pb-2 font-mono border-b-2"}>

                        <p className={"mt-3"}>
                            We are working with the Tulane School of Medicine to get all the jersey’s purchased for the team.
                            Look through the jersey store to select the style and size that your skater wants. The store is open till Oct. 10th.
                            If you do order a jersey for your skater and we get sponsorship afterwards, we will work on a sponsor decal or patch for
                            uniforms and will refund purchases if we can.
                        </p>

                        <p className={"mt-2"}> Then complete this survey: <a className={"text-blue-600 hover:underline hover:text-purple-500"} href={"https://forms.gle/4L493s7RB3kEHcdi8"} target="_blank" rel="noopener noreferrer">
                            Jersey Size Survey
                        </a></p>
                    </li>
                </ul>
                <h3 className={"text-3xl font-bold mt-10 text-center"}>Family Info</h3>
                <p className={"justify-start mt-10 pb-2 font-mono border-b-2 text-xl"}>
                    <a className={"text-blue-600 hover:underline hover:text-purple-500"} href={"https://docs.google.com/presentation/d/1ocp-8wRwwbyxGkJFEQ_DoAZWa8bWltviDwbo2vf14ig/edit?usp=sharing"} target="_blank" rel="noopener noreferrer">Fall, 2026 All-League Slideshow</a>
                </p>

            </div>
        </div>
    )
}