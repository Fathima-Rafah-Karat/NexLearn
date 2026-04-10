"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


const ResultsPage = () => {
    const router = useRouter();
    type ResultData = {
        score: number;
        total: number;
        correct: number;
        incorrect: number;
        skipped: number;
        userName: string;
    };

    const [result, setResult] = useState<ResultData | null>(null);

    useEffect(() => {
        const storedResult = sessionStorage.getItem("lastResult");
        if (storedResult) {
            setResult(JSON.parse(storedResult));
        } else {
            setResult({
                score: 0,
                total: 100,
                correct: 0,
                incorrect: 0,
                skipped: 0,
                userName: "Explorer"
            });
        }
    }, []);

    if (!result) {
        return (
            <div className="min-h-screen bg-[#F1F8FB] flex items-center justify-center font-inter">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1C3141] border-t-transparent rounded-full animate-spin" />
                    <p className="font-bold text-[#1C3141]">Loading results...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F1F8FB] font-inter flex items-center justify-center p-4">
            <div className="w-full max-w-[440px] bg-[#F1F8FB] rounded-3xl overflow-hidden">

                <div className="bg-gradient-to-b from-[#177A9C] to-[#1C3141] p-8 rounded-[24px] text-center mb-10 shadow-lg">
                    <p className="text-white text-[18px] font-medium mb-4">Marks Obtained:</p>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-white text-[72px] font-bold leading-none">{result.score}</span>
                        <span className="text-white text-[56px] font-light leading-none">/</span>
                        <span className="text-white text-[72px] font-bold leading-none">{result.total}</span>
                    </div>
                </div>

                <div className="space-y-6 px-4 mb-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-[#D4A017] rounded-md flex items-center justify-center">
                                <Image src="/icon/question.png" alt="file" width={20} height={20} className="w-5 h-5 " />
                            </div>
                            <span className="text-[#1C3141] text-[17px] font-semibold">Total Questions:</span>
                        </div>
                        <span className="text-[#1C3141] text-[18px] font-bold">{result.total.toString().padStart(3, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-[#4CAF50] rounded-md flex items-center justify-center">
                                  <Image src="/icon/correct.png" alt="file" width={20} height={20} className="w-5 h-5 " />
                            </div>
                            <span className="text-[#1C3141] text-[17px] font-semibold">Correct Answers:</span>
                        </div>
                        <span className="text-[#1C3141] text-[18px] font-bold">{result.correct.toString().padStart(3, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-[#F44336] rounded-md flex items-center justify-center">
                                  <Image src="/icon/wrong.png" alt="file" width={20} height={20} className="w-5 h-5 " />
                            </div>
                            <span className="text-[#1C3141] text-[17px] font-semibold">Incorrect Answers:</span>
                        </div>
                        <span className="text-[#1C3141] text-[18px] font-bold">{result.incorrect.toString().padStart(3, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-[#5C5C5C] rounded-md flex items-center justify-center">
                                  <Image src="/icon/question.png" alt="file" width={20} height={20} className="w-5 h-5 " />
                            </div>
                            <span className="text-[#1C3141] text-[17px] font-semibold">Not Attended Questions:</span>
                        </div>
                        <span className="text-[#1C3141] text-[18px] font-bold">{result.skipped.toString().padStart(3, '0')}</span>
                    </div>
                </div>

                <div className="px-4 pb-8">
                    <Button 
                        onClick={() => router.push("/")}
                        className="w-full py-7 bg-[#1C3141] hover:bg-[#0F1C25] text-white rounded-xl text-[18px] font-bold shadow-md transition-all active:scale-[0.98]"
                    >
                        Done
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default ResultsPage;
