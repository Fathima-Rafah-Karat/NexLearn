import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const AddDetails = () => {
    return (
        <div className="bg-black min-h-screen w-full flex items-center justify-center p-4 lg:p-10 overflow-y-auto">
            <div className="bg-blue-900  rounded-[16px]">
                <div className="flex md:flex-row flex-col   ">
                    <div className="gap-[92px] flex flex-col ">
                        <div className=" flex flex-row gap-[11px]">
                            <Image src="/icon/logoicon.png" alt="logo" width={88} height={83} className="mt-[38px] ml-[98px]  " />
                            <div className="flex flex-col justify-end">
                                <h1 className="text-white pr-[98px] font-poppins text-size-35 leading-none tracking-normal font-semibold ">NexLearn</h1>
                                <p className=" text-white text-size-13 font-poppins font-medium">futuristic learning</p>
                            </div>
                        </div>
                        <Image src="/image/photo1.png" alt="photo" width={335} height={260} priority className="mx-[63px] mb-[26px] w-auto h-auto" />

                    </div>
                    <div className="relative bg-white h-[540px]  m-[10px] rounded-[16px] flex flex-col xl:w-[339px] w-[320px] overflow-hidden">
                        <div className="flex flex-col flex-shrink-0 px-[28px] pt-[28px]">
                            <h1 className=" text-color-text text-size-24 font-semibold font-inter leading-[32px] tracking-[0px] pb-[16px]">Add Your Details</h1>
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative w-[132px] h-[127px] border-2 border-dashed border-[#D1D5DB] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="relative">
                                        <Image src="/icon/file.png" alt="file" width={20} height={20} />
                                    </div>
                                    <p className="text-color-placeholder font-inter font-medium text-[9px] leading-[12px] tracking-[0px] text-center pt-[8px] ">Add Your Profile picture</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto px-[28px] scrollbar-hide h-[220px]">
                            <form className="w-full space-y-6 pb-24">
                                <div className="relative">
                                    <label className=" absolute -top-2 left-[14px] bg-white text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">
                                        Name*
                                    </label>
                                    <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                        <Input type="text" placeholder="Enter your Full Name" className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] px-[24px] py-[16px] rounded-[8px] " />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className=" absolute -top-2 left-[14px] bg-white text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">
                                        Email
                                    </label>
                                    <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                        <Input type="email" placeholder="Enter your Email Address" className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] px-[24px] py-[16px] rounded-[8px] " />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className=" absolute -top-2 left-[14px] bg-white text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">
                                        Your qualification*
                                    </label>
                                    <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                        <Input type="text" placeholder="Enter your qualification" className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] px-[24px] py-[16px] rounded-[8px] " />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className=" absolute -top-2 left-[14px] bg-white text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">
                                        your phone number*
                                    </label>
                                    <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                        <Input type="number" placeholder="Enter your phone number" className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] px-[24px] py-[16px] rounded-[8px] " />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white px-[28px] pt-4 pb-[28px] z-50">
                            <Link href="/otp-verification">
                                <button className="font-inter text-size-16 font-semibold leading-[16px] tracking-[0px] text-[#FFFFFF] bg-color-text w-full py-[15px] rounded-[10px] flex items-center justify-center hover:opacity-90 transition-opacity">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddDetails;