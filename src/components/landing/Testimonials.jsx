// src/app/components/Testimonials.jsx
'use client';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I used to track expiry on paper. Now it's all auto.",
      name: "Dr. Amit Sharma",
      pharmacy: "Sharma Medicos",
      city: "Mumbai",
      photo: "/pharma-1.jpg",
      rating: 5
    },
    {
      quote: "GST filing used to be a nightmare — now I export a report and send to CA.",
      name: "Priya Patel",
      pharmacy: "City Health Pharmacy",
      city: "Delhi",
      photo: "/pharma-2.jpg",
      rating: 5
    },
    {
      quote: "Cut billing time from 3 hours to 30 minutes daily.",
      name: "Vikram Joshi",
      pharmacy: "Joshi Medicals",
      city: "Bangalore",
      photo: "/pharma-3.jpg",
      rating: 4
    },
    {
      quote: "Our inventory accuracy went from 60% to 98% instantly.",
      name: "Ananya Reddy",
      pharmacy: "LifeCare Pharmacy",
      city: "Hyderabad",
      photo: "/pharma-4.jpg",
      rating: 5
    }
  ];

  return (
    <section className="py-15 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-green-600">Pharmacists Nationwide</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what pharmacy owners say about transforming their businesses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-100"
            >
              <div className="relative h-52">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.pharmacy}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg">{testimonial.pharmacy}</h3>
                  <p className="text-white/90 text-sm">{testimonial.city}</p>
                </div>
              </div>
              
              <div className="p-6 relative">
                <div className="absolute -top-5 left-6 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  {testimonial.rating}.0 ★
                </div>
                
                <blockquote className="text-gray-600 mb-6 leading-relaxed relative">
                  <span className="absolute -left-2 top-0 text-green-400 text-2xl opacity-80">"</span>
                  {testimonial.quote}
                </blockquote>
                
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">Owner, {testimonial.pharmacy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center mx-auto gap-2">
            Read More Success Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}