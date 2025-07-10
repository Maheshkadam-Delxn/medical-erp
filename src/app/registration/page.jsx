'use client';

import { useState } from 'react';
import {
  User, Mail, Phone, CalendarCheck,
  FileBarChart2, Zap, Check, CheckCircle,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';

const steps = [
  { title: 'Personal', icon: User },
  { title: 'Chemist', icon: Mail },
  { title: 'Legal', icon: FileBarChart2 },
  { title: 'Account', icon: Phone }
];

export default function ChemistRegistration() {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    aadharNumber: '', // extra
    storeName: '', address: '', city: '', // extra
    licenseNumber: '', licenseExpiry: '',
    panNumber: '', gstNumber: '',
    password: '', confirmPassword: ''
  });
  const [licenseFile, setLicenseFile] = useState(null);
  const [errors, setErrors] = useState({ licenseFile: '' });
  const [userId, setUserId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setErrors({ ...errors, licenseFile: 'Invalid file type. Only PDF, JPG, PNG allowed.' });
      setLicenseFile(null);
    } else {
      setLicenseFile(file);
      setErrors({ ...errors, licenseFile: '' });
    }
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const submitForm = () => {
    if (!licenseFile) {
      setErrors({ ...errors, licenseFile: 'Please upload your license copy.' });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('licenseFile', licenseFile);

    const generatedUserId = `userID-${Date.now()}`;
    formData.append('userId', generatedUserId);

    setUserId(generatedUserId);
    setIsSubmitted(true);
    setCompletedSteps([...completedSteps, step]);

    // Submit formData to backend here
  };

  return (
    <div className="h-screen w-screen flex font-sans overflow-hidden">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center px-4 lg:px-16">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-green-800 mt-4">Chemist Registration</h1>
          <p className="text-green-600 text-sm mt-1">Join our healthcare network in simple steps</p>
        </div>

        {/* Stepper */}
        <div className="relative w-full max-w-xl mb-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  completedSteps.includes(i)
                    ? 'bg-green-600 text-white shadow-md shadow-green-200'
                    : i === step
                      ? 'bg-white text-green-600 border-2 border-green-600 shadow-md'
                      : 'bg-green-100 text-green-400 border-2 border-green-200'
                }`}>
                  {completedSteps.includes(i) ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <p className={`text-xs mt-2 font-medium ${
                  completedSteps.includes(i) || i === step
                    ? 'text-green-700'
                    : 'text-green-400'
                }`}>{s.title}</p>
              </div>
            ))}
          </div>
          <div className="absolute top-5 left-0 right-0 h-1 bg-green-200 z-0">
  <div
    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-in-out"
    style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
  />
</div>

        </div>

        {/* Form or Success Message */}
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 border border-green-100 min-h-[350px] flex flex-col justify-center">
          {isSubmitted ? (
            <div className="text-center">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Successful</h2>
              <p className="text-sm text-green-700">Thank you for registering with us!</p>
              <p className="text-sm text-green-700 mt-2">Your User ID:</p>
              <div className="text-green-900 text-lg font-mono mt-1">{userId}</div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center text-green-800">
                {steps[step].title} Information
              </h2>
              <p className="text-xs text-center text-green-600 mb-3">
                {step === 0 && "Enter your personal details to get started"}
                {step === 1 && "Tell us about your pharmacy"}
                {step === 2 && "Legal and business information"}
                {step === 3 && "Create your secure account"}
              </p>

              <div className="space-y-3 m-2">
                {step === 0 && (
                  <>
                    <InputField icon={<User className="w-4 h-4 text-green-400" />} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
                    <InputField icon={<Mail className="w-4 h-4 text-green-400" />} name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
                    <InputField icon={<Phone className="w-4 h-4 text-green-400" />} name="phone" placeholder="Mobile Number" value={form.phone} onChange={handleChange} />
                    <InputField name="aadharNumber" placeholder="Aadhar Number" value={form.aadharNumber} onChange={handleChange} />
                  </>
                )}
                {step === 1 && (
                  <>
                    <InputField name="storeName" placeholder="Store Name" value={form.storeName} onChange={handleChange} />
                    <InputField name="address" placeholder="Full Address" value={form.address} onChange={handleChange} />
                    <InputField name="city" placeholder="City" value={form.city} onChange={handleChange} />
                  </>
                )}
                {step === 2 && (
                  <>
                    <InputField name="licenseNumber" placeholder="License Number" value={form.licenseNumber} onChange={handleChange} />
                    <InputField type="date" name="licenseExpiry" placeholder="License Expiry Date" value={form.licenseExpiry} onChange={handleChange} />
                    <InputField name="panNumber" placeholder="PAN Number" value={form.panNumber} onChange={handleChange} />
                    <InputField name="gstNumber" placeholder="GST Number" value={form.gstNumber} onChange={handleChange} />

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload License Copy</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className={`w-full text-sm p-3 rounded-xl bg-white/90 border-2 
                            focus:outline-none focus:border-emerald-500
                            ${errors.licenseFile ? 'border-red-300 bg-red-50/80' : 'border-gray-200 hover:border-gray-300'}
                            transition-colors duration-200 cursor-pointer`}
                        />
                        {licenseFile && (
                          <div className="absolute top-2 right-2 p-1 bg-emerald-100 rounded-full">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                          </div>
                        )}
                      </div>
                      {errors.licenseFile && (
                        <div className="mt-1 text-red-500 text-xs flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          {errors.licenseFile}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <InputField name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
                    <InputField name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
                  </>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6 gap-3">
                <button
                  onClick={prevStep}
                  disabled={step === 0}
                  className={`flex items-center justify-center w-40 py-2 rounded-xl text-sm font-medium transition-all ${
                    step === 0 
                      ? 'bg-green-200 text-green-600 cursor-not-allowed' 
                      : 'bg-green-200 text-green-700 hover:bg-green-300'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={step === steps.length - 1 ? submitForm : nextStep}
                  className="flex items-center justify-center w-40 bg-gradient-to-r from-green-600 to-green-500 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-md shadow-green-100"
                >
                  {step === steps.length - 1 ? 'Submit Application' : 'Next Step'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Visual */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-green-700 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-white"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-10 text-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/boy-and-girl-doing-id-registration-illustration-download-in-svg-png-gif-file-formats--signup-create-account-online-form-sign-up-pack-miscellaneous-illustrations-7508887.png"
            alt="Healthcare Registration"
            className="w-full max-w-xs mb-2 animate-float"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />
          <h3 className="text-2xl font-bold text-white mb-3">Join Our Network</h3>
          <p className="text-green-100 text-base mb-5">Connect with thousands of healthcare professionals and transform your pharmacy management</p>

          <div className="space-y-2">
                {[
                  { icon: CalendarCheck, text: "Smart scheduling system", color: "bg-teal-400" },
                  { icon: FileBarChart2, text: "Digital health records", color: "bg-cyan-400" },
                  { icon: Zap, text: "Instant prescriptions", color: "bg-yellow-400" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
        </div>
        
      </div>
      

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        html, body {
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      
    </div>
  );
}

function InputField({ icon, name, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-sm transition-all bg-green-50 hover:bg-white`}
      />
    </div>
  );
}
