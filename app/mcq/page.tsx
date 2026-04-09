"use client";
import { useState, useEffect, useRef } from "react";
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
import { Clock, ChevronRight, Loader2, FileText, CheckSquare, Flag, Bookmark } from "lucide-react";
const Mcq = () => {
    const router = useRouter();
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState({});
    const [visited, setVisited] = useState({ 0: true });
    const [timeLeft, setTimeLeft] = useState(100 * 60);
    const [totalTime, setTotalTime] = useState(100 * 60);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionTime, setSubmissionTime] = useState(0);

    const questionsRef = useRef([]);
    const answersRef = useRef({});

    useEffect(() => {
        questionsRef.current = questions;
    }, [questions]);

    useEffect(() => {
        answersRef.current = answers;
    }, [answers]);

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
                        const totalSecs = data.total_time * 60;
                        setTimeLeft(totalSecs);
                        setTotalTime(totalSecs);
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
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleAutoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []); // Only run once on mount

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

    const submitAnswers = async (currentQuestions = questions, currentAnswers = answers, finalTime = timeLeft) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("authToken") || "";

            const answersPayload = currentQuestions.map((q, idx) => {
                const selectedIdx = currentAnswers[idx];
                const selectedOption = selectedIdx !== undefined ? q.options[selectedIdx] : null;
                return {
                    question_id: q.id,
                    selected_option_id: selectedOption ? selectedOption.id : null
                };
            });

            const formData = new FormData();
            formData.append("answers", JSON.stringify(answersPayload));

            const response = await fetch("https://nexlearn.noviindusdemosites.in/answers/submit", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                // Transform result to match what ResultsPage expects
                const timeTakenSecs = Math.max(0, totalTime - finalTime);
                const transformedResult = {
                    score: result.score || 0,
                    total: currentQuestions.length,
                    correct: result.correct || 0,
                    incorrect: result.wrong || 0,
                    skipped: result.not_attended || 0,
                    timeSpent: formatTime(timeTakenSecs),
                    remainingTime: formatTime(finalTime),
                    userName: "Explorer" // Fallback name
                };
                sessionStorage.setItem("lastResult", JSON.stringify(transformedResult));
                router.push("/results");
            } else {
                console.error("Submission failed:", result);
                alert("Submission failed. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting answers:", err);
            alert("An error occurred during submission.");
        } finally {
            setIsSubmitting(false);
            setIsSubmitDialogOpen(false);
        }
    };

    const handleAutoSubmit = async () => {
        alert("Time is up! Your test is being submitted.");
        await submitAnswers(questionsRef.current, answersRef.current, 0);
    };

    const handleSubmit = () => {
        setSubmissionTime(timeLeft);
        setIsSubmitDialogOpen(true);
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
                                        Read Comprehensive Paragraph
                                        <Image src="/icon/Polygon.png" alt="arrow" width={13} height={4} className=" h-3 w-3 ml-1" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[1200px] w-[95vw] bg-white border-[#E2E8F0] p-6 md:p-10 rounded-[10px] gap-0">
                                    <DialogHeader className="border-b border-[#E2E8F0] pb-4 mb-6 relative">
                                        <DialogTitle className="text-[#1C3141] text-[16px] font-semibold text-left">Comprehensive Paragraph</DialogTitle>
                                    </DialogHeader>
                                    <div className="text-[#1C3141] text-[18px] font-medium leading-[1.65] max-h-[60vh] overflow-y-auto pr-2 flex flex-col gap-5">
                                        <p>
                                            Ancient Indian history spans several millennia and offers a profound glimpse into the origins of one of the world&apos;s oldest and most diverse civilizations. It begins with the Indus Valley Civilization (c. 2500–1500 BCE), which is renowned for its advanced urban planning, architecture, and water management systems. Cities like Harappa and Mohenjo-Daro were highly developed, with sophisticated drainage systems and well-organized streets, showcasing the early brilliance of Indian civilization. The decline of this civilization remains a mystery, but it marks the transition to the next significant phase in Indian history. Following the Indus Valley Civilization, the Vedic Period (c. 1500–600 BCE) saw the arrival of the Aryans in northern India. This period is characterized by the composition of the Vedas, which laid the foundations of Hinduism and early Indian society.
                                        </p>
                                        <p>
                                            It was during this time that the varna system (social hierarchy) began to develop, which later evolved into the caste system. The Vedic Age also witnessed the rise of important kingdoms and the spread of agricultural practices across the region, significantly impacting the social and cultural fabric of ancient India.
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

            <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none rounded-2xl">
                    <DialogHeader className="px-6 pt-6 pb-4 flex flex-row items-center justify-between border-b">
                        <DialogTitle className="text-[#1C3141] text-lg font-semibold">
                            Are you sure you want to submit the test?
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between bg-white rounded-lg mb-[25px] ">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#1C3141] rounded-md">
                                    <Image src="/icon/clock.png" alt="clock" width={20} height={20} className="w-5 h-5 " />
                                </div>
                                <span className="text-[#1C3141] font-medium">Remaining Time:</span>
                            </div>
                            <span className="text-[#1C3141] font-bold text-lg">{formatTime(submissionTime)}</span>
                        </div>

                        <div className="flex items-center justify-between  bg-white rounded-lg mb-[25px] ">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#F59E0B] rounded-md">
                                    <Image src="/icon/file.png" alt="file" width={20} height={20} className="w-5 h-5 " />
                                </div>
                                <span className="text-[#1C3141] font-medium">Total Questions:</span>
                            </div>
                            <span className="text-[#1C3141] font-bold text-lg">{questions.length.toString().padStart(3, '0')}</span>
                        </div>

                        <div className="flex items-center justify-between  bg-white rounded-lg mb-[25px] ">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#4CAF50] rounded-md">
                                    <CheckSquare className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-[#1C3141] font-medium">Questions Answered:</span>
                            </div>
                            <span className="text-[#1C3141] font-bold text-lg">{Object.keys(answers).length.toString().padStart(3, '0')}</span>
                        </div>

                        <div className="flex items-center justify-between  bg-white rounded-lg ">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#8B1E7F] rounded-md">
                                    <Bookmark className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-[#1C3141] text-size-16 font-medium">Marked for review:</span>
                            </div>
                            <span className="text-[#1C3141] font-bold text-lg">{Object.values(markedForReview).filter(Boolean).length.toString().padStart(3, '0')}</span>
                        </div>

                        <Button 
                            onClick={() => submitAnswers(questions, answers, submissionTime)}
                            disabled={isSubmitting}
                            className="w-full py-6 bg-[#1C3141] hover:bg-[#0F1C25] text-white rounded-xl text-lg font-semibold mt-4 shadow-lg active:scale-[0.98] transition-all"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                "Submit Test"
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Mcq;