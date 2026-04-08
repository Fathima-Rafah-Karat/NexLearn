import React from "react";
import Image from "next/image";

const Instructions = () => {
    return (
        <div className="min-h-screen bg-blue-50">
            <h1 className="text-color-text text-center pt-[20px] font-inter font-medium text-size-26 leading-[37.44px]">Ancient Indian History MCQ </h1>
            <div className="mt-8 mx-auto max-w-[682px]  bg-[#1C3141] rounded-[15px] py-[22.42px] px-[10.55px] flex gap-[57px] justify-around items-center text-white shadow-lg">
                <div className="flex flex-col items-center pl-[57px]">
                    <p className="text-bg-white text-size-15 font-inter font-semibold leading-[ 21.6px]  mb-[24px]">Total MCQ's:</p>
                    <p className="text-bg-white text-size-42 font-inter font-medium leading-none">100</p>
                </div>
                <div className="my-4 self-center h-[80px] border-l border-bg-white" />
                <div className="flex flex-col items-center">
                    <p className="text-size-15 font-inter text-bg-white font-semibold leading-[ 21.6px] mb-[24px]">Total marks:</p>
                    <p className=" text-bg-white text-size-42 font-inter font-medium leading-none">100</p>
                </div>
                <div className="my-4 self-center h-[80px] border-l border-bg-white" />
                <div className="flex flex-col items-center pr-[57px]">
                    <p className="text-size-15 font-inter text-bg-white font-semibold leading-[ 21.6px] mb-[24px]">Total time:</p>
                    <p className="text-bg-white text-size-42 font-inter font-medium leading-none">90:00</p>
                </div>
            </div>
        </div>
    );
};

export default Instructions