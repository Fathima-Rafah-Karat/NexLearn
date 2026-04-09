"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ChevronRight, Loader2 } from "lucide-react";
const Mcq = () => {
    const router = useRouter();
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState({});
    const [visited, setVisited] = useState({ 0: true });
    const [timeLeft, setTimeLeft] = useState(100 * 60);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("authToken") || "";
                const response = await fetch("https://nexlearn.noviindusdemosites.in/question/list", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (data.success && data.questions) {
                    setQuestions(data.questions);
                    if (data.total_time) {
                        setTimeLeft(data.total_time * 60);
                    }
                }
            } catch (err) {
                console.error("Error fetching questions:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleAutoSubmit();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleOptionSelect = (optionIndex) => {
        setAnswers({ ...answers, [currentIndex]: optionIndex });
        setVisited({ ...visited, [currentIndex]: true });
    };

    const handleMarkForReview = () => {
        setMarkedForReview({ ...markedForReview, [currentIndex]: !markedForReview[currentIndex] });
        setVisited({ ...visited, [currentIndex]: true });
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            setVisited({ ...visited, [nextIdx]: true });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleJumpToQuestion = (index) => {
        setCurrentIndex(index);
        setVisited({ ...visited, [index]: true });
    };

    const handleAutoSubmit = () => {
        alert("Time is up! Your test has been submitted.");
        router.push("/results");
    };

    const handleSubmit = () => {
        const confirmed = window.confirm("Are you sure you want to submit your test?");
        if (confirmed) {
            router.push("/results");
        }
    };

    const currentQuestion = questions[currentIndex];
    const getQuestionStatus = (index) => {
        const isAnswered = answers[index] !== undefined;
        const isMarked = markedForReview[index];
        const isVisited = visited[index];

        if (isAnswered && isMarked) return "answered-marked";
        if (isMarked) return "marked";
        if (isAnswered) return "answered";
        if (isVisited) return "visited";
        return "unvisited";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "answered": return "bg-[#4CAF50] text-white border border-transparent";
            case "visited": return "bg-[#F44336] text-white border border-transparent";
            case "marked": return "bg-[#8B1E7F] text-white border border-transparent";
            case "answered-marked": return "bg-[#4CAF50] text-white flex items-center justify-center border-[3px] border-[#8B1E7F]";
            default: return "bg-white text-[#1C3141] border border-[#CBD5E1] hover:border-[#94A3B8]";
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-blue-400 flex flex-col items-center justify-center font-inter">
                <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
                <h1 className="text-white text-xl font-medium">Loading ...</h1>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="min-h-screen bg-blue-400 flex flex-col items-center justify-center font-inter">
                <h1 className="text-white text-xl font-medium">No questions available.</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-400 flex flex-col font-inter">
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-screen">

                <div className="flex-1 flex flex-col bg-blue-50">
                    <div className="px-6 py-3.5 flex items-center justify-between bg-blue-50">
                        <h1 className="text-[#1C3141] font-medium text-[15px]">Ancient Indian History MCQ</h1>
                        <span className=" rounded-[4px] px-3 py-0.5  text-[#1C3141] font-medium text-[13px] bg-white ]">
                            {(currentIndex + 1).toString().padStart(2, '0')}/{questions.length}
                        </span>
                    </div>

                    <div className="flex-1  md:px-4 scrollbar-hide">

                        <div className="bg-white border border-[#E2E8F0] shadow-[0px_0px_12px_4px_#00000017] rounded-xl p-6 md:p-8 mb-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="mb-8 bg-[#177A9C] text-white border-none py-1.5 h-9 px-5 flex items-center gap-2 rounded-md hover:bg-[#136683] text-xs font-semibold uppercase tracking-wide shadow-sm transition-all hover:scale-[1.02]">
                                        <Image src="/icon/ArticleNYTimes.png" alt="file" width={16} height={16} className="brightness-200" />
                                        Read Comprehensive Paragraph <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[1200px] w-[95vw] bg-white border-[#E2E8F0] p-6 md:p-10 rounded-[10px] gap-0">
                                    <DialogHeader className="border-b border-[#E2E8F0] pb-4 mb-6 relative">
                                        <DialogTitle className="text-[#1C3141] text-[16px] font-semibold text-left">Comprehensive Paragraph</DialogTitle>
                                    </DialogHeader>
                                    <div className="text-[#1C3141] text-[14.5px] font-medium leading-[1.65] max-h-[60vh] overflow-y-auto pr-2 flex flex-col gap-5">
                                        <p>
                                            Ancient Indian history spans several millennia and offers a profound glimpse into the origins of one of the world&apos;s oldest and most diverse civilizations. It begins with the Indus Valley Civilization (c. 2500–1500 BCE), which is renowned for its advanced urban planning, architecture, and water management systems. Cities like Harappa and Mohenjo-Daro were highly developed, with sophisticated drainage systems and well-organized streets, showcasing the early brilliance of Indian civilization. The decline of this civilization remains a mystery, but it marks the transition to the next significant phase in Indian history. Following the Indus Valley Civilization, the Vedic Period (c. 1500–600 BCE) saw the arrival of the Aryans in northern India. This period is characterized by the composition of the Vedas, which laid the foundations of Hinduism and early Indian society.
                                        </p>
                                        <p>
                                            It was during this time that the varna system (social hierarchy) began to develop, which later evolved into the caste system. The Vedic Age also witnessed the rise of important kingdoms and the spread of agricultural practices across the region, significantly impacting the social and cultural fabric of ancient India.
                                        </p>
                                        <p>
                                            The 6th century BCE marked a turning point with the emergence of new religious and philosophical movements. Buddhism and Jainism, led by Gautama Buddha and Mahavira, challenged the existing Vedic orthodoxy and offered alternative paths to spiritual enlightenment. These movements gained widespread popularity and had a lasting influence on Indian society and culture. During this time, the kingdom of Magadha became one of the most powerful, laying the groundwork for future empires.
                                        </p>
                                        <p>
                                            The Maurya Empire (c. 322–185 BCE), founded by Chandragupta Maurya, became the first large empire to unify much of the Indian subcontinent. Under Ashoka the Great, the empire reached its zenith, and Buddhism flourished both in India and abroad. Ashoka&apos;s support for non-violence, his spread of Buddhist teachings, and his contributions to governance and infrastructure had a lasting legacy on Indian history. His reign marks one of the earliest and most notable examples of state-sponsored religious tolerance and moral governance.
                                        </p>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <DialogClose asChild>
                                            <Button className="bg-[#1C3141] hover:bg-[#0F1C25] text-white px-10 py-5 rounded-[8px] font-medium text-[15px] transition-all">
                                                Minimize
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <h2 className="text-[#1C3141] text-[18px] font-semibold leading-relaxed">
                                {currentIndex + 1}. {currentQuestion.question}
                            </h2>
                        </div>
                        <p className="mb-3 pl-5 text-size-14 text-[#5C5C5C] leading-[14px]">choose the answer</p>
                        <div className="mb-8 pl-1">
                            <RadioGroup
                                value={answers[currentIndex] !== undefined ? String(answers[currentIndex]) : ""}
                                onValueChange={(val) => handleOptionSelect(Number(val))}
                                className="grid gap-3"
                            >
                                {currentQuestion.options.map((optObj, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleOptionSelect(idx)}
                                        className={`flex items-center justify-between space-x-2 px-6 py-4 rounded-md border transition-all cursor-pointer group ${answers[currentIndex] === idx
                                            ? "bg-bg-white border-[#1C3141]"
                                            : "bg-bg-white border-[#E2E8F0] text-[#1C3141]"
                                            }`}
                                    >
                                        <Label
                                            htmlFor={`option-${idx}`}
                                            className="flex-1 text-[15px] font-medium cursor-pointer text-[#1C3141] "
                                        >
                                            {String.fromCharCode(65 + idx)}. {optObj.option}
                                        </Label>
                                        <RadioGroupItem
                                            value={String(idx)}
                                            id={`option-${idx}`}
                                            className={`w-5 h-5 border-2 transition-colors data-[state=checked]:bg-white data-[state=checked]:border-[#1C3141] data-[state=checked]:text-[#1C3141] ${answers[currentIndex] === idx ? "border-[#1C3141]" : "border-[#49454F]"}`}
                                        />
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="bg-[#F0F4F8] p-4 flex gap-[11px] items-center justify-between">
                        <Button
                            onClick={handleMarkForReview}
                            className="flex-1 px-[29px] py-[20px] bg-[#800080] hover:bg-[#701867] text-[#FFFFFF] rounded-md text-[16px]  transition-all active:scale-95"
                        >
                            Mark for review
                        </Button>

                        <Button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="flex-1 px-[29px] py-[20px] bg-[#CECECE] hover:bg-[#BDBDBD] text-[#1C3141] rounded-md text-size-16  disabled:opacity-50 transition-all active:scale-95"
                        >
                            Previous
                        </Button>

                        {currentIndex === questions.length - 1 ? (
                            <Button
                                onClick={handleSubmit}
                                className="flex-1 px-[29px] py-[20px] bg-[#1C3141] hover:bg-[#0F1C25] text-white rounded-md text-size-16  transition-all active:scale-95"
                            > 
                                Submit
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                className="flex-1 px-[29px] py-[20px] bg-[#1C3141] hover:bg-[#0F1C25] text-white rounded-md text-[16px]  transition-all active:scale-95"
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>

                <div className="hidden lg:block  border border-[1px] bg-gray-300  flex-shrink-0 rounded-full" />

                <div className="w-full xl:w-[748px] bg-blue-50 flex flex-col flex-shrink-0">
                    <div className="px-6 py-5 flex flex-col h-full overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[#1C3141] font-semibold text-[15px]">Question No. Sheet:</h3>
                            <div className="flex items-center gap-4">
                                <span className="text-[14px] text-[#1C3141] font-medium">Remaining Time :</span>
                                <div className="flex items-center gap-2 bg-[#1C3141] text-white px-3 py-1.5 rounded-sm font-bold text-[15px] min-w-[85px] justify-center">
                                    <Clock className="w-4 h-4" />
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-10 gap-x-2 gap-y-4  mb-8 overflow-y-auto scrollbar-hide pr-1 pt-3 pl-3 pb-3">
                            {questions.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleJumpToQuestion(idx)}
                                    className={`w-full aspect-square text-[13px] font-semibold rounded-sm flex items-center justify-center transition-all ${currentIndex === idx ? "ring-2 ring-offset-2 ring-[#1C3141] z-10" : ""
                                        } ${getStatusColor(getQuestionStatus(idx))}`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto pt-8 ">
                            <div className="flex flex-row gap-y-5 gap-x-5">
                                <div className="flex items-center gap-3 text-[13px] font-medium text-[#1C3141] font-inter">
                                    <div className="w-6 h-6 bg-[#4CAF50] rounded-sm" /> Attended
                                </div>
                                <div className="flex items-center gap-3 text-[13px] font-medium text-[#1C3141] font-inter">
                                    <div className="w-6 h-6 bg-[#F44336] rounded-sm" /> Not Attended
                                </div>
                                <div className="flex items-center gap-3 text-[13px] font-medium text-[#1C3141] font-inter">
                                    <div className="w-6 h-6 bg-[#8B1E7F] rounded-sm" /> Marked For Review
                                </div>
                                <div className="flex items-center gap-3 text-[13px] font-medium text-[#1C3141] font-inter">
                                    <div className="w-6 h-6 bg-[#4CAF50] rounded-sm relative flex items-center justify-center border-[3px] border-[#8B1E7F]">
                                    </div>
                                    <span className="leading-tight">Answered and Marked For Review</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Mcq;