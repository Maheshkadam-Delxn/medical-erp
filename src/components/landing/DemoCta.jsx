// src/app/components/DemoCTA.jsx
'use client';
import { Eye, Clock, Check, Quote, Star } from 'lucide-react';

export default function DemoCTA() {
  return (
    <section className=" bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl"></div>
          
          {/* Content grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-10">
            {/* Left column - Text content */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your Pharmacy <span className="text-emerald-600">Operations</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Discover how our ERP solution can save you <span className="font-semibold text-emerald-600">10+ hours weekly</span> with streamlined workflows and intelligent automation.
              </p>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="relative overflow-hidden group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Eye className="w-5 h-5" />
                      Request Demo
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                  
                  <button className="relative overflow-hidden group bg-white border-2 border-emerald-600 text-emerald-600 hover:text-emerald-700 px-8 py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5" />
                      7-Day Free Trial
                    </span>
                    <span className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 text-gray-500">
                  {['No credit card', 'Cancel anytime', 'Full access'].map((item) => (
                    <div key={item} className="flex items-center group">
                      <div className="w-5 h-5 mr-2 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm group-hover:text-gray-700 transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - Testimonial card */}
            <div className="relative">
              <div className="h-full bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 shadow-inner border border-gray-100/50">
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-lg">
                  <Quote className="w-6 h-6" />
                </div>
                
                <div className="h-full flex flex-col justify-center">
                  <p className="italic text-gray-700 text-lg mb-6 leading-relaxed">
                    "After implementing this system, we reduced medication errors by 45% and improved customer satisfaction significantly."
                  </p>
                  <div>
                    <p className="font-medium text-gray-900">Dr. Priya Sharma</p>
                    <p className="text-emerald-600 text-sm">MedLife Pharmacy, Mumbai</p>
                  </div>
                  
                  <div className="mt-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}