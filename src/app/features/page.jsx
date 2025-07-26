'use client';

import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiPackage, FiFileText, FiUsers, FiPieChart, FiTruck, FiArrowRight, FiCheck, FiStar, FiZap } from 'react-icons/fi';
import Header from '@/components/landing/Navbar';
// import Footer from '@/components/layout/';

export default function ModernFeaturesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Smart Billing",
      description: "Generate fast, GST-compliant invoices with automatic Tally synchronization for seamless accounting.",
      highlight: false,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      stats: "99.9% accuracy"
    },
    {
      icon: <FiPackage className="w-8 h-8" />,
      title: "Inventory Management",
      description: "Real-time stock tracking with expiry alerts, batch management, and automated reordering suggestions.",
      highlight: true,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      stats: "Save 40% time"
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: "Prescription Management",
      description: "Digitally store, retrieve, and manage prescriptions with secure patient data protection.",
      highlight: false,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      stats: "HIPAA compliant"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Role-Based Access",
      description: "Customizable permissions for admin, pharmacists, and staff with audit trails for all actions.",
      highlight: false,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      stats: "Enterprise grade"
    },
    {
      icon: <FiPieChart className="w-8 h-8" />,
      title: "Sales Analytics",
      description: "Comprehensive reports with visual dashboards to track performance, trends, and profitability.",
      highlight: true,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      stats: "Real-time insights"
    },
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Supplier Management",
      description: "Centralized vendor portal for purchase orders, payments, and communication history.",
      highlight: false,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      stats: "Streamlined workflow"
    }
  ];

  const benefits = [
    "Reduce operational costs by 35%",
    "Increase efficiency by 50%",
    "24/7 customer support",
    "Free data migration",
    "Mobile app included"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-slate-50 via-white to-green-50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-lg">
              <FiZap className="w-4 h-4 mr-2" />
              Trusted by 500+ Pharmacies
            </div>
            
            <h1 className="text-5xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
              Pharmacy Management
              <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl sm:text-xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Everything your modern pharmacy needs to streamline operations, increase efficiency, and grow your business with cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="flex items-center">
                  Start Free Trial
                  <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="group bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 font-semibold py-4 px-8 border border-slate-200 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="flex items-center">
                  Watch Demo
                  <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative border border-white/20 rounded-3xl p-8 bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  feature.highlight ? 'ring-2 ring-green-200 bg-gradient-to-br from-white/80 to-green-50/50' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {feature.highlight && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center">
                    <FiStar className="w-3 h-3 mr-1" />
                    POPULAR
                  </div>
                )}
                
                <div className="flex items-start mb-6">
                  <div className={`p-4 rounded-2xl mr-4 bg-gradient-to-r ${feature.color} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                      {feature.stats}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-4">{feature.description}</p>
                
                <div className={`flex items-center text-green-600 font-medium transition-all duration-300 ${
                  hoveredFeature === index ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-0'
                }`}>
                  Learn more <FiArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 mb-20 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Why Choose Our Platform?
                  </h2>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
                    <div className="text-slate-300 mb-4">Happy Pharmacies</div>
                    <div className="flex justify-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-slate-300">"Best pharmacy software we've ever used!"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-white/80 to-green-50/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
              Ready to transform your pharmacy?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of pharmacies already using our platform to save time and increase revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  Start Free Trial
                  <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="group bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 font-semibold py-4 px-8 border border-slate-200 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  Schedule Demo
                  <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}