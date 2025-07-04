// src/app/components/HowItWorks.jsx
'use client';

const steps = [
  {
    title: "Sign Up & Setup Store",
    description: "Create your account and configure your pharmacy profile in minutes",
    icon: "📝",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Add Inventory & Start Billing",
    description: "Import products and generate GST-compliant invoices",
    icon: "📦→🧾",
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Track Reports, Expiry, Sales",
    description: "Monitor business health with real-time dashboards",
    icon: "📊",
    color: "bg-purple-100 text-purple-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-5 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Started in <span className="text-green-600">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your pharmacy management with our intuitive onboarding process
          </p>
        </div>
        
        <div className="relative">
          {/* Animated progress line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1.5 bg-gray-200 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 group">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center text-3xl mb-6 
                               transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                  {step.icon}
                </div>
                <div className="bg-white p-8 rounded-xl w-full border border-gray-100 shadow-sm hover:shadow-md 
                               transition-all duration-300 hover:border-green-200 group-hover:-translate-y-2">
                  <div className={`text-sm font-semibold mb-3 ${step.color.replace('bg-', 'text-')}`}>
                    STEP {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg 
                           shadow-sm hover:shadow-md transition-all duration-300 flex items-center mx-auto gap-2">
            Start Your Free Trial
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}