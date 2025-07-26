'use client';

import React from 'react';
import { FiCheck, FiZap, FiDroplet, FiPackage, FiArrowRight, FiClock } from 'react-icons/fi';
import Header from "@/components/landing/Navbar";
// import Footer from "@/components/layout/Footer";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-green-50 to-green-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <span className="inline-block bg-green-600 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
              Transparent Pricing
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-4">
              Get MediEase At <span className="text-green-600">₹20/day</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most transparent pricing in pharma industry
            </p>
          </div>

          {/* Enhanced Free Trial Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-14 max-w-4xl mx-auto border border-green-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-green-100 rounded-full opacity-20"></div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-green-100 rounded-full opacity-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <FiZap className="text-green-600 text-xl" />
                  </div>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    No Credit Card Required
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Start with our 7-day free trial</h2>
                <p className="text-gray-600 mb-4 text-lg">Experience all premium features with zero commitment</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <FiCheck className="text-green-600" />
                    </div>
                    <span>Full access to all features</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <FiCheck className="text-green-600" />
                    </div>
                    <span>No setup fees or hidden charges</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <FiCheck className="text-green-600" />
                    </div>
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <FiCheck className="text-green-600" />
                    </div>
                    <span>Easy cancellation anytime</span>
                  </li>
                </ul>
                
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="mr-2 text-green-500" />
                  <span>Only 2 minutes setup • Instant access</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-5xl font-extrabold text-green-600">₹0</span>
                  <span className="text-gray-500 text-lg">/7 days</span>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center mx-auto">
                  Start Free Trial
                  <FiArrowRight className="ml-2" />
                </button>
                <p className="text-gray-500 text-sm mt-2">No commitment • Cancel anytime</p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-r from-green-400 to-green-600"></div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Perfect Plan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Simple annual pricing that scales with your pharmacy's needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Capsule Plan */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <FiZap className="text-green-600 text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Capsule</h3>
                  </div>
                  <p className="text-gray-500 mb-6">Essential features for small pharmacies</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">₹6,000</span>
                    <span className="text-gray-500">/year</span>
                    <p className="text-green-600 font-medium mt-1">Just ₹19/day</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> Basic inventory
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> 3 staff accounts
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> Email support
                    </li>
                  </ul>
                  <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold test-xs py-3 px-4 rounded-lg transition-colors">
                    Select Plan
                  </button>
                </div>
              </div>

              {/* Injection Plan - Featured */}
              <div className="relative">
                <div className="absolute -top-3 -right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  MOST POPULAR
                </div>
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-1 border-green-400 transform hover:scale-105 transition-all h-full">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <FiDroplet className="text-blue-500 text-xl" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Injection</h3>
                    </div>
                    <p className="text-gray-500 mb-6">Advanced features for growing pharmacies</p>
                    <div className="mb-6">
                      <div className="flex items-end">
                        <span className="text-4xl font-extrabold text-gray-900">₹10,000</span>
                        <span className="text-gray-500 ml-1">/year</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-500 line-through mr-2">₹15,000</span>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">SAVE 40%</span>
                      </div>
                      <p className="text-green-600 font-medium mt-1">Just ₹41/day</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Advanced inventory
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Unlimited staff
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Priority support
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Tally integration
                      </li>
                    </ul>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                      Get Best Value
                    </button>
                  </div>
                </div>
              </div>

              {/* Tablet Plan */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-purple-400 transition-all">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <FiPackage className="text-purple-600 text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Tablet</h3>
                  </div>
                  <p className="text-gray-500 mb-6">Enterprise solution for large pharmacies</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">₹30,000</span>
                    <span className="text-gray-500">/year</span>
                    <div className="flex items-center mt-1">
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">SAVE 35%</span>
                    </div>
                    <p className="text-green-600 font-medium mt-1">Just ₹137/day</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> All premium features
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> Dedicated manager
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> 24/7 support
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> API access
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> Custom reporting
                    </li>
                  </ul>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Go Premium
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Can I switch between plans?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade anytime. We'll prorate the difference.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Is there a long-term contract?</h3>
                <p className="text-gray-600">No contracts. Cancel anytime with no hidden fees or penalties.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, UPI, net banking, and NEFT transfers.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">How secure is my pharmacy's data?</h3>
                <p className="text-gray-600">We use 256-bit encryption and regular backups to ensure your data is always safe.</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team is ready to help you choose the perfect plan for your pharmacy's needs.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center text-lg transition-all">
              Contact Our Experts <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}