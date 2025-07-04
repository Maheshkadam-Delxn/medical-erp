// src/app/components/FeaturesSection.jsx
'use client';

const features = [
  {
    title: "Inventory Management",
    icon: "📦",
    description: "Real-time stock tracking with expiry alerts"
  },
  {
    title: "GST Billing & Sales",
    icon: "🧾", 
    description: "Automated tax-compliant invoices"
  },
  {
    title: "Customer Prescription Tracking",
    icon: "📝",
    description: "Digital records with refill reminders"
  },
  {
    title: "Role-Based Admin",
    icon: "👨‍⚕️",
    description: "Granular staff access controls"
  },
  {
    title: "Mobile & Desktop",
    icon: "📱💻",
    description: "Seamless cross-device experience"
  },
  {
    title: "Data Backup & Security",
    icon: "🔒",
    description: "Encrypted cloud backups"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need in <span className="text-green-600">One Place</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your pharmacy operations with our comprehensive suite of features
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-green-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-lg bg-green-50 flex items-center justify-center text-2xl mb-6 group-hover:bg-green-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="absolute bottom-6 left-8 h-0.5 w-8 bg-green-100 group-hover:bg-green-300 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}