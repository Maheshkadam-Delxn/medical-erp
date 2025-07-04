"use client";
import Image from "next/image";
import { Pill, Zap, CalendarCheck, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const words = [
    { text: "Simplified", color: "text-green-600" },
    { text: "Automated", color: "text-blue-600" },
    { text: "Digitized", color: "text-purple-600" },
    { text: "Optimized", color: "text-cyan-600" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 150);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-green-50 py-20 md:py-10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-50 to-blue-50 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <Pill className="w-4 h-4" />
              FOR CHEMIST SHOPS
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Heading with animated word */}
          <h1 className="text-xl md:text-xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Modern Pharmacy
            <br />
            Management{" "}
            <span
              className={`inline-block transition-all duration-300 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-2"
              } ${words[currentWord].color} relative`}
            >
              {words[currentWord].text}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-current to-transparent rounded-full"></div>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 max-w-1xl leading-relaxed">
            Transform your pharmacy operations with our cutting-edge platform.
            Streamline inventory, billing, GST compliance, and reporting in one
            intuitive solution.
          </p>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 ">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">4.9/5</span> from
              500+ pharmacies
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 ">
            <button className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 font-semibold text-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-3">
                <Zap className="w-4 h-4 group-hover:animate-pulse" />
                Start Free Trial
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="group flex items-center gap-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg">
              <CalendarCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Book Demo
            </button>
          </div>

          {/* Features list */}
          <div className="flex flex-wrap items-center gap-6  text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse"></div>
              <span className="text-gray-600">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse"></div>
              <span className="text-gray-600">7-day full access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Setup in 5 minutes</span>
            </div>
          </div>
        </div>

        {/* Right Image Section with Modern Effects */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative group">
            {/* Floating background elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 animate-pulse"></div>
    
            {/* Main image container */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[550px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-102">
              
              {/* Image */}
              <Image
                src="/login.jpg"
                alt="Pharmacy Management System"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30"></div>
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-400 rounded-tl-lg z-40"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-400 rounded-tr-lg z-40"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400 rounded-bl-lg z-40"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400 rounded-br-lg z-40"></div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute top-10 right-10 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-70"></div>
            <div className="absolute bottom-20 left-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-32 left-12 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 right-16 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}