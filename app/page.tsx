import react from "react";
import Login from "@/components/login/phone-number";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'login | NexLearn',
  description:
    'NexLearn provides immersive e-learning simulations and AI-driven personalized training for skills development and futuristic learning experiences.',
};

const page = () => {
  return (
    <div>
      <Login />
    </div>
  )
}
export default page;