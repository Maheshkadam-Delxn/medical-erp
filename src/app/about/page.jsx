'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShieldCheck, 
  TrendingUp, 
  ArrowLeftRight, 
  Clock, 
  Play, 
  ArrowRight, 
  Star 
} from 'lucide-react';
import Header from '@/components/landing/Navbar';
// import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { 
      icon: <Package className="w-10 h-10 mb-4 text-white" />, 
      title: "Smart Inventory", 
      desc: "Automated stock tracking with expiry alerts and low stock notifications",
      color: "from-emerald-300 to-teal-300"
    },
    {
      icon: <TrendingUp className="w-10 h-10 mb-4 text-white" />,
      title: "Advanced Analytics",
      desc: "Real-time sales reports and profit analysis at your fingertips",
      color: "from-green-300 to-indigo-300"
    },
    {
      icon: <ArrowLeftRight className="w-10 h-10 mb-4 text-white" />,
      title: "Tally Integration",
      desc: "Sync all transactions automatically with your accounting system",
      color: "from-purple-300 to-pink-300"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 mb-4 text-white" />,
      title: "Customer Management",
      desc: "Complete patient history with prescription tracking",
      color: "from-pink-300 to-purple-300"
    },
    {
      icon: <Clock className="w-10 h-10 mb-4 text-white" />,
      title: "Fast Billing",
      desc: "Quick billing interface with favorite items and recent transactions",
      color: "from-cyan-300 to-blue-300"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 mb-4 text-white" />,
      title: "Multi-User Access",
      desc: "Role-based permissions for staff with different responsibilities",
      color: "from-orange-200 to-yellow-200"
    },
  ];

  const FloatingElement = ({ children, delay = 0 }) => (
    <div 
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(target);
      const increment = end / (duration / 50);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 50);

      return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <FloatingElement>
            <section className="text-center mb-12">
              <div className="relative inline-block">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-purple-600 animate-pulse">
                  Revolutionizing
                </h1>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-400 rounded-full animate-bounce"></div>
              </div>
              <h2 className="text-4xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Pharmacy Management
              </h2>
              <p className="text-xl md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                MediEase is transforming how pharmacies operate with intelligent, streamlined solutions designed for the modern medical store.
              </p>
              <button className="mt-8 group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </section>
          </FloatingElement>

          {/* About Section */}
          <FloatingElement delay={200}>
            <section className="mb-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-3xl"></div>
                <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
                  <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                    About MediEase
                  </h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        MediEase is a comprehensive pharmacy management platform that digitizes and automates every aspect of your medical store operations. 
                        From prescription handling to financial reporting, our system is built to enhance efficiency and accuracy.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Designed by pharmacists for pharmacists, we understand the unique challenges of your business and have created tailored solutions to address them.
                      </p>
                      <div className="flex gap-4 pt-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${star * 100}ms` }} />
                        ))}
                        <span className="text-gray-600 ml-2">Rated 4.9/5 by pharmacists</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl transform rotate-3"></div>
                      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200/50">
                        <h3 className="text-xl font-bold mb-6 text-emerald-700">Why Choose MediEase?</h3>
                        <div className="space-y-4">
                          {[
                            { icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, text: "Trusted by 500+ pharmacies across India" },
                            { icon: <Clock className="w-5 h-5 text-emerald-500" />, text: "Reduces billing time by 70% on average" },
                            { icon: <ArrowLeftRight className="w-5 h-5 text-emerald-500" />, text: "Seamless integration with existing systems" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white/70 rounded-xl backdrop-blur-sm border border-emerald-100 hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                              <div className="text-xl">{item.icon}</div>
                              <span className="text-gray-700">{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FloatingElement>

          {/* Benefits Section */}
          <FloatingElement delay={600}>
            <section className="mb-16 relative">
              <div className="absolute inset-0">
                <img 
                  src="https://media.istockphoto.com/id/1471839731/photo/a-young-woman-pharmacist-arranges-medicines-on-the-shelves-of-the-pharmacy.jpg" 
                  alt="Pharmacy background"
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
              </div>
              
              <div className="relative z-10 text-white rounded-3xl p-10">
                <h2 className="text-4xl font-bold mb-12 text-center">Transform Your Pharmacy</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { value: "95", suffix: "%", label: "Reduction in billing errors" },
                    { value: "60", suffix: "%", label: "Faster inventory management" },
                    { value: "24", suffix: "/7", label: "Access to your business data" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="p-6 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors duration-300">
                        <div className="text-6xl font-bold mb-2 text-white">
                          <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                        </div>
                        <p className="text-white/90 text-lg font-medium">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FloatingElement>

          {/* Features Section */}
          <FloatingElement delay={400}>
            <section className="mb-20">
              <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                Powerful Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                      activeFeature === index ? 'ring-2 ring-gray-400 scale-105' : ''
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}></div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                    <div className="relative z-10 p-8 text-gray-800">
                      <div className="text-center">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-gray/90 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FloatingElement>

          {/* Compliance Section */}
          <FloatingElement delay={800}>
            <section className="mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-3xl"></div>
                <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                  <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                    Compliance & Security
                  </h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Data Protection</h3>
                        <p className="text-gray-700 leading-relaxed">
                          MediEase adheres to strict data privacy standards ensuring your customer information and business data are always secure.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Regulatory Ready</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Our system helps maintain compliance with pharmacy regulations including prescription records and controlled substance tracking.
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl transform -rotate-2"></div>
                      <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-200/50">
                        <h3 className="text-xl font-bold mb-6 text-gray-800">Support & Training</h3>
                        <div className="space-y-4">
                          {[
                            "Dedicated onboarding specialist",
                            "24/5 phone and chat support",
                            "Regular feature training webinars",
                            "Quarterly system health checks",
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white/70 rounded-xl backdrop-blur-sm border border-gray-100 hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">✓</span>
                              </div>
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FloatingElement>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}</style>
      </main>

      {/* <Footer /> */}
    </div>
  );
}