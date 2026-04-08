"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const noNavbarRoutes = ["/", "/otp-verification", "/add-details"];

    if (noNavbarRoutes.includes(pathname)) {
        return null;
    }

    return (
        <nav className="bg-white flex items-center justify-between px-[20px] md:px-[80px] py-[15px] relative border-b-[1.43px] border-[#E9EBEC]">
            <div className="hidden md:block w-[100px]"></div>
            <div className="flex items-center gap-[8px]">
                <Image src="/icon/bluelogo.png" alt="logo" width={64} height={59} />
                <div className="flex flex-col justify-center">
                    <h1 className="font-poppins leading-none tracking-[0px] font-semibold text-size-25  bg-gradient-to-r from-[#0A93BA] to-[#0B3A4B] bg-clip-text text-transparent inline-block">
                        NexLearn
                    </h1>
                    <p className="text-size-9 font-poppins font-medium leading-[9.45px] tracking-[0px] pt-[4px] bg-gradient-to-b  from-[#0B3A4B] to-[#0A93BA] bg-clip-text text-transparent inline-block">
                        futuristic learning
                    </p>
                </div>
            </div>
            <div className="flex items-center ">
                <button className=" px-[16px] py-[7px] rounded-[6px] text-white font-inter text-[13px]  bg-[#177A9C] font-medium font-semibold text-color-text  transition-all cursor-pointer">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;