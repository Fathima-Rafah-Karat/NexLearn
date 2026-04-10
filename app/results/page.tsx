
import React from "react";
import Result from "@/components/result"

const ResultsPage = () => {
    return (
        <div className="min-h-screen bg-[#F1F8FB] font-inter flex items-center justify-center p-4">
            <div className="w-full max-w-[440px] bg-[#F1F8FB] rounded-3xl overflow-hidden">
                <Result />
            </div>
        </div>
    );
};

export default ResultsPage;
