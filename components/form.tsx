"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, X, Camera, Info } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Form =()=>{
      const router = useRouter();
        const fileInputRef = useRef<any>(null);
     const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [qualification, setQualification] = useState("");
        const [phone, setPhone] = useState("");
        const [image, setImage] = useState<any>(null);
         const [previewUrl, setPreviewUrl] = useState("");
            const [isLoading, setIsLoading] = useState(false);
            const [error, setError] = useState("");

         useEffect(() => {
                const storedMobile = localStorage.getItem("userMobile");
                if (storedMobile) setPhone(storedMobile);
            }, []);
        
            const handleImageChange = (e: any) => {
                const file = e.target.files?.[0];
                if (file) {
                    setImage(file);
                    const url = URL.createObjectURL(file);
                    setPreviewUrl(url);
                }
            };
        
            const removeImage = (e: any) => {
                e.stopPropagation();
                setImage(null);
                setPreviewUrl("");
                if (fileInputRef.current) fileInputRef.current.value = "";
            };
        
            const handleSubmit = async () => {
                if (!name || !qualification || !phone || !image) {
                    setError("Please fill all required fields and add a profile picture");
                    return;
                }
        
                setIsLoading(true);
                setError("");
                  try {
            const token = localStorage.getItem("authToken");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("qualification", qualification);
            formData.append("mobile", phone);
            formData.append("profile_image", image);

            const response = await fetch("https://nexlearn.noviindusdemosites.in/auth/create-profile", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || `Error: ${response.status}`);
                return;
            }

            if (data.success) {
                if (data.access_token) localStorage.setItem("authToken", data.access_token);
                if (data.refresh_token) localStorage.setItem("refreshToken", data.refresh_token);

                router.push("/instructions");
            } else {
                setError(data.message || "Failed to create profile");
            }
        } catch (err) {
            setError("Something went wrong. Please check your connection.");
            console.error("Profile create error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    return(
        
        <div>
           <div className="relative bg-white min-h-[540px] md:h-[540px] m-[10px] rounded-[16px] flex flex-col w-[calc(100%-20px)] md:w-[339px] overflow-hidden">
                                   <div className="flex flex-col flex-shrink-0 px-[28px] pt-[28px]">
                                       <h1 className="text-color-text text-size-24 font-semibold font-inter leading-[32px] tracking-[0px] pb-[16px]">Add Your Details</h1>
                                       <div className="flex flex-col items-center mb-6">
                                           <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                                           <div
                                               onClick={() => fileInputRef.current?.click()}
                                               className="relative group w-[132px] h-[127px] border-2 border-dashed border-[#D1D5DB] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all overflow-hidden"
                                           >
                                               {previewUrl ? (
                                                   <>
                                                       <Image src={previewUrl} alt="preview" layout="fill" objectFit="cover" className="p-1 rounded-xl object-cover" />
                                                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                           <Camera className="text-white w-6 h-6" />
                                                       </div>
                                                       <Button
                                                           onClick={removeImage}
                                                           className="absolute top-2 right-2 rounded-full p-1  w-3 h-3 "
                                                       >
                                                           <X className="  text-white bg-black  rounded-full " />
                                                       </Button>
                                                   </>
                                               ) : (
                                                   <>
                                                       <div className="relative">
                                                           <Image src="/icon/file.png" alt="file" width={20} height={20} />
                                                       </div>
                                                       <p className="text-color-placeholder font-inter font-medium text-[9px] leading-[12px] tracking-[0px] text-center pt-[8px]">Add Your Profile picture</p>
                                                   </>
                                               )}
                                           </div>
                                       </div>
                                   </div>
           
                                   <div className="flex-1 overflow-y-auto px-[28px] scrollbar-hide pt-3 pb-24 h-[220px]">
                                       <form className="w-full space-y-6">
                                           <div className="relative">
                                               <label className="absolute -top-2 left-[14px] bg-white text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">Name*</label>
                                               <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                                   <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your Full Name" className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] px-2" />
                                               </div>
                                           </div>
                                           <div className="relative">
                                               <label className="absolute -top-2 left-[14px] bg-white text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">Email</label>
                                               <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                                   <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email Address" className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] px-2" />
                                               </div>
                                           </div>
                                           <div className="relative">
                                               <label className="absolute -top-2 left-[14px] bg-white text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">Your qualification*</label>
                                               <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                                   <Input value={qualification} onChange={(e) => setQualification(e.target.value)} type="text" placeholder="Enter your qualification" className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] px-2" />
                                               </div>
                                           </div>
                                           <div className="relative">
                                               <label className="absolute -top-2 left-[14px] bg-white text-size-13 font-normal text-[#5C5C5C] px-[4px] leading-[16px] tracking-[0px] font-inter z-10">Phone number*</label>
                                               <div className="flex items-center gap-2.5 border border-[#D1D5DB] rounded-[14px] p-4 bg-white focus-within:ring-2 focus-within:ring-[#1C3141]/10 focus-within:border-[#1C3141] transition-all">
                                                   <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Enter your phone number" className="flex-1 bg-transparent border-none outline-none text-[#1C3141] placeholder:text-[#1C3141]/20 font-inter text-[16px] font-medium leading-[24px] tracking-[0px] px-2" />
                                               </div>
                                           </div>
                                       </form>
                                   </div>
           
                                   <div className="absolute bottom-0 left-0 right-0 bg-white px-[28px] pt-4 pb-[28px] z-50">
                                       {error && (
                                           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-xs mb-3 flex items-center gap-2">
                                               <Info className="w-3 h-3" /> {error}
                                           </div>
                                       )}
                                       <Button
                                           type="button"
                                           disabled={isLoading}
                                           onClick={handleSubmit}
                                           className="font-inter text-size-16 font-semibold leading-[16px] tracking-[0px] text-[#FFFFFF] bg-color-text w-full py-[15px] rounded-[10px] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                                       >
                                           {isLoading ? (
                                               <>
                                                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Profile...
                                               </>
                                           ) : (
                                               "Get Started"
                                           )}
                                       </Button>
                                   </div>
                               </div>
                    </div>
        
    )
}
export default Form;