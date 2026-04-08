import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Instructions = () => {
    const stats = [
        { label: "Total MCQ's:", value: "100" },
        { label: "Total marks:", value: "100" },
        { label: "Total time:", value: "90:00" },
    ];

    return (
        <div className="min-h-screen bg-blue-50 px-4 md:px-0">
            <h1 className="text-color-text text-center pt-[20px] font-inter font-medium text-[22px] md:text-size-26 leading-tight md:leading-[37.44px]">Ancient Indian History MCQ </h1>
            <div className="mt-8 mx-auto max-w-[682px] bg-[#1C3141] rounded-[15px] py-6 md:py-[22.42px] flex flex-col md:flex-row justify-center items-center text-white shadow-lg divide-y md:divide-y-0 md:divide-x divide-white/30">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center px-6 py-4 md:py-0 md:px-[40px] md:first:pl-[57px] md:last:pr-[57px] w-full md:w-auto">
                        <p className="text-white/80 text-[14px] md:text-size-15 font-inter font-semibold leading-relaxed md:leading-[21.6px] mb-2 md:mb-[24px] whitespace-nowrap">{stat.label}</p>
                        <p className="text-white text-[32px] md:text-size-42 font-inter font-medium leading-none">{stat.value}</p>
                    </div>
                ))}
            </div>
            <div className="mt-10 mx-auto max-w-[682px] text-[#5C5C5C] font-inter px-2 md:px-0">
                <h3 className="text-[16px] font-semibold leading-[1.54] mb-5 ">Instructions:</h3>
                <ol className="list-decimal list-outside ml-7 text-[16px] font-normal leading-[1.72] tracking-[0px]">
                    <li className="align-middle">You have 100 minutes to complete the test.</li>
                    <li className="align-middle">Test consists of 100 multiple-choice q’s.</li>
                    <li className="align-middle">You are allowed 2 retest attempts if you do not pass on the first try.</li>
                    <li className="align-middle">Each incorrect answer will incur a negative mark of -1/4.</li>
                    <li className="align-middle">Ensure you are in a quiet environment and have a stable internet connection.</li>
                    <li className="align-middle">Keep an eye on the timer, and try to answer all questions within the given time.</li>
                    <li className="align-middle">Do not use any external resources such as dictionaries, websites, or assistance.</li>
                    <li className="align-middle">Complete the test honestly to accurately assess your proficiency level.</li>
                    <li className="align-middle">Check answers before submitting.</li>
                    <li className="align-middle leading-[1.54]">Your test results will be displayed immediately after submission, indicating whether you have passed or need to retake the test.</li>
                </ol>
            </div>
            <Link href="/mcq">
            <Button className="text-bg-white bg-color-text font-inter rounded-[10px] flex mx-auto mt-[22px] py-[24px] px-[124px] text-[16px] font-semibold leading-[16.88px]">
                Start Test
            </Button>
            </Link>

        </div>
    );
};




export default Instructions