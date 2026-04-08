import react from "react";
import Image from "next/image";
const Navbar = () => {
    return (
        <div className="bg-bg-white ">
            <div className="my-[15px] flex flex-row gap-[8px] justify-center">
                <Image src="/icon/bluelogo.png" alt="logo" width={64} height={59} />
                <div className="flex flex-col justify-center ">
                <h1 className="font-poppins leading-[25.1px] tracking-[0px] font-semibold text-size-25 font-bold bg-gradient-to-r from-[#0A93BA] to-[#0B3A4B] bg-clip-text text-transparent inline-block">NexLearn</h1>
                <p className="text-size-9 font-poppins font-medium leading-[9.45px] tracking-[0px] ">futuristic learning</p>
                </div>
            </div>
            <div className="flex flex-end">
                <button className="">Logout</button>
            </div>
        </div>
    )
}
export default Navbar;