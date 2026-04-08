import type { Metadata } from "next";
import {  Poppins,Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const poppins =Poppins({
  variable:"--font-poppins",
  weight:["600","500"],
  subsets:["latin"],
  display:"swap"
})

const inter=Inter({
  variable:"--font-inter",
  weight:"600",
  subsets:["latin"],
  display:"swap"
})

export const metadata: Metadata = {
  title: "NexLearn",
  description:'NexLearn provides immersive e-learning simulations and AI-driven personalized training for skills development and futuristic learning experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} ${inter.variable} h-full antialiased`}
    >
      <Navbar/>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
