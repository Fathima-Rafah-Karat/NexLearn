import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const AddDetails = () => {
    return (
        <div className="bg-black min-h-screen w-full flex items-center justify-center p-4 lg:p-10 overflow-y-auto">
            <div className="bg-blue-900 rounded-[16px]">
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
                    <div className="bg-white m-[10px] px-[28px] pt-[28px] pb-[28px] rounded-xl  ">
                        <div className="xl:w-[339px] w-[320px] ">
                            <h1 className=" text-color-text text-size-24 font-semibold font-inter leading-[32px] tracking-[0px] pb-[16px]">Add Your Details</h1>
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative w-[120px] h-[120px] border-2 border-dashed border-[#D1D5DB] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="relative">
                                        <Image src="/icon/file.png" alt="file" width={20} height={20}/>
                                    </div>
                                    <p className="text-color-placeholder text-[9px] font-inter mt-2 text-center px-2">Add Your Profile picture</p>
                                </div>
                            </div>
                            <Link href="/otp-verification">
                                <button className="mt-48 font-inter text-size-16 font-semibold leading-[16px] tracking-[0px] text-[#FFFFFF] bg-color-text w-full py-[15px] rounded-[10px] flex items-center justify-center hover:opacity-90 transition-opacity">
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