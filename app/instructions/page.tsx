import Image from "next/image";

const Instructions = () => {
    const stats = [
        { label: "Total MCQ's:", value: "100" },
        { label: "Total marks:", value: "100" },
        { label: "Total time:", value: "90:00" },
    ];

    return (
        <div className="min-h-screen bg-blue-50">
            <h1 className="text-color-text text-center pt-[20px] font-inter font-medium text-size-26 leading-[37.44px]">Ancient Indian History MCQ </h1>
            <div className="mt-8 mx-auto max-w-[682px] bg-[#1C3141] rounded-[15px] py-[22.42px] flex justify-center items-center text-white shadow-lg divide-x divide-white/30">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center px-[40px] first:pl-[57px] last:pr-[57px]">
                        <p className="text-bg-white text-size-15 font-inter font-semibold leading-[21.6px] mb-[24px] whitespace-nowrap">{stat.label}</p>
                        <p className="text-bg-white text-size-42 font-inter font-medium leading-none">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};




export default Instructions