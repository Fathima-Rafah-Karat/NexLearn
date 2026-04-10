"use client";
import React ,{useState}from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NUMBER } from "./constants/api";
const Number = () => {
     const router = useRouter();
        const [phoneNumber, setPhoneNumber] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState("");
    
        const handleSendOtp = async () => {
            if (!phoneNumber) {
                setError("Please enter a phone number");
                return;
            }
            setIsLoading(true);
            setError("");
            try {
                const formData = new FormData();
                formData.append("mobile", `+91${phoneNumber}`);
    
                const response = await fetch(NUMBER, {
                    method: "POST",
                    body: formData,
                });
                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        if (response.status === 400) {
                            setError(errorData.message || "Invalid mobile number format.");
                        } else if (response.status === 401) {
                            setError("Unauthorized access. Please try again.");
                        } else if (response.status === 500) {
                            setError("Server error. Please try again later.");
                        } else {
                            setError(errorData.message || "Something went wrong.");
                        }
                    } else {
                        setError(`Error: ${response.status} ${response.statusText}`);
                    }
                    return;
                }
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem("userMobile", `+91${phoneNumber}`);
                    router.push("/otp-verification");
                } else {
                    setError(data.message || "Failed to send OTP");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
                console.error("OTP send error:", err);
            } finally {
                setIsLoading(false);
            }
        };
    return (
        <div>
 <div className="bg-white m-[10px] px-[28px] pt-[28px] pb-[28px]  rounded-xl  ">
                        <div className="xl:w-[339px] w-[320px] ">
                            <h1 className=" text-color-text text-size-24 font-semibold font-inter leading-[32px] tracking-[0px] pb-[16px]">Enter your phone number</h1>
                            <p className="text-color-text text-size-16 pb-[16px] font-inter font-normal">We use your mobile number to identify your account</p>
                            <form className="mt-2">
                                <div className="relative">
                                    <label className="absolute -top-2 left-[14px] bg-white  text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">
                                        Phone number
                                    </label>
                                    <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                        <div className="flex items-center gap-2">
                                            <span className="text-size-16 font-normal leading-[24px]  text-[#5C5C5C] font-inter">+91</span>
                                        </div>

                                        <Input 
                                            type="tel" 
                                            placeholder="1234 567891" 
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] focus-visible:ring-0 focus-visible:ring-offset-0" 
                                        />
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-[12px] mt-2 font-inter">{error}</p>}
                                <p className="pt-[16px] text-color-text text-[11px] text-[#5C5C5C] leading-[16px]">By tapping Get started, you agree to the <span className="font-inter font-normal leading-[16px] tracking-[0px] text-[#1C3141] text-[11px] ">Terms & Conditions</span></p>
                                <Button 
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={isLoading}
                                    className="mt-48 font-inter text-size-16 font-semibold leading-[16px] tracking-[0px] text-[#FFFFFF] bg-color-text w-full py-[15px] rounded-[10px] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {isLoading ? "Sending..." : "Started"}
                                </Button>
                            </form>
                        </div>
                        </div>
        </div>
    )
}
export default Number;