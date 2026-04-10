
import React from "react";
import Image from "next/image";
import Form from "@/components/form"
const AddDetails = () => {

    return (
        <div className="bg-black min-h-screen w-full flex items-center justify-center p-4 lg:p-10 overflow-y-auto">
            <div className="bg-blue-900 rounded-[16px] w-full max-w-[760px]">
                <div className="flex md:flex-row flex-col">
                    <div className="gap-[92px] flex flex-col">
                        <div className="flex flex-row gap-[11px]">
                            <Image src="/icon/logoicon.png" alt="logo" width={88} height={83} className="mt-[38px] ml-[98px]" />
                            <div className="flex flex-col justify-end">
                                <h1 className="text-white pr-[98px] font-poppins text-size-35 leading-none tracking-normal font-semibold">NexLearn</h1>
                                <p className="text-white text-size-13 font-poppins font-medium">futuristic learning</p>
                            </div>
                        </div>
                        <Image src="/image/photo1.png" alt="photo" width={335} height={260} priority className="mx-[63px] mb-[26px] w-auto h-auto" />
                    </div>
                    <Form />
                </div>
            </div>
        </div>
    );
};

export default AddDetails;