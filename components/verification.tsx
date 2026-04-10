"use client";
import React ,{useState, useEffect} from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { VERIFY_OTP } from "./constants/api";

const verification=()=>{
      const router = useRouter();
        const [otp, setOtp] = useState("");
        const [mobile, setMobile] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState("");
        useEffect(() => {
            const storedMobile = localStorage.getItem("userMobile");
            if (storedMobile) {
                setMobile(storedMobile);
            } else {
                router.push("/");
            }
        }, [router]);
        const [resendStatus, setResendStatus] = useState("");
    
        const handleResendOtp = async () => {
            if (!mobile || resendStatus === "loading") return;
    
            setResendStatus("loading");
            setError("");
    
            try {
                const formData = new FormData();
                formData.append("mobile", mobile);
    
                const response = await fetch("https://nexlearn.noviindusdemosites.in/auth/send-otp", {
                    method: "POST",
                    body: formData,
                });
    
                if (!response.ok) throw new Error("Failed to resend");
    
                setResendStatus("success");
                setTimeout(() => setResendStatus(""), 3000);
            } catch (err) {
                setResendStatus("error");
                setError("Failed to resend code. Please try again.");
                console.error("Resend error:", err);
            }
        };
    
        const handleVerifyOtp = async () => {
            if (!otp) {
                setError("Please enter the OTP");
                return;
            }
            setIsLoading(true);
            setError("");
            try {
                const formData = new FormData();
                formData.append("mobile", mobile);
                formData.append("otp", otp);
    
                const response = await fetch(VERIFY_OTP, {
                    method: "POST",
                    body: formData,
                });
                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        if (response.status === 400) {
                            setError(errorData.message || "Invalid OTP or request.");
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
                    const token = data.token || data.access;
                    if (token) localStorage.setItem("authToken", token);
                    router.push("/add-details");
                } else {
                    setError(data.message || "Invalid OTP");
                }
            } catch (err) {
                setError("Something went wrong. Please check your connection.");
                console.error("OTP verify error:", err);
            } finally {
                setIsLoading(false);
            }
        };
    
    return(
        <div>
 <div className="bg-white m-[10px] px-[28px] pt-[28px] pb-[28px] rounded-xl  ">
                        <div className="xl:w-[339px] w-[320px] ">
                            <h1 className=" text-color-text text-size-24 font-semibold font-inter leading-[32px] tracking-[0px] pb-[16px]">Enter the code we texted you</h1>
                            <p className="text-color-text text-size-16 pb-[16px] font-inter font-normal">We’ve sent an SMS to {mobile || "+91 1122334455"}</p>
                            <form className="mt-2">
                                <div className="relative">
                                    <label className=" absolute -top-2 left-[14px] bg-white  text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">
                                        SMS Code
                                    </label>
                                    <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                        <Input
                                            type="number"
                                            placeholder="123 456"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-[12px] mt-2 font-inter">{error}</p>}
                                <p className="pt-[16px] text-color-text text-[11px] text-[#5C5C5C] leading-[16px]">Your 6 digit code is on its way. This can sometimes take a few moments to arrive.</p>
                                <div className="flex items-center justify-between pt-[16px]">
                                    <p
                                        className={`font-inter text-[14px] font-semibold leading-[24px] tracking-[0px] underline underline-offset-2 decoration-solid decoration-[1px] cursor-pointer transition-colors ${resendStatus === 'loading' ? 'text-gray-400' : 'text-black'}`}
                                        onClick={handleResendOtp}
                                    >
                                        {resendStatus === 'loading' ? 'Resending...' : 'Resend code'}
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    onClick={handleVerifyOtp}
                                    disabled={isLoading}
                                    className="mt-48 font-inter text-size-16 font-semibold leading-[16px] tracking-[0px] text-[#FFFFFF] bg-color-text w-full py-[15px] rounded-[10px] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {isLoading ? "Verifying..." : "Get Started"}
                                </Button>
                            </form>
                        </div>
                    </div>
        </div>
    )
}
export default verification;