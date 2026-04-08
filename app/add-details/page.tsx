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
                            <p className="text-color-text text-size-16 pb-[16px] font-inter font-normal">We’ve sent an SMS to +91 1234 567891</p>
                            <form className="mt-2">
                                <div className="relative">
                                    <label className=" absolute -top-2 left-[14px] bg-white  text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">
                                        SMS Code
                                    </label>
                                    <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                      

                                        <Input type="number" placeholder="123 456" className="flex-1 bg-transparent border-none  outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px]" />
                                    </div>
                                </div>
                            </form>
                            <p className="pt-[16px] text-color-text text-[11px] text-[#5C5C5C] leading-[16px]">Your 6 digit code is on its way. This can sometimes take a few moments to arrive.</p>
                            <p className="font-inter text-[14px] font-semibold leading-[24px] tracking-[0px] pt-[16px]  underline underline-offset-0 decoration-solid decoration-[1px] ">Resend code</p>
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