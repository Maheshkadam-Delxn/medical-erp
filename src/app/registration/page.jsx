'use client';

import { useState } from 'react';
import {
  User, Mail, Phone, CalendarCheck, Lock,
  FileBarChart2, Zap, Check, CheckCircle,
  ChevronLeft, ChevronRight, X, MapPin, Home,
  Building, MailIcon, MapIcon, PhoneCall, IdCard, Camera
} from 'lucide-react';

const steps = [
  { title: 'Personal', icon: User },
  { title: 'Chemist', icon: Mail },
  { title: 'Legal', icon: FileBarChart2 },
  { title: 'Verification', icon: Camera }
];

export default function ChemistRegistration() {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    aadharNumber: '',
    password: '',
    storeName: '', address: '', city: '', state: '', pincode: '',
    licenseNumber: '', licenseExpiry: '',
    panNumber: '', gstNumber: '',
    fssaiNumber: '', shopActNumber: ''
  });
  const [licenseFile, setLicenseFile] = useState(null);
  const [shopPhotoFile, setShopPhotoFile] = useState(null);
  const [errors, setErrors] = useState({ 
    licenseFile: '',
    shopPhotoFile: ''
  });
  const [userId, setUserId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    if (file && !validTypes.includes(file.type)) {
      setErrors({ ...errors, [type]: 'Invalid file type. Only PDF, JPG, PNG allowed.' });
      if (type === 'licenseFile') setLicenseFile(null);
      if (type === 'shopPhotoFile') setShopPhotoFile(null);
    } else {
      if (type === 'licenseFile') setLicenseFile(file);
      if (type === 'shopPhotoFile') setShopPhotoFile(file);
      setErrors({ ...errors, [type]: '' });
    }
  };

  const nextStep = () => {
    if (validateForm() && step < steps.length - 1) {
      setStep((prev) => prev + 1);
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      if (completedSteps.includes(step - 1)) {
        setCompletedSteps(completedSteps.filter(s => s !== step - 1));
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Personal information validation
    if (step === 0) {
      if (!form.name.trim()) newErrors.name = 'Name is required';
      if (!form.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email format';
      if (!form.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = 'Invalid phone number (10 digits)';
      if (!form.aadharNumber.trim()) newErrors.aadharNumber = 'Aadhar number is required';
      else if (!/^[0-9]{12}$/.test(form.aadharNumber)) newErrors.aadharNumber = 'Invalid Aadhar number (12 digits)';
      if (!form.password.trim()) newErrors.password = 'Password is required';
      else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    } 
    // Chemist information validation
    else if (step === 1) {
      if (!form.storeName.trim()) newErrors.storeName = 'Store name is required';
      if (!form.address.trim()) newErrors.address = 'Address is required';
      if (!form.city.trim()) newErrors.city = 'City is required';
      if (!form.state.trim()) newErrors.state = 'State is required';
      if (!form.pincode.trim()) newErrors.pincode = 'Pincode is required';
      else if (!/^[0-9]{6}$/.test(form.pincode)) newErrors.pincode = 'Invalid pincode (6 digits)';
    } 
    // Legal information validation
    else if (step === 2) {
      if (!form.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!licenseFile) newErrors.licenseFile = 'License copy is required';
      if (!form.panNumber.trim()) newErrors.panNumber = 'PAN number is required';
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber)) newErrors.panNumber = 'Invalid PAN format';
      if (!form.gstNumber.trim()) newErrors.gstNumber = 'GST number is required';
      else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/.test(form.gstNumber)) newErrors.gstNumber = 'Invalid GST format';
    }
    // Verification validation
    else if (step === 3) {
      if (!form.fssaiNumber.trim()) newErrors.fssaiNumber = 'FSSAI number is required';
      if (!form.shopActNumber.trim()) newErrors.shopActNumber = 'Shop Act number is required';
      if (!shopPhotoFile) newErrors.shopPhotoFile = 'Shop photo is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const submitForm = async () => {
  if (!validateForm()) return;

  setIsLoading(true);
  setSubmitError('');

  // Create a console-friendly object to log
  const formDataToLog = {
    ...form,
    licenseFile: licenseFile ? licenseFile.name : 'No file selected',
    shopPhotoFile: shopPhotoFile ? shopPhotoFile.name : 'No file selected'
  };

  // Create FormData for actual submission
  const formData = new FormData();
  
  // Append all form fields
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Append the files
  if (licenseFile) formData.append('licenseFile', licenseFile);
  if (shopPhotoFile) formData.append('shopPhotoFile', shopPhotoFile);

  try {
    // Send form data to your API endpoint
    const response = await fetch('/api/registration/chemist', {
      method: 'POST',
      body: formData,
      // Add headers to help with debugging on server side
      headers: {
        'X-Debug-Data': JSON.stringify(formDataToLog)
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const result = await response.json();
    const generatedUserId = `chemist-${Date.now()}`;
    setUserId(generatedUserId);
    setIsSubmitted(true);
    setCompletedSteps([...completedSteps, step]);
    
  } catch (error) {
    console.error('Registration error:', error);
    setSubmitError(error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="h-screen w-screen flex font-sans overflow-hidden">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center px-4 lg:px-16">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Chemist Registration</h1>
          <p className="text-gray-600 text-sm mt-1">Join our healthcare network in simple steps</p>
        </div>

        {/* Stepper */}
        <div className="relative w-full max-w-xl mb-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  completedSteps.includes(i)
                    ? 'bg-green-600 text-white shadow-md shadow-gray-300'
                    : i === step
                      ? 'bg-white text-gray-600 border-2 border-greay-600 shadow-md'
                      : 'bg-green-100 text-gray-400 border-2 border-gray-400'
                }`}>
                  {completedSteps.includes(i) ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <p className={`text-xs mt-2 font-medium ${
                  completedSteps.includes(i) || i === step
                    ? 'text-gray-700'
                    : 'text-gray-400'
                }`}>{s.title}</p>
              </div>
            ))}
          </div>
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-400 z-0">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-in-out"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form or Success Message */}
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 border border-gray-200 min-h-[350px] flex flex-col justify-center">
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
                {step === 3 && "Business verification details"}
              </p>

              {submitError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg flex items-center">
                  <X className="w-4 h-4 mr-2" />
                  {submitError}
                </div>
              )}

              <div className="space-y-3 m-2">
                {step === 0 && (
                  <>
                    <InputField 
                      icon={<User className="w-4 h-4 text-green-400" />} 
                      name="name" 
                      placeholder="Full Name" 
                      value={form.name} 
                      onChange={handleChange} 
                      error={errors.name}
                    />
                    <InputField 
                      icon={<Mail className="w-4 h-4 text-green-400" />} 
                      name="email" 
                      type="email"
                      placeholder="Email Address" 
                      value={form.email} 
                      onChange={handleChange} 
                      error={errors.email}
                    />
                    <InputField 
                      icon={<Phone className="w-4 h-4 text-green-400" />} 
                      name="phone" 
                      placeholder="Mobile Number" 
                      value={form.phone} 
                      onChange={handleChange} 
                      error={errors.phone}
                    />
                    <InputField 
                      icon={<IdCard className="w-4 h-4 text-green-400" />}
                      name="aadharNumber" 
                      placeholder="Aadhar Number" 
                      value={form.aadharNumber} 
                      onChange={handleChange} 
                      error={errors.aadharNumber}
                    />
                    <InputField 
                      icon={<IdCard className="w-4 h-4 text-green-400" />}
                      name="password" 
                      placeholder="password" 
                      value={form.password} 
                      onChange={handleChange} 
                      error={errors.password}
                    />
                  </>
                )}
                {step === 1 && (
                  <>
                    <InputField 
                      icon={<Home className="w-4 h-4 text-green-400" />} 
                      name="storeName" 
                      placeholder="Store Name" 
                      value={form.storeName} 
                      onChange={handleChange} 
                      error={errors.storeName}
                    />
                    <InputField 
                      icon={<MapPin className="w-4 h-4 text-green-400" />} 
                      name="address" 
                      placeholder="Full Address" 
                      value={form.address} 
                      onChange={handleChange} 
                      error={errors.address}
                    />
                    <InputField 
                      icon={<Building className="w-4 h-4 text-green-400" />}
                      name="city" 
                      placeholder="City" 
                      value={form.city} 
                      onChange={handleChange} 
                      error={errors.city}
                    />
                    <InputField 
                      icon={<MapIcon className="w-4 h-4 text-green-400" />}
                      name="state" 
                      placeholder="State" 
                      value={form.state} 
                      onChange={handleChange} 
                      error={errors.state}
                    />
                    <InputField
                      icon={<MailIcon className="w-4 h-4 text-green-400" />} 
                      name="pincode" 
                      placeholder="Pincode" 
                      value={form.pincode} 
                      onChange={handleChange} 
                      error={errors.pincode}
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <InputField 
                      name="licenseNumber" 
                      placeholder="License Number" 
                      value={form.licenseNumber} 
                      onChange={handleChange} 
                      error={errors.licenseNumber}
                    />
                    <InputField 
                      type="date" 
                      name="licenseExpiry" 
                      placeholder="License Expiry Date" 
                      value={form.licenseExpiry} 
                      onChange={handleChange} 
                    />
                    <InputField 
                      name="panNumber" 
                      placeholder="PAN Number" 
                      value={form.panNumber} 
                      onChange={handleChange} 
                      error={errors.panNumber}
                    />
                    <InputField 
                      name="gstNumber" 
                      placeholder="GST Number" 
                      value={form.gstNumber} 
                      onChange={handleChange} 
                      error={errors.gstNumber}
                    />

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload License Copy (PDF/Image)</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, 'licenseFile')}
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
                    <InputField 
                      name="fssaiNumber" 
                      placeholder="FSSAI License Number" 
                      value={form.fssaiNumber} 
                      onChange={handleChange} 
                      error={errors.fssaiNumber}
                    />
                    <InputField 
                      name="shopActNumber" 
                      placeholder="Shop Act Registration Number" 
                      value={form.shopActNumber} 
                      onChange={handleChange} 
                      error={errors.shopActNumber}
                    />

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Shop Photo (Image)</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={(e) => handleFileChange(e, 'shopPhotoFile')}
                          className={`w-full text-sm p-3 rounded-xl bg-white/90 border-2
                            focus:outline-none focus:border-emerald-500
                            ${errors.shopPhotoFile ? 'border-red-300 bg-red-50/80' : 'border-gray-200 hover:border-gray-300'}
                            transition-colors duration-200 cursor-pointer`}
                        />
                        {shopPhotoFile && (
                          <div className="absolute top-2 right-2 p-1 bg-emerald-100 rounded-full">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                          </div>
                        )}
                      </div>
                      {errors.shopPhotoFile && (
                        <div className="mt-1 text-red-500 text-xs flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          {errors.shopPhotoFile}
                        </div>
                      )}
                    </div>
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
                  disabled={isLoading}
                  className="flex items-center justify-center w-40 bg-gradient-to-r from-green-600 to-green-500 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-md shadow-green-100 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {step === steps.length - 1 ? 'Submitting...' : 'Loading...'}
                    </span>
                  ) : (
                    <>
                      {step === steps.length - 1 ? 'Submit Application' : 'Next Step'}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
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
            src="https://cdni.iconscout.com/illustration/premium/thumb/man-doing-web-hosting-illustration-download-in-svg-png-gif-file-formats--domain-registration-server-management-cloud-shared-vps-system-pack-business-illustrations-11589294.png?f=webp"
            alt="Healthcare Registration"
            className="w-full max-w-md mb-2 animate-float"
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

function InputField({ icon, name, placeholder, value, onChange, type = "text", error }) {
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
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border ${
          error ? 'border-red-300 bg-red-50/80' : 'border-green-200 hover:border-green-300'
        } rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-sm transition-all bg-green-50 hover:bg-white`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center">
          <X className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}